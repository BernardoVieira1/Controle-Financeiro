"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function checkAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado' });
    }
    try {
        const secret = process.env.SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(400).json({ msg: 'Token inválido' });
    }
}
exports.default = checkAuth;
