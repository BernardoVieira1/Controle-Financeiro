"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'preencha todos os campos' });
            }
            const user = await database_1.prisma.user.findMany({
                where: {
                    email: email
                }
            });
            if (user.length != 1) {
                return res.status(404).json({ message: 'Usuario não está cadastrado' });
            }
            const checkPassword = await bcrypt_1.default.compare(password, user[0].password);
            if (!checkPassword) {
                return res.status(400).json({
                    message: 'Senha incorreta',
                    checkPassword
                });
            }
            const secret = process.env.SECRET;
            const token = jsonwebtoken_1.default.sign({ id: user[0].id }, secret);
            res.status(201).json({
                message: 'usuario logado com sucesso',
                token
            });
        }
        catch (err) {
            res.json({ message: err.message });
        }
    },
};
