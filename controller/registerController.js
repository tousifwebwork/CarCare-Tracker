const Login = require('../models/login');

exports.getRegister = (req, res) => {
    res.render('register', {
        pageTitle: "Register",
        isLoggedIn: req.session.isLoggedIn || false,
        activePage: 'register'
    });
};

exports.postRegister = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        console.log("User Registered:", username);
        if (password !== confirmPassword) {
            return res.status(400).send(`<script>alert('Passwords do not match'); window.location='/register';</script>`);
        }
        const existingUser = await Login.findOne({ username });
        if (existingUser) {
            return res.status(400).send(`<script>alert('User already exists'); window.location='/register';</script>`);
        }
       // const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Login({
            username: username,
            password: password
        });
        await newUser.save();
        // Automatically log in after registration
        req.session.user = newUser;
        req.session.isLoggedIn = true;
        res.redirect('/main');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error during registration');
    }
};
