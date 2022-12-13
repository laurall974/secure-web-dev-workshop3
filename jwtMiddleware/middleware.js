const canAccess = (allowedRoles = []) => (req, res, next) => {
    if (!allowedRoles || allowedRoles === []) {
        next();
    };
    if (!req.user?.role)
    {
        console.log('role' + req.user)
        return res.status(401).send();
    } // No user
    if (!allowedRoles.includes(req.user.role)) return res.status(403).send();
    next()
}


module.exports = { canAccess };