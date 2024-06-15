import { Request, Response } from 'express';
import { predictTeamsGoalsForMatch } from '../models/predictionModel';

const predictMatchResults = async (req: Request, res: Response) => {
  const { userDocument, matchId, predictions } = req.body;

  try {
    const matchPredictions = await predictTeamsGoalsForMatch(userDocument, matchId, predictions);

    if (!matchPredictions) { return res.status(401).json({ error: 'Error when create predictions' }); }

    res.status(201).json({ message: 'Match predicted', matchPredictions: matchPredictions });
  } catch (err) {
    return res.status(500).json({ error: 'Database Error' });
  }
};

export { predictMatchResults }
