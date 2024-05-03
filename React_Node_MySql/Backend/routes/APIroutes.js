const express = require("express");
const router = express.Router();
const dbServices = require("../dbservices/dbqueriesservice");
const jsonwebtoken = require("jsonwebtoken");
const helper = require("../utilities/paginationhelper");
const myUtils = require("../utilities/MyUtils.js");
const statusCode = require("../utilities/httpStatusCode");

router.post("/login", async function (req, res, next) {
  const emailID = req.body.email;
  const pass = req.body.passsord;
  const loginCredential = {
    email: emailID,
    password: pass,
  };
  try {
    var dataArray = await dbServices.login(loginCredential);

    console.log("APIRoute >> login >> dataArray: " + JSON.stringify(dataArray));

    var arraySize = dataArray.length;
    console.log("APIRoute >> login >> data size: " + arraySize);
    if (arraySize <= 0) {
      return res.status(statusCode.STATUS_CODE_204).json({ status: "User not found" });
    }

    var firstItem = dataArray[0];
    console.log(
      "APIRoute >> login >> data firstItem: " + JSON.stringify(firstItem)
    );
    var email = firstItem.email;
    console.log("APIRoute >> login >> firstItem email: " + email);

    //Generate cookie and send to client side
    const myCustomCookie = jsonwebtoken.sign(
      { emailID, pass },
      myUtils.secretKeyForCookie
    );
    // now we will be setting cookies from server side only.
    // below cookie is httpOnly, its maxAge is 1 day maxAge: 24 * 60 * 60 * 1000,
    // This cookie is valid to all the path in the domain
    res.cookie(myUtils.cookieTag, myCustomCookie, {
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    //Create a JWT auth token with the user ID as the payload
    const token = jsonwebtoken.sign({ ID: emailID }, myUtils.secretKeyForToken);
    //res.status(200).json({"token": token});

    req.session.isLoggedIn = true;
    req.session.email = emailID;

    const data = helper.emptyOrRows(dataArray);
    const myToken = { token };
    return res.status(statusCode.STATUS_CODE_200).json({ data, myToken });
    //res.json(dataArray);
  } catch (err) {
    console.error(`Error while Login`, err.message);
    next(err);
  }
});

// this path will be used to check if the cookie is valid to auto login inside the application;
router.get("/autoLogin", async function (req, res, next) {
  try {
    const tokenFromHeader = req.headers.authorization;
    console.log("APIroute autoLogin >> tokenFromHeader: " + tokenFromHeader);
    if (!tokenFromHeader || tokenFromHeader === null) {
      return res.status(statusCode.STATUS_CODE_401).json({ Status: "Authorization token not found" });
    }
    // Verify the JWT token with the secret key
    const decodedToken = jsonwebtoken.verify(
      tokenFromHeader,
      myUtils.secretKeyForToken
    );
    const userId = decodedToken.ID; // Get the user ID from the decoded token
    console.log("APIroute autoLogin >> tokenFromHeader userId: " + userId);

    const allCookies = req.headers.cookie;
    console.log("APIroute autoLogin >> allCookies : " + allCookies);
    // if we received no cookies then user needs to login.
    if (!allCookies || allCookies === null) {
      return res.status(statusCode.STATUS_CODE_401).json({ Status: "All cookies not found" });
    }
    var cookieArray = allCookies.split(";");
    var cookie;
    cookieArray.forEach((cookieItem) => {
      const [name, value] = cookieItem.trim().split("=");
      if (name === myUtils.cookieTag) {
        cookie = value;
      }
    });
    console.log(
      "APIroute autoLogin >> cookie for myCustomCookie TAG: " + cookie
    );
    // if we received no cookies then user needs to login.
    if (!cookie || cookie === null) {
      return res.status(statusCode.STATUS_CODE_401).json({ Status: "Cookie not found" });
    }

     // Verify the JWT token with the secret key
     const decodedCookieToken = jsonwebtoken.verify(cookie, myUtils.secretKeyForCookie);
     console.log("APIroute autoLogin >> decodedCookieToken: " + JSON.stringify(decodedCookieToken));

    const isLoggedIn = req.session.isLoggedIn;
    const emailI = req.session.email;
    console.log(
      "APIroute autoLogin Session>> isLoggedIn: " +
        isLoggedIn +
        " Email ID: " +
        emailI
    );

    return res.sendStatus(statusCode.STATUS_CODE_204);
  } catch (err) {
    console.error(`Error while autologin`, err.message);
    next(err);
  }
});

router.get("/logout", async function (req, res, next) {
  try {
    res.clearCookie(myUtils.cookieTag); //Clear client side cookie
    res.clearCookie(myUtils.SESSION_NAME_TAG); //Clear client side session cookie
    console.log("APIroute logout >> cookie cleared");
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(statusCode.STATUS_CODE_500).send("Error destroying session");
      } else {
        console.log("APIroute logout >> session cleared");
      }
    });

    return res.sendStatus(statusCode.STATUS_CODE_204);
  } catch (err) {
    console.error(`Error while logout`, err.message);
    next(err);
  }
});

router.post("/createuser", async function (req, res, next) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avater: req.body.avater,
  };
  try {
    res.json(await dbServices.createUser(user));
  } catch (err) {
    console.error(`Error while creating User`, err.message);
    next(err);
  }
});

router.get("/categories", async function (req, res, next) {
  try {
    res.json(await dbServices.getCategories(req.query.page));
  } catch (err) {
    console.error(`Error while getting categories `, err.message);
    next(err);
  }
});

router.get("/category/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    res.json(await dbServices.getCategory(id));
  } catch (err) {
    console.error(`Error while getting category `, err.message);
    next(err);
  }
});

router.post("/createcategory", async function (req, res, next) {
  const name = req.body.name;
  try {
    console.log("createcategory Route name: " + name);
    res.json(await dbServices.createCategory(name));
  } catch (err) {
    console.error(`Error while creating Category`, err.message);
    next(err);
  }
});

router.put("/updatecategory/:id", async function (req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  try {
    res.json(await dbServices.updateCategory(id, name));
  } catch (err) {
    console.error(`Error while updating Category`, err.message);
    next(err);
  }
});

router.delete("/deletecategory/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    res.json(await dbServices.deleteCategory(id));
  } catch (err) {
    console.error(`Error while deleting Category`, err.message);
    next(err);
  }
});

module.exports = router;
