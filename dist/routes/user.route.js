"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// get users 
router.get('/users', (req, res) => {
    res.status(200).send('all users here');
});
exports.default = router;
