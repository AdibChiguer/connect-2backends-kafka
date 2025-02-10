const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/borrow", userController.borrowBook);
router.post("/return", userController.returnBook);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.get("/books/available", userController.getAvailableBooks);

module.exports = router;