import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import TokenBlacklist from '../models/TokenBlacklist.js';
const generateToken = (user) => {
  console.log('Signing token with JWT_SECRET:', process.env.JWT_SECRET);  // Debug log
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Admin Register (only sarpanch or gramsevak)
export const adminRegister = async (req, res) => {
  try {
    const { role, fullName, email, phone, village, password, confirmPassword } = req.body;

    if (!['sarpanch', 'gramsevak'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role for admin registration' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // ✅ Check if an admin with this role already exists
    const existingRoleUser = await User.findOne({ role });
    if (existingRoleUser) {
      return res.status(400).json({ message: `An admin with the role '${role}' is already registered.` });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      role,
      fullName,
      email,
      phone,
      village,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Error in adminRegister:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !['sarpanch', 'gramsevak'].includes(user.role)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(user);

    res.status(200).json({
      message: 'Admin login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        role: user.role,
        email: user.email,
        phone: user.phone,
        village: user.village,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Citizen Register (only user role)
export const citizenRegister = async (req, res) => {
  try {
    const { role, fullName, email, phone, village, password, confirmPassword } = req.body;

    if (role !== 'user') {
      return res.status(400).json({ message: 'Invalid role for citizen registration' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      role,
      fullName,
      email,
      phone,
      village,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'Citizen registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Citizen Login
export const citizenLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.role !== 'user') {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(user);

    res.status(200).json({
      message: 'Citizen login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        role: user.role,
        email: user.email,
        phone: user.phone,
        village: user.village,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};




export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token missing' });
    }

    const token = authHeader.split(' ')[1];

    // Decode token to get expiration
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const expiresAt = new Date(decoded.exp * 1000);

    // Add token to blacklist with expiration time
    await TokenBlacklist.create({ token, expiresAt });

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
