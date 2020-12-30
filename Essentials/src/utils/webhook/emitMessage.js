const Axios = require("axios").default;

module.exports = async function emitMessage(sender, content, config) {
    Axios({
        method: 'post',
        url: config.url,
        header: {
            "Content-Type": "application/json"
        },
        data: {
            content: config.chatFormat.replace("|SENDER|", sender).replace("|CONTENT|", content)
        }
    });
}