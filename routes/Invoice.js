const express = require("express");
const router = express.Router();
const { getAllInvoices } = require("../controllers/Invoice");
const { auth, isAdmin } = require("../middlewares/auth");

router.get("/getAllInvoices", auth, isAdmin, getAllInvoices);

module.exports = router;
