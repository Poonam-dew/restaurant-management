const roleAuth = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied: insufficient permission' });
  }
  next();
};

module.exports = roleAuth;
