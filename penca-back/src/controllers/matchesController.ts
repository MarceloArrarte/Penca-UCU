import { Request, Response } from 'express';
import { getMatchesAndPredictions, getAllMatches } from '../models/matchModel';

const getMatchesAndUserPredictions = async (req: Request, res: Response) => {
  try {
    const played = String(req.query.played);
    const userDocument = Number(req.params.user_document);

    const matchs = await getMatchesAndPredictions(userDocument, played);

    res.status(200).json(matchs);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
};

const getMatches = async (req: Request, res: Response) => {
  try {
    const matchs = await getAllMatches();

    res.status(200).json(matchs);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
};

export { getMatchesAndUserPredictions, getMatches };
