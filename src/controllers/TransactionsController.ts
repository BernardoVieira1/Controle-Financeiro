import { Request, Response } from 'express';
import { prisma } from '../database';

export default{
	async createTransaction(req: Request, res: Response){
		try{
			const {value, type, categoria} = req.body;

			if(!value){
				return res.status(400).json({message: 'valor não informado'});
			}

			if(!type){
				return res.status(400).json({message: 'tipo não informado'});
			}

			if(!categoria){
				return res.status(400).json({message: 'categoria não informado'});
			}


			const transaction = await prisma.transactions.create({
				data:{
					value,
					type,
					categoria,
				}
			});

			return res.status(201).json({
				err: false,
				message: 'transaction criada com sucesso',
				transaction
			});

		} catch (err) {
			return res.json({ message: err.message });
		}
	},

	async getTransaction(req: Request, res: Response){
		try {
			const transactions = await prisma.transactions.findMany();

			res.json({
				err: false,
				message: 'Lista com todas as transactions',
				transactions

			});
		} catch (err) {
			return res.json({ message: err.message });
		}
	}


};