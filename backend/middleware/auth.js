// Simple authentication middleware
const authMiddleware = (req, res, next) => {
  const userId = req.headers['user-id'];
  const userRole = req.headers['user-role'];

  if (!userId || !userRole) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  req.userId = userId;
  req.userRole = userRole;

  next();
};

// Role-based access control
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
  };
};

module.exports = { authMiddleware, authorizeRole };
