import { Request, Response } from "express";
import { getAllTeams } from "../models/teamModel";


const getTeams = async (req: Request, res: Response) => {
    try {
      const teams = await getAllTeams();
  
      res.json(teams);
    } catch (err) {
      res.status(500).json({ error: 'Database Error' });
    }
  };

export { getTeams };