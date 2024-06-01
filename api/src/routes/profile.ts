/*
 * @LastEditors: Necfol
 * @Date: 2024-06-01 22:25:16
 * @LastEditTime: 2024-06-02 00:06:44
 * @FilePath: /blocklet-project/api/src/routes/profile.ts
 */
import express, { Router, Request, Response } from 'express';
import { addUser, getUser, updateUser } from '../service/profile';

const router: Router = express.Router();

interface IProfile {
  username: string;
  phone: string;
  email: string;
  [key: string]: string;
}

// Create a new profile
router.post('/', async (req: Request, res: Response) => {
  const { username, email, phone } = req.body;
  try {
    const newProfile = await addUser({ username, email, phone });
    res.status(200).send(newProfile);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a profile by ID
router.get('/:id', async (req: Request, res: Response) => {
  const profileId: number = Number(req.params.id);
  try {
    const profile: IProfile | undefined = await getUser(profileId);
    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a profile by ID
router.put('/:id', async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const { username, email, phone } = req.body;
  try {
    const updatedProfile = await updateUser({
      id,
      username,
      email,
      phone,
    });
    res.status(200).send(updatedProfile);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
