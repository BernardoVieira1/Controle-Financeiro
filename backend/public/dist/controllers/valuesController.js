"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
exports.default = {
    async getValuesTransactions(req, res) {
        const authUserId = req.userId;
        const userId = String(authUserId);
        try {
            let entryPrice = 0;
            let exitPrice = 0;
            const transactions = await database_1.prisma.transactions.findMany({
                where: {
                    userId: userId
                },
                select: {
                    value: true,
                    type: true,
                    dateCreate: true,
                }
            });
            transactions.forEach(transaction => {
                if (transaction.type === 'ENTRADA') {
                    entryPrice = entryPrice + transaction.value;
                }
                else {
                    exitPrice = exitPrice + transaction.value;
                }
            });
            res.json({
                entrada: Number(entryPrice),
                saida: Number(exitPrice),
                total: Number(entryPrice - exitPrice)
            });
        }
        catch (err) {
            return res.json({ message: err.message });
        }
    }
};
