
const User = require('../data/models/User')

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	res.locals.isAdm = false;


	let emailInCookie = req.cookies.userEmail;
	let userFromCookie = User.findByField('email', emailInCookie);

    //console.log(userFromCookie);

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		
		res.locals.isLogged = true;

        // paso lo que tengo en session a una variable local
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;