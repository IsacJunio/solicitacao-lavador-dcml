import express from 'express';
import http from 'http';
import { PrismaClient } from '@prisma/client';
import loginRoutes from "./routes/login.js";
import solicitacaoRoutes from "./routes/solicitacao.js";
import { Server } from 'socket.io';
import cors from 'cors';


const prisma = new PrismaClient()


const app = express();
app.use(cors());
const port = 3000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());

app.use("/api", loginRoutes(prisma));
app.use("/api", solicitacaoRoutes(prisma, io));

server.listen(port,() => {
  console.log(`Servidor online http://localhost:${port}`);
});

export {io};