import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CardSolicitacao from "./CardSolicitacao";
import SolicitacaoApi from "../../services/Solicitacao";
import { useLocation } from "react-router-dom";

const socket = io(
  "https://solicitacao-lavador-dcml.onrender.com/api/solicitacoes"
);

function PainelSolicitacoes({ onSelect }) {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const location = useLocation();

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

  // Filtra solicitações que têm lavador atribuído apenas na página inicial
  const filteredSolicitacoes = location.pathname === "/" 
    ? solicitacoes.filter(item => !item.lavador)
    : solicitacoes;

  return (
    <section className="painel">
      {filteredSolicitacoes.map((item) => (
        <CardSolicitacao
          key={item.id}
          item={item}
          onClick={() => onSelect?.(item)}
        />
      ))}
    </section>
  );
}

export default PainelSolicitacoes;
