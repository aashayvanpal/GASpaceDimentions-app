const express = require('express')
const Property = require('../models/Property.js')
const router = express.Router()
// Routes

// function isLoggedIn(req, res, next) {
//     req.user ? next() : res.sendStatus(401)
// }


router.get('/properties/:id', (req, res) => {
    console.log("check for user id in this =>", req.params.id)
    Property.find({ "userid": req.params.id })
        .then((data) => {
            console.log('data:', data)
            res.json(data)

        })
        .catch((error) => {
            console.log('error', error)
        })
})

router.post('/save/property', (req, res) => {
    console.log('request.body', req.body)
    const data = req.body

    const newProperty = new Property(data)

    newProperty.save(error => {
        if (error) {
            res.status(500).json({ msg: 'sorry internal server error' })
            return
        }
        return res.json({
            msg: 'we have recieved property data!'
        })
    })


})

router.delete('/deleteProperty/:id', (req, res) => {
    const { id } = req.params;
    console.log("delete this id:", id)
    Property.findByIdAndDelete(id)
        .then(property => {
            if (property) {

                res.json(property)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
});


module.exports = router