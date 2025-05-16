const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                courses = mutipleMongooseToObject(courses);
                res.render('home', { courses });
            })
            .catch(next);
        // res.render('home');
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController;
