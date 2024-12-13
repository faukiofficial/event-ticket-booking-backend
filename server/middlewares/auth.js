const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils");

// check authentication middleware
exports.authenticateUser = (req, res, next) => {
    try {
        let token

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        
        if (!token) {
            throw new UnauthenticatedError("Authentication failed");
        }

        const payload = isTokenValid({ token });

        if (payload.organizer) {
            req.user = {
                name: payload.name,
                userId: payload.userId,
                email: payload.email,
                role: payload.role,
                organizer: payload.organizer,
            };
        } else {
            req.user = {
                name: payload.name,
                userId: payload.userId,
                email: payload.email,
                role: payload.role,
            };
        }

        next();
    } catch (error) {
        next(error);
    }
}

exports.authorizeRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
}