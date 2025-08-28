const Login = require("../models/login");

exports.getLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Login",
    isLoggedIn: req.session.isLoggedIn || false,
    activePage: 'login'
  });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {

    req.session.isLoggedIn = true;
    await Login.create({ username, password });
    res.redirect("/main");
    console.log("User logged in:", username);
  } 
  catch (error) {
    console.error("Error saving login:", error);
    res.status(500).send("Error during login");
  }
};
