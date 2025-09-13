const Login = require('../models/login');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('login', {
        pageTitle: "Login",
        isLoggedIn: req.session.isLoggedIn || false,
        activePage: 'login'
    });
};

exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Login.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(400).send('<script>alert("Invalid username or password"); window.location="/login";</script>');
        }

        req.session.user = user; // store full user document
        req.session.isLoggedIn = true;

        req.session.save(err => {
            if(err) console.error(err);
            res.redirect('/main');
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error during login');
    }
};

