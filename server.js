// require dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');

// create express server
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// set up session
const sess = {
    secret: 'Temp Secret Password',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(require('./controllers'));

// add handlebars engine
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// initialize and sync the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App now listening on port ${PORT}`));
});