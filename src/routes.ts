import { Router } from 'express';
import TransactionsController from './controllers/TransactionsController';
import UserController from './controllers/UserController';
import checkAuth from './middlewares/auth';
const router = Router();

//Rotas de operações
router.get('/', (req, res) => {return res.send('salve galera');});
router.post('/createTransaction',checkAuth, TransactionsController.createTransaction);
router.get('/getTransactions',checkAuth, TransactionsController.getTransactions);
router.get('/searchTransactions',checkAuth, TransactionsController.searchTransactions);
router.get('/getTransaction/:id',checkAuth, TransactionsController.getTransaction);
router.delete('/deleteTransaction/:id',checkAuth, TransactionsController.deleteTransaction);

//Rotas usuario
router.get('/listUsers',checkAuth, UserController.listUsers);

//Rotas de login
router.post('/auth/user', UserController.loginUser);
router.post('/createUser', UserController.createUser);


export default router;

