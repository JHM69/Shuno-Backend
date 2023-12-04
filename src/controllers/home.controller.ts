import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import {
  getSongs, 
} from '../services/songs.service';

const router = Router();

 
router.get('/home', auth.optional, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getSongs(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});
 

export default router;
