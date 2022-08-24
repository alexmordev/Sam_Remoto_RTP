
class socketMessage {

    constructor () {

    }

    getStatus (code, message) {
        let data = {
            "code": code,
            "msg": message
        }

        return data
    }
}

module.exports = socketMessage;