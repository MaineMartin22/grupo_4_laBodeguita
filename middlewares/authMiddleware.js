function authMiddleware(req, res, next) {
	let admin = "admin"
	if(admin != "admin"){  
		return res.redirect('/users/login');
	}
	next();
}

module.exports = authMiddleware;

