function requireAuth(req, res, next){
    if (!req.session.user){
        return res.redirect("/signIn");
    }
    next();
}

module.exports = requireAuth;
