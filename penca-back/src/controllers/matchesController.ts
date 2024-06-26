import { Request, Response } from 'express';
import {
  getMatchesAndPredictions,
  getAllMatches,
  updateMatchTeams,
  insertOrUpdateMatchResult,
  getAllMatchesToBeDetermined,
  getSingleMatch
} from '../models/matchModel';

const getMatchesAndUserPredictions = async (req: Request, res: Response) => {
  try {
    const played = String(req.query.played);
    const userDocument = Number(req.user?.document);

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

const getMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const match = await getSingleMatch(Number(id), Number(req.user?.document));

    res.status(200).json(match);
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

const updateMatchResult = async (req: Request, res: Response) => {
  try {
    const matchId = Number(req.params.matchId);
    const { result } = req.body;

    await insertOrUpdateMatchResult(matchId, result);

    res.status(200).json({ result });
  }
  catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
}

const getMatchesToBeDetermined = async (req: Request, res: Response) => {
  try {
    const matchs = await getAllMatchesToBeDetermined();

    res.status(200).json(matchs);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
}

export { getMatchesAndUserPredictions, getMatches, getMatch, updateTeamsForMatch, updateMatchResult, getMatchesToBeDetermined };