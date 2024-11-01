const jwt=require('jsonwebtoken')

const authMiddleware=(req,res,next)=>{
    const token=req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' })

    try {
            const verified = jwt.verify(token, 'secret123');
            req.user = verified; // Attach the decoded token to req.user
            next();
    } catch (err) {
            console.log(err);
            res.status(403).json({ message: 'Invalid or Expired Token' });
        }
};

const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access Forbidden: You do not have the required role' });
    }
    next();
};

module.exports = { authMiddleware, authorize };
