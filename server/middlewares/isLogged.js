function isLogged(req, res, next) {
    if (req.user) {
        return next()
    } else {
        return res.status(403).json(new Error ("Not Authorized"))
    }
}
module.exports = isLogged;