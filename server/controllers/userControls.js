const chalk = require('chalk')
const { User } = require('../DataBase/mongoDB')

const submitForm = (form) => {
    return new Promise(async(resolve, reject) => {
        userData = new User({
                name: form.name,
                email: form.email,
                number: form.number,
                message: form.message
            })
            //document here
        await userData.save()
            .then(() => {
                console.log(chalk.green("New Feedback added"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Feedback Successfully Added"
                    }
                })
            })
            .catch((e) => {
                console.log(chalk.red("Error in saving Feedback details"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Server Side error contact support"
                    },
                })
            })

    })
}


module.exports = {
    submitForm
}