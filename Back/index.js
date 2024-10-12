if (!process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const metodOverrid = require('method-override')
const session = require('express-session')
var FileStore = require('session-file-store')(session);

const flash = require('connect-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local')
const Patient = require('./models/Patient')
const Doctor = require('./models/Doctor')
const cors = require('cors');

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("error", console.error.bind(console, "connection error"));
mongoose.connection.once("open", () => console.log("Database connected"))

app.use(cors({
    origin: 'http://localhost:3000',// (Whatever your frontend url is) 
    credentials: true, // <= Accept credentials (cookies) sent by the client
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(metodOverrid('_method'))
app.use(express.static(path.join(__dirname, 'puplic')))
var file_session_options = {
    path: '../sessions'
}
const sessionConfig = {
    secret: 'TempSecrret',
    store: new FileStore(file_session_options),
    resave: false,
    name: 'sessionsss',
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7,
    }
}

// https://github.com/expressjs/session#compatible-session-stores
// TODO Fix this 


app.use(session(sessionConfig))
app.use(flash());
//app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(Patient.authenticate()));
// passport.serializeUser(Patient.serializeUser());
// passport.deserializeUser(Patient.deserializeUser());

passport.use('doctorlocal', new LocalStrategy(Doctor.authenticate()));
passport.use('patientlocal', new LocalStrategy(Patient.authenticate()));
//passport.use(new LocalStrategy(Doctor.authenticate()));
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    if (user != null)
        done(null, user);
});
app.use(async (req, res, next) => {
    // if (!['/patientSignup', '/'].includes(req.originalUrl)) {
    //     req.session.returnTo = req.originalUrl
    // }
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.warning = req.flash('warning')
    next();
})

const allRoutes = require('./routes/allRoutes');
app.use('/', allRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})