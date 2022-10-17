const dotenv = require('dotenv');
dotenv.config();
const jwt = require("jsonwebtoken")

module.exports=(request,response,next) =>{
    const authHeader = request.session.auth
    console.log(request.session.auth)
    if (authHeader) {
        const token = authHeader;
        jwt.verify(token, process.env.TOKEN_SECRET, (err, usuario) => {
            if (err) {
                return response.sendStatus(403);
            }
            next();
        });
    } else {
        response.sendStatus(401);
    }
}
