"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TransactionsController_1 = __importDefault(require("./controllers/TransactionsController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const authcontroller_1 = __importDefault(require("./controllers/authcontroller"));
const valuesController_1 = __importDefault(require("./controllers/valuesController"));
const router = (0, express_1.Router)();
//Rotas de operações
router.get('/', (req, res) => { return res.send('salve galera'); });
router.post('/createTransaction', auth_1.default, TransactionsController_1.default.createTransaction);
router.get('/getTransactions', auth_1.default, TransactionsController_1.default.getTransactions);
router.get('/searchTransactions', auth_1.default, TransactionsController_1.default.searchTransactions);
router.get('/getTransaction/:id', auth_1.default, TransactionsController_1.default.getTransaction);
router.get('/getMyTransactions', auth_1.default, TransactionsController_1.default.getMyTransactions);
router.delete('/deleteTransaction/:id', auth_1.default, TransactionsController_1.default.deleteTransaction);
//Rotas de prços
router.get('/getValues', auth_1.default, valuesController_1.default.getValuesTransactions);
//Rotas usuario
router.get('/listUsers', auth_1.default, UserController_1.default.listUsers);
router.post('/editUser/:id', auth_1.default, UserController_1.default.editUser);
//Rotas de login
router.post('/auth/user', authcontroller_1.default.loginUser);
router.post('/createUser', UserController_1.default.createUser);
exports.default = router;
