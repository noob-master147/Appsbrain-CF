const validator = require('validator')
const chalk = require('chalk')

const formValidator = (req, res, next) => {

    //store all the parameters of the request in constants
    const name = req.body.name.trim()
    const message = req.body.message.trim()
    const number = req.body.number.trim()
    const email = req.body.email.trim()

    //Array to store all the errors
    const errorList = []

    //Check on name
    if (!validator.isAlphanumeric(name) || name.lenght > 20) {
        errorList.push('Name can only be AlphaNumeric and length less than 20 character!')
    }

    //Check on email
    if (!validator.isEmail(email)) {
        errorList.push('Email is Invalid, Please enter a valid Email')
    }

    //Check on number
    if (!number.match(/^\d{10}$/)) {
        errorList.push('Number is Invalid, Please enter a valid Number')
    }
    if (errorList.length !== 0) {
        res.status(400).send({
            statusCode: 400,
            payload: {
                status: "Error",
                errorMsg: errorList
            }
        })
    } else {
        //if no error recorded then pass the request
        const formData = {
            name,
            number,
            email,
            message
        }
        req.formData = formData
        console.log(chalk.green("Validation Check Complete\nNo Issues Found in Form\n"))
        next()
    }

}

module.exports = formValidator