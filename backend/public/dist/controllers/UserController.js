"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'preencha todos os campos' });
            }
            const userExists = await database_1.prisma.user.findMany({
                where: {
                    email: email
                }
            });
            if (userExists.length != 0) {
                return res.status(404).json({ message: 'este email já está em uso' });
            }
            const salt = await bcrypt_1.default.genSalt(12);
            const passwordHash = await bcrypt_1.default.hash(password, salt);
            const user = await database_1.prisma.user.create({
                data: {
                    name,
                    email,
                    password: passwordHash
                }
            });
            res.status(201).json({
                message: 'usuario criado com sucesso',
                user
            });
        }
        catch (err) {
            res.json({ message: err.message });
        }
    },
    async listUsers(req, res) {
        try {
            const users = await database_1.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    avatarUrl: true,
                }
            });
            if (users.length == 0) {
                return res.json({ msg: 'nenhum usuario cadastrado' });
            }
            res.json({ users });
        }
        catch (err) {
            res.json({ msg: err.message });
        }
    },
    async editUser(req, res) {
        try {
            const { name, email } = req.body;
            const userExist = await database_1.prisma.user.findUnique({
                where: {
                    id: req.params.id,
                }
            });
            if (!userExist) {
                return res.json({ msg: 'Usuario não existe' });
            }
            const userEdit = await database_1.prisma.user.update({
                where: {
                    id: userExist.id
                },
                data: {
                    name,
                    email
                }
            });
            res.json({ userEdit });
        }
        catch (err) {
            res.json({ msg: err.message });
        }
    }
};
