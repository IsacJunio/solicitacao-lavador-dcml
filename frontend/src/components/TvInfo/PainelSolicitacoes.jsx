import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CardSolicitacao from "./CardSolicitacao";
import SolicitacaoApi from "../../services/Solicitacao";
import { useLocation } from "react-router-dom";

const socket = io(
  "https://solicitacao-lavador-dcml.onrender.com/api/solicitacoes"
);

const PainelSolicitacoes = ({ onSelect, hideEncerrado }) => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const location = useLocation();

  const updateSolicitacoes = () => {
    SolicitacaoApi.getAll()
      .then((data) => {
        let filteredData = data;
        // Na página inicial, mostra apenas solicitações sem lavador atribuído
        if (location.pathname === "/") {
          filteredData = data.filter(item => item.lavador === "Aberto");
        } 
        // Em outras páginas, se hideEncerrado for true, filtra fora os encerrados
        else if (hideEncerrado) {
          filteredData = data.filter(item => item.lavador !== "Encerrado");
        }
        setSolicitacoes(filteredData);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    updateSolicitacoes();

    const interval = setInterval(updateSolicitacoes, 10000);

    socket.on("novaSolicitacao", updateSolicitacoes);
    socket.on("solicitacaoRemovida", updateSolicitacoes);
    socket.on("solicitacaoAtualizada", updateSolicitacoes);

    return () => {
      clearInterval(interval);
      socket.off("novaSolicitacao");
      socket.off("solicitacaoRemovida");
      socket.off("solicitacaoAtualizada");
    };
  }, [hideEncerrado, location.pathname]);

  return (
    <section className="painel">
      {solicitacoes.map((item) => (
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
