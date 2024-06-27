import { Request, Response } from 'express';

import { getFixturing } from '../models/fixturingModel';


const getGroupsFixturing = async (req: Request, res: Response) => {
  try {
    const groupsFixturing = await getFixturing();

    console.log(groupsFixturing);

    res.status(200).json({ fixturing: groupsFixturing });
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
};

export { getGroupsFixturing }
