"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
exports.default = {
    async createTransaction(req, res) {
        try {
            const authUserId = req.userId;
            const userId = String(authUserId);
            const { title, value, type, categoria } = req.body;
            if (!userId) {
                return res.status(400).json({ message: 'Usuario não informado' });
            }
            if (!title) {
                return res.status(400).json({ message: 'Titulo não informado' });
            }
            if (!value) {
                return res.status(400).json({ message: 'valor não informado' });
            }
            if (!type) {
                return res.status(400).json({ message: 'tipo não informado' });
            }
            if (!categoria) {
                return res.status(400).json({ message: 'categoria não informado' });
            }
            const transaction = await database_1.prisma.transactions.create({
                data: {
                    userId,
                    title,
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
        }
        catch (err) {
            return res.json({ message: err.message });
        }
    },
    async getTransactions(req, res) {
        try {
            const transactions = await database_1.prisma.transactions.findMany();
            res.json({
                err: false,
                message: 'Lista com todas as transactions',
                transactions
            });
        }
        catch (err) {
            return res.json({ message: err.message });
        }
    },
    async searchTransactions(req, res) {
        try {
            const { search } = req.body;
            const transactions = await database_1.prisma.transactions.findMany({
                where: {
                    title: {
                        contains: search
                    }
                }
            });
            res.json({
                err: false,
                message: 'Lista com todas as transactions',
                transactions
            });
        }
        catch (err) {
            return res.json({ message: err.message });
        }
    },
    async getTransaction(req, res) {
        try {
            const transaction = await database_1.prisma.transactions.findMany({
                where: {
                    id: req.params.id
                }
            });
            if (transaction.length == 0) {
                return res.status(400).json({ message: 'Operação não encontrada' });
            }
            res.json({
                err: false,
                transaction
            });
        }
        catch (err) {
            return res.json({ message: err.message });
        }
    },
    async getMyTransactions(req, res) {
        try {
            const authUserId = req.userId;
            const userId = String(authUserId);
            const transactions = await database_1.prisma.transactions.findMany({
                where: {
                    userId: userId
                }
            });
            if (transactions.length == 0) {
                return res.status(200).json({ message: 'Você não tem operações' });
            }
            res.json({
                err: false,
                transactions
            });
        }
        catch (err) {
            return res.json({ message: err.message });
        }
    },
    async deleteTransaction(req, res) {
        try {
            const transactionExists = await database_1.prisma.transactions.findMany({
                where: {
                    id: req.params.id
                }
            });
            if (transactionExists.length == 0) {
                return res.status(400).json({ message: 'Operação não encontrada' });
            }
            const DeletTransaction = await database_1.prisma.transactions.delete({
                where: {
                    id: req.params.id
                }
            });
            res.json({
                err: false,
                message: 'deletado com sucesso',
                DeletTransaction
            });
        }
        catch (err) {
            res.json({ message: err.message });
        }
    }
};
