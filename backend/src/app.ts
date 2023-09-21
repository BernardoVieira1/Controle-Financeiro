import express from 'express';
import router from './routes';
import cors from 'cors';

const app = express();

const whitelist = ['http://localhost:3000'];

const corsOptions: cors.CorsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin!) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Acesso não permitido por CORS'));
		}
	},
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

export default app;