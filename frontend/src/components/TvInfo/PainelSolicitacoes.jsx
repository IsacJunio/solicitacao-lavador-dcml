import { useEffect, useState, useCallback } from "react";
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

  const updateSolicitacoes = useCallback(() => {
    SolicitacaoApi.getAll()
      .then((data) => {
        let filteredData = data;
        // Na página inicial, mostra solicitações sem lavador atribuído e em lavagem
        if (location.pathname === "/") {
          filteredData = data.filter(item => item.lavador === "Aberto" || item.lavador === "Em Lavagem");
        } 
        // Em outras páginas, se hideEncerrado for true, filtra fora os encerrados
        else if (hideEncerrado) {
          filteredData = data.filter(item => item.lavador === "Aberto" || item.lavador === "Em Lavagem");
        }
        setSolicitacoes(filteredData);
      })
      .catch((err) => console.error(err));
  }, [hideEncerrado, location.pathname]);

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
  }, [updateSolicitacoes]);

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
