const express = require('express');

const router = express.Router();

router.get("/", (req,res) => {
    res.render('index')

});

router.get("/about",(req,res) => {
    res.render('about')

});
router.get("/register",(req,res) => {
    res.render('register')

});

router.get("/finish",(req,res) => {
    res.render('finish')

});
module.exports = router;



