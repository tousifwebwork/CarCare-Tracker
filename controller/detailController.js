const carinfo = require('../models/carinfo');


exports.detailGet = async (req, res) => {
    try {
        const car = await carinfo.findById(req.params.id);
        if (!car) {
            return res.status(404).send("Car not found");
        }
        res.render('detail', { car, activePage: "detail", pageTitle: 'Car Details' });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching car details");
    }
};
