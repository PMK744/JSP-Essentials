module.exports = async function setPOS(target, x, y, z) {
    target.setX(x + 0.5);
    target.setY(y + 1);
    target.setZ(z + 0.5);
    target.getConnection().broadcastMove(target, 2);
}