const carinfo = require('../models/carinfo');
exports.mainget = async (req, res) => {
    try {
        if(!req.session.user) 
            {return res.redirect('/login');}

        const cars = await carinfo.find({ userId: req.session.user._id });
        const loggedIn = req.session.isLoggedIn ? true : false;
        res.render('main', { cars, activePage: 'main', pageTitle: 'Main Page', isLoggedIn: loggedIn });

    } catch (err) {
        console.error(err);
        res.send("Error fetching data");
    }
};