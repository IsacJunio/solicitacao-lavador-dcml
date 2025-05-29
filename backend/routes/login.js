import express from 'express';

const router = express.Router();

export default (prisma) => {
  router.post("/login", async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Nome e senha obrigatorio!" });
    }

    const user = await prisma.user.findFirst({
      where: { name, password }
    });

    if (!user) {
      return res.status(401).json({ message: "Usuario ou senha inválidos" });
    }

    res.status(200).json({ message: "Login realizado com sucesso", user });
  });

  return router;
};