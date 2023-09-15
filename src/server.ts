import app from './app';
import { env } from 'process';

const PORT = env.PROT || 8080;

app.listen(PORT,()=>{
	console.log(`Servidor rodando: http://localhost:${PORT}`);
});