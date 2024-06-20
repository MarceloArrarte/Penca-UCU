import { Request, Response } from 'express';
import { predictTeamsGoalsForMatch } from '../models/predictionModel';

const predictMatchResults = async (req: Request, res: Response) => {
  const matchId = Number(req.params.matchId);
  const userDocument = Number(req.user?.document);
  const predictions = req.body.predictions;

  try {
    const matchPredictions = await predictTeamsGoalsForMatch(userDocument, matchId, predictions);

    res.status(201).json({ matchPredictions: matchPredictions });
  } catch (err) {
    return res.status(500).json({ error: 'Database Error', message: err });
  }
};

export { predictMatchResults }
