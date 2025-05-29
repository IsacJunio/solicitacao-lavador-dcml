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

    const reloadPage = () => {
      window.location.reload();
    };

    socket.on("novaSolicitacao", reloadPage);
    socket.on("solicitacaoRemovida", reloadPage);
    socket.on("solicitacaoAtualizada", reloadPage);

    return () => {
      clearInterval(interval);
      socket.off("novaSolicitacao", reloadPage);
      socket.off("solicitacaoRemovida", reloadPage);
      socket.off("solicitacaoAtualizada", reloadPage);
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
