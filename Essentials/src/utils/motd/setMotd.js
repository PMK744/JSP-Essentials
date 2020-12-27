module.exports = async function setMotd(content, raknet) {
    raknet.getName().setMotd(content)
}