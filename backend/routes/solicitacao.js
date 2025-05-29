import express from "express";

const router = express.Router();

export default (prisma, io) => {
  router.get("/solicitacoes", async (req, res) => {
  try {
    const solicitacoes = await prisma.solicitacao.findMany();
    res.json(solicitacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar solicitações", details: error.message });
  }
});

  router.post("/solicitacoes", async (req, res) => {
    const data = req.body;
    try {
      const novaSolicitacao = await prisma.solicitacao.create({ data });
      res.json(novaSolicitacao);
      io.emit("novaSolicitacao", novaSolicitacao);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erro ao criar solicitação", details: error.message });
    }
  });

  router.put("/solicitacoes/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const solicitacaoAtualizada = await prisma.solicitacao.update({
        where: { id }, // id como string!
        data,
      });
      io.emit("solicitacaoAtualizada", solicitacaoAtualizada); // emite evento para atualizar todos
      res.json(solicitacaoAtualizada);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "Erro ao atualizar solicitação",
          details: error.message,
        });
    }
  });

  router.delete("/solicitacoes/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID inválido para exclusão" });
    }
    try {
      await prisma.solicitacao.delete({
        where: { id }, // <-- use id direto, sem Number()
      });
      io.emit("solicitacaoRemovida", id);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erro ao excluir solicitação", details: error.message });
    }
  });

  return router;
};
