export function authenticated(req, res, next) {
  req.session.authenticated ? next() : res.status(401).json({msg: 'Acesso a rota negado!'})
}
