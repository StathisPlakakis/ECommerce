import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



//Register a new user

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.json({ success: false, message: 'Please fill in all fields' });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({ success: false, message: 'User already exists' });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}


//Login a  user

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email })
    if (!checkUser) {
      return res.json({ success: false, message: 'User does not exist! Register first' });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.json({ success: false, message: 'Invalid password' });
    }
    const token = jwt.sign({
      id: checkUser._id,
      role: checkUser.role,
      email: checkUser.email,
      userName: checkUser.userName,
    }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: false }).json({ success: true, message: 'Login successful', user: checkUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

//Logout a user

export const logoutUser = (req, res) => {
  try {
    res.clearCookie('token').json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}


//Midllewar auth

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ success: false, message: 'Anuthorised User' })
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  }catch(error){
    res.status(401).json({ success: false, message: 'Anuthorised User' })
  }
}