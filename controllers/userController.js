const jwt = require("jsonwebtoken");
const Customer = require("../models/userModel");
const bcrypt = require('bcryptjs');


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        const customer = await Customer.findOne({ email });
        if (!customer) {
          return res.status(401).json({ message: 'Customer does not exists' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
          { userId: customer._id, userEmail: customer.email },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
    
        res.status(200).json({ message: 'Login successful', Customer: customer, CustomerToken: token });
      } catch (err) {
        res.status(500).json({ message: 'Error during login', error: err.message });
      }
};


const signup = async (req, res) => {
    try {
        const {name,email,password} = req.body;
        const existingUser = await Customer.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Customer already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = new Customer({
          name: name,
          email:email,
          password: hashedPassword,
        });
        await newCustomer.save();
        const token = jwt.sign(
          { userId: newCustomer._id, userEmail:newCustomer.email },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        res.status(201).json({ message: 'Customer added successfully', Customer: newCustomer,CustomerToken: token });
      } catch (err) {
        res.status(500).json({ message: 'Error adding new Customer', error: err.message });
      }
};

module.exports = {
  login,
  signup,
};
