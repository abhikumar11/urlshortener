const express = require('express');
const { generate, getLink } = require('../controllers/Web');
const passport = require('../config/passport');
const router=express.Router();
router.post("/generate",passport.checkAuthentication,generate);
router.get("/:webdomain",passport.checkAuthentication,getLink);

module.exports=router;