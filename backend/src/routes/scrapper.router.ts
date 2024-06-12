import express, { Router } from 'express';
import { scrapData } from '../modules/scrapData/scrapData';

const router: Router = express.Router();

router.get('/category/:category', scrapData);

export default router;
