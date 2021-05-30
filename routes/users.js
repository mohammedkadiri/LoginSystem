const express = require("express");
const router = express.Router();
const joi = require("@hapi/joi");
const models = require("../models/users");

// validate the user credentials 
router.post("/login", async(req, res) => {
    try {
        const schema = joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().min(6).max(20).required(),
        });
        const result = schema.validate(req.body);
        if (result.error) {
            throw result.error.details[0].message;
        }
        let checkUserLogin = await models.verifyUser(result.value);
        if (checkUserLogin.error) {
            throw checkUserLogin.message;
        }
        // set session for the logged in user
        req.session.user = {
            name: checkUserLogin.data.name,
            email: checkUserLogin.data.email,
            city: checkUserLogin.data.city,
            year: checkUserLogin.data.year,
            day: checkUserLogin.data.day,
            month: checkUserLogin.data.month,
            gender: checkUserLogin.data.gender,
            hobbies: checkUserLogin.data.hobbies,
            state: checkUserLogin.data.state,
            salary: checkUserLogin.data.salary,
            favourite: checkUserLogin.data.favourite,
            prof: checkUserLogin.data.prof,
        };
        res.json(checkUserLogin);
    } catch (e) {
        res.json({ error: true, message: e });
    }
});

// validate the user sign up credentials
router.post("/signup", async(req, res) => {
    try {
        const schema = joi.object().keys({
            name: joi.string().min(3).max(45).required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).max(20).required(),
            city: joi.string().min(2).max(15).required(),
            year: joi.number().greater(1890).less(2022).required(),
            day: joi.number().greater(0).less(32).required(),
            month: joi.number().greater(0).less(13).required(),
            gender: joi.string().min(4).max(6).required(),
            hobbies: joi.string().min(2).max(20).required(),
            state: joi.string().min(1).max(20).required(),
            salary: joi.string().min(2).max(23).required(),
            favourite: joi.string().min(2).max(20).required(),
            prof: joi.string().min(1).max(19).required(),
        });
        const result = schema.validate(req.body);
        if (result.error) {
            throw result.error.details[0].message;
        }
        let addUserResponse = await models.addUser(result.value); // Add the new registered user to mongodb
        res.json(addUserResponse);
    } catch (e) {
        res.json({ error: true, message: e });
    }
});

router.get("/logout", (req, res) => {
    if (req.session.user) {
        req.session.destroy();
    }
    res.redirect("/");
});

module.exports = router;