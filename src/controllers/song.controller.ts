import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import {
  addComment,
  createSong,
  deleteSong,
  deleteComment,
  favoriteSong,
  getSong,
  getSongs,
  getCommentsBySong,
  unfavoriteSong,
  updateSong,
} from '../services/songs.service';

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
router.get('/songs', auth.optional, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getSongs(req.query, req.user?.username);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * Get paginated feed songs
 * @auth required
 * @route {GET} /songs/feed
 * @returns songs list of songs
 */
router.get(
  '/songs',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("result");
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Create song
 * @route {POST} /songs
 * @bodyparam  title
 * @bodyparam  description
 * @bodyparam  body
 * @bodyparam  tagList list of tags
 * @returns song created song
 */
router.post('/songs', auth.required, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const song = await createSong(req.body.song, req.user?.username as string);
    res.json({ song });
  } catch (error) {
    next(error);
  }
});

/**
 * Get unique song
 * @auth optional
 * @route {GET} /song/:slug
 * @param slug slug of the song (based on the title)
 * @returns song
 */
router.get(
  '/songs/:slug',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const song = await getSong(req.params.slug, req.user?.username as string);
      res.json({ song });
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Update song
 * @auth required
 * @route {PUT} /songs/:slug
 * @param slug slug of the song (based on the title)
 * @bodyparam title new title
 * @bodyparam description new description
 * @bodyparam body new content
 * @returns song updated song
 */
router.put(
  '/songs/:slug',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const song = await updateSong(
        req.body.song,
        req.params.slug,
        req.user?.username as string,
      );
      res.json({ song });
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Delete song
 * @auth required
 * @route {DELETE} /song/:id
 * @param slug slug of the song
 */
router.delete(
  '/songs/:slug',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteSong(req.params.slug);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Get comments from an song
 * @auth optional
 * @route {GET} /songs/:slug/comments
 * @param slug slug of the song (based on the title)
 * @returns comments list of comments
 */
router.get(
  '/songs/:slug/comments',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comments = await getCommentsBySong(req.params.slug, req.user?.username);
      res.json({ comments });
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Add comment to song
 * @auth required
 * @route {POST} /songs/:slug/comments
 * @param slug slug of the song (based on the title)
 * @bodyparam body content of the comment
 * @returns comment created comment
 */
router.post(
  '/songs/:slug/comments',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comment = await addComment(
        req.body.comment.body,
        req.params.slug,
        req.user?.username as string,
      );
      res.json({ comment });
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Delete comment
 * @auth required
 * @route {DELETE} /songs/:slug/comments/:id
 * @param slug slug of the song (based on the title)
 * @param id id of the comment
 */
router.delete(
  '/songs/:slug/comments/:id',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteComment(Number(req.params.id), req.user?.username as string);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Favorite song
 * @auth required
 * @route {POST} /songs/:slug/favorite
 * @param slug slug of the song (based on the title)
 * @returns song favorited song
 */
router.post(
  '/songs/:slug/favorite',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const song = await favoriteSong(req.params.slug, req.user?.username as string);
      res.json({ song });
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Unfavorite song
 * @auth required
 * @route {DELETE} /songs/:slug/favorite
 * @param slug slug of the song (based on the title)
 * @returns song unfavorited song
 */
router.delete(
  '/songs/:slug/favorite',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const song = await unfavoriteSong(req.params.slug, req.user?.username as string);
      res.json({ song });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
