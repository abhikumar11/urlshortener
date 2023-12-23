const express = require('express');
const passport = require('../config/passport');
const { destroySession, signIn, createSession, create, signUp } = require('../controllers/User');
const {home}=require("../controllers/Home");

const router=express.Router();
router.get("/", signIn);
router.get("/sign-up", signUp);
router.post("/create", create);
router.get("/home",passport.checkAuthentication,home);
router.post(
    "/create-session",
    passport.authenticate("local", { failureRedirect: "/" }),
    createSession
  );
router.get("/sign-out", destroySession);
module.exports=router;