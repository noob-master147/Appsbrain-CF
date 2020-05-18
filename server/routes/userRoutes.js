const router = require("express")()
const chalk = require('chalk')
const userControls = require('../controllers/userControls')
const userDatabase = require('../DataBase/mongoDB')

//route to add connection
router.post('/submitForm', (req, res) => {
    console.log(req.body)
    res.send({ "msg": "Working" }).status(200)
        // userControls.submitForm(req.body)
        // .then(resp => res.status(200).send(resp))
        // .catch(err => res.status(400).send(err))
})



module.exports = router;