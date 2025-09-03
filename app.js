const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const DB_PATH = process.env.DB_PATH || "mongodb+srv://root:root@tousif.ikbis15.mongodb.net/Car?retryWrites=true&w=majority&appName=tousif";

const addRoutes = require('./routes/addRouter');
const mainRoutes = require('./routes/mainRouter');
const detailRoutes = require('./routes/detailRouter');
const aboutmeRoutes = require('./routes/AboutmeRouter');
const myprojectRoutes = require('./routes/myprojectRouter');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const termsRouter = require('./routes/termsConditionRouter');

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// MongoDB session store
const store = new MongoDBStore({
    uri: DB_PATH,
    collection: 'sessions'
});

// Session middleware
app.use(session({
    secret: 'yamurshid',
    resave: false,
    saveUninitialized: true,
    store: store
}));

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  next();
});

// MongoDB connection
mongoose.connect(DB_PATH)
.then(()=> console.log("Database connected"))
.catch(err => console.error("Database connection error:", err));

// Routes
app.use('/login', loginRouter);
app.use('/add', addRoutes);
app.use("/detail", detailRoutes);
app.use("/aboutme", aboutmeRoutes);
app.use("/myproject", myprojectRoutes);
app.use("/main", mainRoutes);
app.use("/termsCondition", termsRouter);
app.use("/register", registerRouter);

// Home redirect
app.get('/', (req, res) => res.redirect('/login'));

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) console.log(err);
        else {
            res.redirect('/login');
            console.log("Logged out successfully");
        }
    });
});

// Server
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
