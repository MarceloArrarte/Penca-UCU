import { Request, Response } from 'express';
import { getMatchesAndPredictions, getAllMatches, updateMatchTeams } from '../models/matchModel';

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

const updateTeamsForMatch = async (req: Request, res: Response) => {
  try {
    const matchId = Number(req.params.matchId);
    const { teamIds } = req.body;

    const matchTeams = await updateMatchTeams(matchId, teamIds);

    res.status(201).json(matchTeams);
  } catch (err) {
    res.status(500).json({ error: 'Database Error', message: err });
  }
};

export { getMatchesAndUserPredictions, getMatches, updateTeamsForMatch };