const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/borrow", userController.borrowBook);
router.post("/return", userController.returnBook);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getUser);
router.delete("/:id", userController.deleteUser);
router.get("/books/available", userController.getAvailableBooks);
router.get("/books/borrowed", userController.getBorrowedBooks);
router.get("/books/all", userController.getAllBooks);
router.post("/books", userController.addBook);

module.exports = router;