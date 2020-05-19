const chalk = require('chalk')
const { User } = require('../DataBase/mongoDB')

//Store the details in DataBase
const submitForm = (form) => {
    return new Promise(async(resolve, reject) => {
        userData = new User({
            name: form.name,
            email: form.email,
            number: form.number,
            message: form.message
        })
        await userData.save()
            .then(async() => {
                console.log(form.email)
                console.log(chalk.green("New Feedback added"))
                await sendMail(form)
                    .then((data) => {
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Feedback Successfully Added",
                                mail: data.msg
                            }
                        })
                    })
                    .catch((err) => {
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Feedback Successfully Added",
                                mail: err.msg
                            }
                        })
                    })
            })
            .catch((err) => {
                console.log(chalk.red(err))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Server Side error contact support",
                        err: err
                    },
                })
            })

    })
}

//Function to send Mail after Form Submition
const sendMail = (user) => {
    return new Promise((resolve, reject) => {
        console.log(chalk.green.bold('Sending Email...\n'))
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: user.email,
            from: 'divyanshkhandelwal147@gmail.com',
            subject: 'AppsBrain Feedback',
            text: `Greetings from AppsBrain ${user.name}. Thankyou for your Feedback`
        };
        sgMail.send(msg)
            .then(() => {
                console.log("Mail Sent")
                resolve({
                    msg: "Mail Sent"
                })
            })
            .catch((err) => {
                console.log('Error:', err.response.body)
                reject({
                    msg: "Could Not Send Mail",
                    err: err.response.body
                })
            })
    })
}


module.exports = {
    submitForm
}