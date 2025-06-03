import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import TokenBlacklist from '../models/TokenBlacklist.js'; // import blacklist model

// Authenticate user and attach user object to request
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Check if token is blacklisted
    const blacklistedToken = await TokenBlacklist.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ message: 'Token is blacklisted. Please login again.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Allow roles: 'sarpanch', 'gramsevak', 'admin'
export const isAdmin = (req, res, next) => {
  console.log('Checking admin access for user role:', req.user?.role);
  const allowedRoles = ['sarpanch', 'gramsevak', 'admin'];
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

// Restrict access to only 'admin' role (for special admin-only panels)
export const admin = (req, res, next) => {
  console.log('Checking strict admin access for user role:', req.user?.role);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Admin access only' });
  }
};
