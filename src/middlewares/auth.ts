import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function checkAuth(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers['authorization'];
	const token = authHeader.split(' ')[1];

	if(!token){
		return res.status(401).json({ msg: 'Acesso negado' });
	}
	try {

		const secret = process.env.SECRET;
		jwt.verify(token, secret);

		next();

	} catch (err) {
		return res.status(400).json({ msg: 'Token inválido' });
	}
}

export default checkAuth;