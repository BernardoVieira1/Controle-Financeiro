import express from 'express';
import TransactionsController from './controllers/TransactionsController';
import { env } from 'process';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	return res.send('salve galera');
});

app.post('/createTransaction', TransactionsController.createTransaction);
app.get('/getTransaction', TransactionsController.getTransaction);



app.listen(env.PORT,()=>{
	console.log(`Servidor rodando: http://localhost:${env.PORT}`);
});