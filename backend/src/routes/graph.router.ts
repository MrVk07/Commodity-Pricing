import express, { Router } from 'express';
import { getCumulativeDataByPlace, getCumulativeDataByItem } from '../modules/controllers/getCumulativeData';

const router: Router = express.Router();

router.get('/item/:item', getCumulativeDataByItem);
router.get('/place/:place', getCumulativeDataByPlace);

export default router;
