import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies.tokenInfo;
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: "Failed to authenticate token" });
        }
        req.userId = decoded.uid;
        req.roles = decoded.roles;
        req.permissions = decoded.permissions;
        next();
    });
};

export const checkPermission = (permissions) => (req, res, next) => {
    if (!permissions.some(permission => req.permissions.includes(permission))) {
        return res.status(403).json({ message: "Access denied: You don't have the right permissions" });
    }
    next();
};

