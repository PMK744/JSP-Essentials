module.exports = async function setMotd(content, raknet) {
    raknet.getRaknet().getName().setMotd(content)
}