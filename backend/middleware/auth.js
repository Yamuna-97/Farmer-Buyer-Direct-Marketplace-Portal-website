// Simple authentication middleware
const authMiddleware = (req, res, next) => {
  const userId = req.headers['user-id'] || req.headers['userid'] || req.headers['userId'];
  const rawUserRole = req.headers['user-role'] || req.headers['userrole'] || req.headers['userRole'];
  const userRole = rawUserRole?.toString().trim().toLowerCase();

  if (!userId || !userRole) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  req.userId = userId;
  req.userRole = userRole;

  next();
};

// Role-based access control
const authorizeRole = (roles) => {
  const normalizedRoles = roles.map((role) => role.toString().trim().toLowerCase());

  return (req, res, next) => {
    if (!normalizedRoles.includes(req.userRole)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
  };
};

module.exports = { authMiddleware, authorizeRole };
