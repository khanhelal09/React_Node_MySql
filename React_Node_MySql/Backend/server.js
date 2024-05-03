var mysql = require('mysql');
var utils = require('./Utils');
var url = require('url');
const jsonwebtoken = require("jsonwebtoken");

const port = process.env.PORT || 3000;
var express = require('express')
var cors = require('cors')
var app = express()
app.use(express.json());
//app.use(cors())

const corsConfig = {
  credentials: true,
  origin: true,
  allowedHeaders: [
    "set-cookie",
    "Content-Type",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Authorization",
    "access-control-expose-headers",
    "access-control-allow-headers"
  ],
};

app.use(cors(corsConfig));


var DatabaseConnectionConfig = {host : "localhost", user : "root", password : "", database : "school"}

var con = mysql.createConnection(DatabaseConnectionConfig);

con.connect(function(error){
  if(error){
    console.log("Database Connection failed")
  } else {
    console.log("Database Connection success");
  }
});



  app.get('/', (req, res) => {
    //res.send('Hello, Node JS and Express World!');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("The date and time are currently: " + utils.myDateTime());

    //http://localhost:8081/?year=2017&month=July
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.end(txt);
  });


  app.post('/signup', (req, res) => {
    console.log("Server >> Inside signup post API >>>>>");
    const { name, email, password, avater } = req.body;
    console.log( "Server signup API " + "Name: " + name + " : Email: " + email + " : " + " password:" + password + " avater: " + avater);
    
    let SQLQuery = `INSERT INTO user (name, email, password, avater) VALUES (?, ?, ?, ?)`;
      
    con.query(SQLQuery, [name, email, password, avater] , function(error, result){
      console.log("Server signup API database response: " + JSON.stringify(result));
      if(error){
        console.log("Server signup API  Data insert failed");
        res.status(501).json({"Status": "signup failed"});
      } else {
        console.log("Server signup API  Data insert success");
        res.status(200).json({"Status": "signup success"});
      }
    })
  });


  //********** Cookies and Access token example start *************************************************** */
  
  // Secret key to sign Cookie
  const secretKey = "DUMMYKEY";
  // Secret key to sign and verify JWTs
  const secretKeyForToken = "mySecretKey";
  
  app.post("/login", (req, res) => {
    try{
      console.log("server login >> inside login API:");
      const id = req.body.id;
      const password = req.body.passsord;

      //SELECT * FROM `user` WHERE `email`='helal.uddin@bjitgroup.com' AND `password`=12345;
      let SQLQuery = "SELECT * FROM `user` WHERE `email`='" + id + "' AND `password`=" + password + "";
      console.log("Server login api SQLQuery query >> " + SQLQuery);

      con.query(SQLQuery, function(error, result){
        if(error){
          console.log("Server login api Error: " + error);
        } else {
          //const jsonarray = JSON.stringify(result);
          //const array = JSON.parse(jsonarray);
          console.log("Server login api result: ");
        }
      })

      console.log("server login >> inside login API: id: " + id + " password: " + password);
      const authToken = jsonwebtoken.sign({ id, password }, secretKey);

      // now we will be setting cookies from server side only.
      // below cookie is httpOnly, its maxAge is 1 day
      // This cookie is valid to all the path in the domain
      res.cookie("authToken", authToken, {
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      // Create a JWT token with the user ID as the payload
      const token = jsonwebtoken.sign({ ID: id }, secretKeyForToken);

      console.log("server login >> success: send status 200");
      res.status(200).json({"token": token});
    } catch (error) {
      // Access Denied
      return res.status(401).send(error);
    }
  });

  // this path will be used to check if the cookie is valid to auto login inside the application;
  app.get("/autoLogin", (req, res) => {
    try{
      console.log("server autoLogin >> inside");
      const cookie = req.headers.cookie;
      console.log("server autoLogin >> cookie: " + cookie );
      // if we received no cookies then user needs to login.
      if (!cookie || cookie === null) {
        console.log("server autoLogin >> inside null 401");
        // return res.sendStatus(401);
        return res.status(401).json({"Status": "User is not loggedin."});
      }

      const tokenFromHeader = req.headers.authorization; 
      console.log("server autoLogin >> tokenFromHeader: " + tokenFromHeader);
      // Verify the JWT token with the secret key
      const decodedToken = jsonwebtoken.verify(tokenFromHeader, secretKeyForToken);
      console.log("server autoLogin >> decodedToken: " + JSON.stringify(decodedToken));
      // Get the user ID from the decoded token
      const userId = decodedToken.ID;
      console.log("server autoLogin >> userId: " + userId);

      console.log("server autoLogin >> got cookie: send status 200");
      
      res.setHeader('url_with_header', 'https://erp.bjitgroup.com/');//Send custom header with API
      return res.sendStatus(200);
    } catch (error) {
      // Access Denied
      return res.status(401).send(error);
    }
  });

  // this path will be used to check if the cookie is valid to auto login inside the application;
  app.get("/logout", (req, res) => {
    res.clearCookie("authToken");
    console.log("server logout >> clear cookie: send status 200");
    return res.sendStatus(200); 
  });

  //**************  Cookies and Access token example End   ************************************************* */
  app.get('/employees', (req, res) => {
    const cookie = req.headers.cookie;
    //console.log("server employees >> cookie: " + cookie);
    const tokenFromHeader = req.headers.authorization; 
    //console.log("server employees >> tokenFromHeader: " + tokenFromHeader);

    let SQLQuery = "SELECT * FROM `students_list`";
    con.query(SQLQuery, function(error, result){
      if(error){
        console.log("Data received failed");
      } else {
        //console.log("Data received success");
        //console.log(result);
        res.json(result);
      }
    })
  });

  app.get('/categories', (req, res) => {
    let SQLQuery = "SELECT * FROM `categories`";
    con.query(SQLQuery, function(error, result){
      if(error){
        console.log("Server categories api data received failed");
      } else {
        console.log("Server categories api data received Successfull");
        res.json(result);
      }
    })
  });

    app.get('/employee/:id', (req, res) => {
      const id = req.params.id;
      let SQLQuery = "SELECT * FROM `students_list` WHERE `id`=" + id + "";
      console.log("inside employee by id query: " + SQLQuery );
      con.query(SQLQuery, function(error, result){
        if(error){
          console.log("employee data received failed");
        } else {
          console.log("employee data received success");
          console.log(JSON.stringify(result));
          res.json(result);
        }
      })
  });


  app.post('/create', (req, res) => {
    console.log("Inside post API >>>>>");
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    console.log("Name: " + name + " : Email: " + email + " : " + " Phoen:" + phone);
    
    let SQLQuery = "INSERT INTO `students_list`(`name`, `email`, `phone`) VALUES ('" + name + "','" + email + "','" + phone + "')"
    
    con.query(SQLQuery, function(error){
      if(error){
        console.log("Data insert failed");
        res.json({"Status": "Data insert failed"});
      } else {
        console.log("Data insert success");
        res.json({"Status": "Data insert success"});
      }
    })
  });

  app.put('/update', (req, res) => {
    console.log("Inside update API >>>>>");
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    //const id = req.params.id;
  
    let SQLQuery = "UPDATE `students_list` SET `name`='" + name + "',`email`='" + email + "',`phone`='" + phone + "' WHERE `id`=" + id + "";
    console.log("Inside update query: " + SQLQuery);

    con.query(SQLQuery, function(error){
        if(error){
          console.log("Server >> Data Updated failed");
          res.json({"Status": "Data Updated failed"});
        } else {
          console.log("Server >> Data Updated success");
          res.json({"Status": "Data Updated success"});
        }
      })    
  });

  app.delete('/delete/:id', (req, res) => {
     const id = req.params.id;
    let SQLQuery = "DELETE FROM `students_list` WHERE `id`=" + id + "";
    console.log("Inside delete query: " + SQLQuery);

    con.query(SQLQuery, function(error){
        if(error){
          console.log("Server >> Data Delete failed");
          res.json({"Status": "Data Delete failed"});
        } else {
          console.log("Server >> Data Delete success");
          res.json({"Status": "Data Delete success"});
        }
      })
  });


app.listen(8081, () => {
    console.log("API Server listening");
});