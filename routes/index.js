'use strict';
var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sunnynguyen17594@gmail.com',
        pass: 'trunghieu'
    }
});

var mailOptions = {
    from: 'sunnynguyen17594@gmail.com',
    to: 'shandyprofile@gmail.com',
    subject: 'Contact from CV',
    text: ''
};

//transporter.sendMail(mailOptions, function (error, info) {
//    if (error) {
//        console.log(error);
//    } else {
//        console.log('Email sent: ' + info.response);
//    }
//});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Shandy Profile' });
});

router.post("/submitEmail", function (req, res) {
    var infoEmail = req.body;

    var _mailOption = mailOptions;
    _mailOption.text = "Name: " + infoEmail.Name + " From: "
        + infoEmail.Email + "  Content:  " + infoEmail.Message; 

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send("body", Error(error));
        } else {
            console.log('Email sent: ' + info.response);
            res.send("success");
        }
    });

});

module.exports = router;
