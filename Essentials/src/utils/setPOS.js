module.exports = async function setPOS(target, x, y, z) {
    target.setX(x);
    target.setY(y);
    target.setZ(z);
    target.getConnection().broadcastMove(target, 2);
}