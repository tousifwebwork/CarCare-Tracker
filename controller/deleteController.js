const carinfo = require('../models/carinfo');

exports.deleteCar = async (req, res) => {
    try {
        await carinfo.findByIdAndDelete(req.params.id);
        res.status(200).send('Deleted');
        console.log('Car deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting car');
    }
};
