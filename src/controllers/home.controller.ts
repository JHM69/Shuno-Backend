import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth'; 
import { getHomeData } from '../services/home.service';
 
const router = Router();


/**
 * Get paginated songs
 * @auth optional
 * @route {GET} /songs
 * @queryparam offset number of songs dismissed from the first one
 * @queryparam limit number of songs returned
 * @queryparam tag
 * @queryparam author
 * @queryparam favorited
 * @returns songs: list of songs
 */
router.get('/home', auth.optional, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getHomeData(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});
 

export default router;
