const express = require("express");
const router = express.Router();

const messageService = require("../services/messages.service");

// here we define our routes
router.post("/add/message", messageService.addMessage);
router.get("/", messageService.getMessages);
router.put("/edit/:messageId", messageService.editMessage);
router.delete("/delete/:messageId", messageService.deleteMessage);
router.get("/:messageId", messageService.getMessageById);

module.exports = router;
