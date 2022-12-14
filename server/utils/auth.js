// use this for JSON WEB TOKEN
// Make sure to keep the secret private in a .env file
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhh';
const expiration = '2h';

module.exports = {

    authMiddleware: function({ req }) {
        // allows token to be sent via the req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        if(req.headers.authorization){
            token = token
                .split(' ')
                .pop()
                .trim();
        }

        // if no token, return the request object as is
        if(!token){
            return req;
        }

        try {
            // decode and attach user data to requrest object
            const { data } = jwt.verify(token, secret, {maxAge: expiration});
            req.user = data; 
        }
        catch {
            console.log('Invalid Token');
        }

        //return updated requrest object
        return req;
    },

    signToken: function({ username, email, _id }){
        const payload = { username, email, _id};

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
};