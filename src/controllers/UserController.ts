import { Request, Response } from 'express';
import { prisma } from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// interface User {
//     id: string,
//     name: string,
//     email: string,
//     createdAt: string,
//     password: string
// }


export default{

	async createUser(req:Request,res:Response){
		try {
			const {name,email,password} = req.body;

			if(!name || !email || !password){
				return res.status(400).json({ message: 'preencha todos os campos' });
			}

			const userExists = await prisma.user.findMany({
				where:{
					email: email
				}
			});

			if(userExists.length != 0){
				return res.status(404).json({ message: 'este email já está em uso'});
			}

			const salt = await bcrypt.genSalt(12);
			const passwordHash = await bcrypt.hash(password,salt);

			const user = await prisma.user.create({
				data:{
					name,
					email,
					password: passwordHash
				}
			});

			res.status(201).json({
				message: 'usuario criado com sucesso',
				user
			});

		} catch (err) {
			res.json({ message: err.message});
		}
	},

	async loginUser(req:Request,res:Response){
		try {
			const {email,password} = req.body;


			if(!email || !password){
				return res.status(400).json({ message: 'preencha todos os campos' });
			}

			const user = await prisma.user.findMany({
				where:{
					email: email
				}
			});


			if(user.length != 1){
				return res.status(404).json({ message: 'Usuario não está cadastrado'});
			}

			const checkPassword = await bcrypt.compare(password, user[0].password);

			if(!checkPassword){
				return res.status(201).json({
					message: 'Senha incorreta',
					checkPassword
				});

			}

			const secret = process.env.SECRET;
			const token = jwt.sign({id: user[0].id}, secret);

			res.status(201).json({
				message: 'usuario logado com sucesso',
				token
			});

		} catch (err) {
			res.json({ message: err.message});
		}
	},

	async listUsers(req: Request, res: Response){
		try {
			const users = await prisma.user.findMany({
				select:{
					id: true,
					name: true,
					email: true,
					createdAt: true,
					avatarUrl: true,
				}
			});

			if(users.length == 0){
				return res.json({ msg: 'nenhum usuario cadastrado' });
			}

			res.json({ users });

		} catch (err) {
			res.json({ msg: err.message });
		}
	}

	// async editUser(req: Request, res: Response){
	// 	try {
	//         const { name } =

	// 		const userExist = await prisma.user.findUnique({
	//             where:{
	//                 id: req.params.id
	//             }
	//         });

	// 		if(!userExist){
	// 			return res.json({ msg: 'Usuario não existe' });
	// 		}

	//         const userEdit = await prisma.user.


	// 		res.json({ user });

	// 	} catch (err) {
	// 		res.json({ msg: err.message });
	// 	}
	// }


};
