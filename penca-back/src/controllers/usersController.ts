import { Request, Response } from 'express';
import { getAllUserScores, getUserByEmail, createUser, getUserByEmailOrDocument, getCareers, getProfile } from '../models/userModel';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'your_default_secret_key'

const getUsersRanking = async (req: Request, res: Response) => {
  try {
    const users = await getAllUserScores();

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
};

const registerUser = async (req: Request, res: Response) => {
  const { document, name, email, password, championId, runnerUpId, careers } = req.body;

  try {
    const user = await getUserByEmailOrDocument(email, document);

    if (user) { return res.status(401).json({ error: 'The user already exists' }); }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(document, name, email, hashedPassword, championId, runnerUpId, careers);

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Database Error' });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
  
    if (!user) { return res.status(401).json({ error: 'Invalid email or password' }); }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) { return res.status(401).json({ error: 'Invalid email or password' }); }
    
    const token = jwt.sign(
      { document: user.document, email: user.email, role: user.role },
      secretKey,
      { expiresIn: '3h' }  
    )
  
    return res.status(200).json({ token: token });
  } catch (err) {
    return res.status(500).json({ error: 'Database Error' });
  }
};

const getAllCareers = async (req: Request, res: Response) => {
  try {
    const careers = await getCareers();

    res.json(careers);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
}

const getUserProfile = async (req: Request, res: Response) => {
  const userDocument = req.user!.document.toString();

  try {
    const careers = await getProfile(userDocument);

    res.json(careers);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
}


export { getUsersRanking, loginUser, registerUser, getAllCareers, getUserProfile };
