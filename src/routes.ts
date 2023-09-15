import { Router } from 'express';
import TransactionsController from './controllers/TransactionsController';

const router = Router();

//Rotas de operações
router.post('/createTransaction', TransactionsController.createTransaction);
router.get('/', (req, res) => {return res.send('salve galera');});
router.get('/getTransactions', TransactionsController.getTransactions);
router.get('/searchTransactions', TransactionsController.searchTransactions);
router.get('/getTransaction/:id', TransactionsController.getTransaction);
router.delete('/deleteTransaction/:id', TransactionsController.deleteTransaction);

export default router;

