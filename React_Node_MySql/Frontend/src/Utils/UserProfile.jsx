var UserProfile = (function () {
  var full_name = "";
  let nameKey = "Name";

  var getName = function () {
    //return full_name;    // Or pull this from cookie/localStorage
    return localStorage.getItem(nameKey);
  };

  var setName = function (name) {
    //full_name = name;  // Also set this in cookie/localStorage
    localStorage.setItem(nameKey, name);
  };

  return {
    getName: getName,
    setName: setName,
  };
})();

export default UserProfile;
