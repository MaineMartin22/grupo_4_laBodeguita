function notadmMiddleware(req, res, next) {

	// console.log(req.session.usuario);
	// console.log(req.session.usuario.id_categories);

	if (req.session.usuario.id_categories !== 1) {
		return res.redirect('/');
	}
	next();
}

module.exports = notadmMiddleware;