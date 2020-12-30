const Axios = require("axios").default;

module.exports = async function emitMessage(sender, content, config, logger) {
    const moduleName = "[§5webChat§r]"
    Axios({
        method: 'post',
        url: config.url,
        header: {
            "Content-Type": "application/json"
        },
        data: {
            content: config.chatFormat.replace("|SENDER|", sender).replace("|CONTENT|", content)
        }
    }).catch(err => {
        logger.error(moduleName + " §c" + err.message + ". Most likely invaild webhook url.");
    });
}