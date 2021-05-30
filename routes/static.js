const express = require("express");
const app = express();
const router = express.Router();

// static routes
// login page 
router.get("/", (req, res) => {
    if (req.session.user) {
        return res.redirect("/home");
    }
    res.render("index.html");
});
// home page 
router.get("/home", function(req, res) {
    if (req.session.user) {
        return res.render("home.html", {
            name: req.session.user.name,
            city: req.session.user.city,
            salary: req.session.user.salary,
            state: req.session.user.state,
            prof: req.session.user.prof,
            day: req.session.user.day,
            month: req.session.user.month,
            year: req.session.user.year,
            gender: req.session.user.gender,
            favourite: req.session.user.favourite,
            hobby: req.session.user.hobbies,
            email: req.session.user.email
        });
    }
    res.redirect("/");
});

module.exports = router;