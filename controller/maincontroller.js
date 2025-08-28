const carinfo = require('../models/carinfo');

exports.mainget = async (req, res) => {
    try {
        const cars = await carinfo.find();
        res.render('main', { cars, activePage: 'main' , pageTitle: 'Main Page',isLoggedIn: req.session.isLoggedIn });
    } catch (err) {
        console.error(err);
        res.send("Error fetching data");
    }
};
