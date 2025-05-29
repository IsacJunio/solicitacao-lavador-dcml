import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CardSolicitacao from "./CardSolicitacao";
import SolicitacaoApi from "../../services/Solicitacao";

const socket = io(
  "https://solicitacao-lavador-dcml.onrender.com/api/solicitacoes"
);

function PainelSolicitacoes({ onSelect }) {
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    SolicitacaoApi.getAll().then(setSolicitacoes);

    const interval = setInterval(() => {
      SolicitacaoApi.getAll().then(setSolicitacoes);
    }, 10000); // a cada 10 segundos

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
      clearInterval(interval);
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
