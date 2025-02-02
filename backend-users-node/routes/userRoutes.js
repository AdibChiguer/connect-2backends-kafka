const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User Routes

router.post("/borrow", userController.borrowBook);
router.post("/return", userController.returnBook);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

module.exports = router;