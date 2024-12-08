import express, { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import user from '../models/usermodel';


const router: Router = express.Router();

env.config({ path: './config.env' });

//Signup Route
router.post('/signup', async (req, res) => {
   return
})


//Login Route
router.post('/login', async (req, res) => {
   return
})


module.exports = router;