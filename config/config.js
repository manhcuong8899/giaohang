const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const hbs = require('express-handlebars');
const layouts = require('handlebars-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');
const cors = require('cors');
const var_dump =require('var_dump');
var helpers = require('handlebars-helpers')();
var methodOverride = require('method-override')
class AppController{
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.errors();
    }
    middlewares() {
        this.app.use(bodyParser.urlencoded( {extended: true} ));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(methodOverride('_method'));
        this.app.use(session( {
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true,
            maxAge: 3600000,
        }));
        this.app.use(flash());
        this.app.use(cors());
        this.app.use(csrf({cookie: true}));
        this.app.use(function (req, res, next) {
            res.cookie('XSRF-TOKEN', req.csrfToken());
            res.locals.csrftoken = req.csrfToken();
            next();
        })
        this.app.engine('hbs', hbs({
                extname: 'hbs',
                defaultLayout: 'main',
                layoutsDir: 'apps/views/layouts/',
            }
        ));
        this.app.set('view engine', 'hbs');
    }
    routes() {
        this.app.set("views",path.join(__dirname, '../apps/views'));
        // Static Folder
        this.app.use("/admin",express.static(path.join(__dirname,'../themes/admin')));
        this.app.use("/upload",express.static(path.join(__dirname,'../public/upload')));

        consign({ cwd: path.join(__dirname, '../apps') })
            .include('routers')
            .include('handlebars')
            .then('controllers')
            .then('models')
            .then('helpers')
            .into(this.app);
    }
    errors() {
        this.app.use((req, res, next) => {
            return res.status(404)
                .render('errors/404', { layout: 'errors',title: 'Page not Found - 404'});
        });

    }
}
module.exports = new AppController().app;
