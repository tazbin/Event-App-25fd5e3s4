const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();
const privateKey = "privatekey";

const eventCollection = [{
        organizerId: 10,
        name: "Islamic Conference",
        description: "Lorem Ipsum",
        date: "7th June, 2020"
    },
    {
        organizerId: 10,
        name: "Islamic Conference",
        description: "Lorem Ipsum",
        date: "7th June, 2020"
    },
    {
        organizerId: 10,
        name: "Islamic Conference",
        description: "Lorem Ipsum",
        date: "7th June, 2020"
    },
    {
        organizerId: 10,
        name: "Islamic Conference",
        description: "Lorem Ipsum",
        date: "7th June, 2020"
    }
];

function veriftyMyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Unauthorized request!'
        });
    } else {
        const token = req.headers.authorization.split(' ')[1];
        if (token === null) {
            return res.status(401).json({
                message: 'Unauthorized request!'
            });
        } else {
            const token = req.headers.authorization.split(' ')[1];
            const payload = jwt.verify(token, 'privateKey');
            if (!payload) {
                return res.status(401).json({
                    message: 'Unauthorized request!'
                });
            }
            req.userId = payload._id;
            next();
        }
    }
    // console.log(payload);
    // // console.log(token);

}

router.get('/isLoggedIn', veriftyMyToken, (req, res, next) => {
    res.status(200).json({
        user: true,
        userId: req.userId
    });
});


router.get('/events', (req, res, next) => {
    res.status(201).send(eventCollection);
});

router.get('/get-my-events/:id', (req, res, next) => {
    const userId = req.params.id;
    if (userId) {
        const myEvents = eventCollection.filter((item) => {
            return item.organizerId == userId
        });
        res.status(200).json({
            events: myEvents
        });
    } else {
        res.status(500).json({
            userId: 'Invalied id'
        });
    }
})

router.post('/add-new-event', veriftyMyToken, (req, res, next) => {
    const newEvent = req.body;
    newEvent.organizerId = req.userId;
    eventCollection.push(newEvent);
    res.status(200).json({
        message: "Event added"
    })
});

router.get('/special', veriftyMyToken, (req, res, next) => {
    res.status(201).json({
        specialEvents: eventCollection,
        userId: req.userId
    });
});

router.post('/login', (req, res, next) => {
    const loginData = req.body;
    if (loginData.email && loginData.password) {
        User.findOne({ "email": loginData.email })
            .then(foundUser => {
                if (!foundUser) {
                    // email does not exists
                    res.status(401).json({
                        message: "Invalied email!"
                    });
                    // email does not exists
                } else {
                    bcrypt.compare(loginData.password, foundUser.password, function(err, result) {
                        if (err) {
                            res.status(401).json({
                                message: "Internal server error!"
                            });
                        }
                        if (result) {
                            const payload = {
                                _id: foundUser._id
                            }
                            const token = jwt.sign(payload, 'privateKey');
                            res.status(200).json({
                                token: token
                            });
                        } else {
                            res.status(401).json({
                                message: "Wrong password!"
                            });
                        }
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "Internal server error!"
                });
            })
    } else {
        res.status(401).json({
            message: "Invalied user data!"
        });
    }
});

router.post('/register', (req, res, next) => {
    const registerData = req.body;
    if (registerData.email && registerData.password) {
        User.findOne({ "email": registerData.email })
            .then(result => {
                if (!result) {
                    // all okay, register this guy
                    bcrypt.hash(registerData.password, saltRounds, function(err, hash) {
                        if (err) {
                            res.status(500).json({
                                message: "Failed to register!"
                            });
                        } else {
                            // hash completed, register it
                            registerData.password = hash;
                            const newUser = new User(registerData)
                                .save()
                                .then(result => {
                                    const token = jwt.sign({
                                        _id: result._id
                                    }, privateKey, { expiresIn: '1h' });
                                    res.status(200).json({
                                        token: token
                                    });
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        message: "Failed to register!"
                                    });
                                })
                        }
                    });
                    // all okay, register thus guy
                } else {
                    res.status(401).json({
                        message: "This email can't be used!"
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "Internal server error!"
                });
            })
    } else {
        res.status(401).json({
            message: "Invalied user data!"
        });
    }
});


module.exports = router;