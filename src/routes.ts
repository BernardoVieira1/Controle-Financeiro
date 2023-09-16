import { Router } from 'express';
import TransactionsController from './controllers/TransactionsController';
import UserController from './controllers/UserController';
import checkAuth from './middlewares/auth';
import authcontroller from './controllers/authcontroller';
const router = Router();

//Rotas de operações
router.get('/', (req, res) => {return res.send('salve galera');});
router.post('/createTransaction',checkAuth, TransactionsController.createTransaction);
router.get('/getTransactions',checkAuth, TransactionsController.getTransactions);
router.get('/searchTransactions',checkAuth, TransactionsController.searchTransactions);
router.get('/getTransaction/:id',checkAuth, TransactionsController.getTransaction);
router.get('/getMyTransactions',checkAuth, TransactionsController.getMyTransactions);
router.delete('/deleteTransaction/:id',checkAuth, TransactionsController.deleteTransaction);




//Rotas usuario
router.get('/listUsers',checkAuth, UserController.listUsers);
router.post('/editUser/:id',checkAuth, UserController.editUser);

//Rotas de login
router.post('/auth/user', authcontroller.loginUser);
router.post('/createUser', UserController.createUser);


export default router;

