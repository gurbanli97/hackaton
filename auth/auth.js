module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }

        return res.redirect("/login")
    },
    forwardAuthenticated: function(req, res, next){
        if(!req.isAuthenticated()){
            return next()
        }
        return res.redirect("/")
    }
}