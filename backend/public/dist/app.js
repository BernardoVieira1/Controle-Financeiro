"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
// import cors from 'cors';
const app = (0, express_1.default)();
// const whitelist = ['http://localhost:3000'];
// const corsOptions: cors.CorsOptions = {
// 	origin: (origin, callback) => {
// 		if (whitelist.indexOf(origin!) !== -1) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error('Acesso não permitido por CORS'));
// 		}
// 	},
// };
// app.use(cors(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.default);
exports.default = app;
