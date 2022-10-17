const dotenv = require('dotenv');
dotenv.config();
const jwt = require("jsonwebtoken")

module.exports=(request,response,next) =>{
    const authHeader = request.body.auth
    if (authHeader) {
        const token = authHeader;
        jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
            if (err) {
                return response.sendStatus(403);
            }
            next();
        });
    } else {
        response.sendStatus(401);
    }
}
