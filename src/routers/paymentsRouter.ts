import express from 'express';
import PaymentsController from '../controllers/paymentsController';

const paymentsController = new PaymentsController();
 
const router = express.Router();
 
router.get('/', paymentsController.getPayments);
 
export default router;