const multer = require('multer');
const  carinfo = require('../models/carinfo');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // folder to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  }
});
const upload = multer({ storage: storage });



// Get all cars
exports.addget = async (req, res) => {
    try {
        console.log(req.body);
        const cars = await carinfo.find(); 
        res.render('add', { cars, activePage: 'add', pageTitle: 'Add Car' });
    } catch (err) {
        console.error(err);
        res.send("Error fetching data");
    }
};


//save car

exports.addpost = async (req, res) => {
    try {
        console.log("Form data received:", req.body); 
        const { Username, car_no, lastPUC, lastInsurance } = req.body;

         // Calculate next dates
         const nextPUC = new Date(lastPUC);
         nextPUC.setMonth(nextPUC.getMonth() + 6);

         const nextInsurance = new Date(lastInsurance);
         nextInsurance.setFullYear(nextInsurance.getFullYear() + 1);

         const image = req.file ? '/uploads/' + req.file.filename : null;

        const car = new carinfo({ Username, car_no, lastPUC, lastInsurance, nextPUC, nextInsurance, image });
        await car.save();
        
        console.log("Saved to DB");
         res.redirect('/main');
    } catch (err) {
        console.error(err);
        res.send("Error storing data");
    }
};


