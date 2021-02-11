const { default: TransferPacket } = require('@jsprismarine/prismarine/dist/src/network/packet/TransferPacket');

module.exports = async function transferServer(target, address, port) {
    let pk = new TransferPacket();
    pk.address = address;
    pk.port = port;
    target.getConnection().sendDataPacket(pk);
}