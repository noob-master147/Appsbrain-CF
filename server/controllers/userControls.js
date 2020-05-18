const chalk = require('chalk')


const submitForm = (form) => {
    return new Promise(async (resolve, reject) => {

        //document here
        await setTimeout(() => {

        }, 5)
            .then(async () => {
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