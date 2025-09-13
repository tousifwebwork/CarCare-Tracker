const multer = require('multer');
const path = require('path');
const carinfo = require('../models/carinfo');

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
exports.upload = upload.single('image'); 

// GET Add Car page
exports.addget = async (req, res) => {
    if(!req.session.user) return res.redirect('/login');
    res.render('add', { activePage: 'add', pageTitle: 'Add Car' });
};

// POST Add Car
exports.addpost = async (req, res) => {
    try {
        if(!req.session.user) return res.redirect('/login');

        const { Username, car_no, lastPUC, lastInsurance, phonenumber } = req.body;

        const nextPUC = new Date(lastPUC);
        nextPUC.setMonth(nextPUC.getMonth() + 6);

        const nextInsurance = new Date(lastInsurance);
        nextInsurance.setFullYear(nextInsurance.getFullYear() + 1);

        const image = req.file ? '/uploads/' + req.file.filename : null;

        const car = new carinfo({
            Username,
            car_no,
            lastPUC: new Date(lastPUC),
            lastInsurance: new Date(lastInsurance),
            nextPUC,
            nextInsurance,
            phonenumber: Number(phonenumber),
            image,
            userId: req.session.user._id
        });

        await car.save();
        res.redirect('/main');

    } catch (err) {
        console.error(err);
        res.send("Error storing data");
    }
};