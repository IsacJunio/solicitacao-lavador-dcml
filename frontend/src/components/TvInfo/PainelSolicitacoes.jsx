import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CardSolicitacao from "./CardSolicitacao";
import SolicitacaoApi from "../../services/Solicitacao";

const socket = io("https://solicitacao-lavador-dcml.onrender.com");

function PainelSolicitacoes({ onSelect }) {
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    // Busca inicial ao montar o componente
    SolicitacaoApi.getAll().then(setSolicitacoes);

    // Atualiza a lista ao receber qualquer evento
    socket.on("novaSolicitacao", () => {
      SolicitacaoApi.getAll().then(setSolicitacoes);
    });
    socket.on("solicitacaoRemovida", () => {
      SolicitacaoApi.getAll().then(setSolicitacoes);
    });
    socket.on("solicitacaoAtualizada", () => {
      SolicitacaoApi.getAll().then(setSolicitacoes);
    });

    return () => {
      socket.off("novaSolicitacao");
      socket.off("solicitacaoRemovida");
      socket.off("solicitacaoAtualizada");
    };
  }, []);

  return (
    <section className="painel">
      {solicitacoes.map((item) => (
        <CardSolicitacao
          key={item.id}
          item={item}
          onClick={() => onSelect(item)}
        />
      ))}
    </section>
  );
}

export default PainelSolicitacoes;
