const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { sendMessage } = require("../config/kafka");
const axios = require("axios");

const SPRING_BOOT_BASE_URL = "http://localhost:8080/api";

exports.borrowBook = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    
    const event = {
      userId: decoded.id,
      bookId: req.body.bookId,
      action: "borrow",
    };
    sendMessage(event);
    res.status(200).json({ message: "Borrow request sent", event });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    console.log("Received return request:", req.body);
    const event = {
      userId: decoded.id,
      bookId: req.body.bookId,
      action: "return",
    };
    sendMessage(event);
    res.status(200).json({ message: "Return request sent", event });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAvailableBooks = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const userId = decoded.id;

    const response = await axios.get(`http://127.0.0.1:8080/api/books/available/${userId}`);
    const books = response.data;

    return res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching available books:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getBorrowedBooks = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const userId = decoded.id;

    const response = await axios.get(`${SPRING_BOOT_BASE_URL}/loans/borrowed/${userId}`);
    const books = response.data;

    return res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching available books:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    console.log("hi")
    const response = await axios.get(`${SPRING_BOOT_BASE_URL}/books`);
    const books = response.data;
    console.log("Books:", books); 
    

    return res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching available books:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.addBook = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: "Admin not found" });

    if (user.role !== "admin") return res.status(403).json({ message: "Unauthorized: Admin access required" });

    const { isbn, title, author, publicationYear, category, totalCopies } = req.body;
    const response = await axios.post(`${SPRING_BOOT_BASE_URL}/books`, { isbn, title, author, publicationYear, category, totalCopies });
    const book = response.data;

    return res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    console.error("Error adding book:", error);
    return res.status(500).json({ message: "Server error" });
  }
};