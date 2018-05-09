function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        return next()
    } else {
        return res.status(403).json(new Error ("Not Authorized"))
    }
}
module.exports = isAdmin;