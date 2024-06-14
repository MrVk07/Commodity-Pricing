import express, { Router } from 'express';
import { scrapData } from '../modules/controllers/scrapData';

const router: Router = express.Router();

router.get('/:category', scrapData);

export default router;
