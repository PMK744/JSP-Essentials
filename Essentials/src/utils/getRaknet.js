module.exports = async function getRaknet(server) {
    return new Promise((res, rej) => {
        let checkRaknet = setInterval(() => {
            if (server.getRaknet() == undefined) {} else {
                clearInterval(checkRaknet)
                res(server.getRaknet());
            }
        })
    })
}