const config = require('config');
const jwt = require('jsonwebtoken');

const MiddlewareForPrivateRoutes = ( req, res, next ) => {
    const token = req.header('x-auth-token');

    //check for token.
    if(!token) return res.status(401).json({ mssage: 'No token, authorization denied.' });

    try {
    
        //verify token.
        const verified = jwt.verify(token,config.get('jwtSecret'));

        //Add user from payload.
        req.user = verified;

        //whatever this piece of middleware does(completed its task).
        //then move on to the next middleware.
        next();

    } catch (error) {
        res.status(400).json({ message: 'Token is not valid.' })
    }

}

module.exports = MiddlewareForPrivateRoutes;