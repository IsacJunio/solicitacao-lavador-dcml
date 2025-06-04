import './CardSolicitacao.css';

function CardSolicitacao({ item, onClick }) {
  // Função para capitalizar primeira letra
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Determina a classe de prioridade
  const getPrioridadeClass = (prioridade) => {
    const prioridadeLower = prioridade?.toLowerCase()?.trim();
    switch(prioridadeLower) {
      case "importante":
        return "prioridade-importante";
      case "urgente":
        return "prioridade-urgente";
      default:
        return "prioridade-normal";
    }
  };

  return (
    <div className={`card-solicitacao ${getPrioridadeClass(item.prioridade)}`} onClick={onClick} >
      <h2>{capitalizeFirstLetter(item.name)} ({item.nm})</h2>
      <p><strong>Componente:</strong> {capitalizeFirstLetter(item.componente)}</p>
      <p><strong>Peça Identificada:</strong> {capitalizeFirstLetter(item.peca_indentificada)}</p>
      <p><strong>Entrada:</strong> {item.data_entrada} às {item.hora_entrada}</p>
      <p><strong>Saída:</strong> {item.data_saida || "-"} {item.hora_saida ? `às ${item.hora_saida}` : ""}</p>
      <p><strong>Prioridade:</strong> {capitalizeFirstLetter(item.prioridade)}</p>
      <p><strong>Responsáveis:</strong> {capitalizeFirstLetter(item.responsaveis) || "-"}</p>
      <p><strong>Lavador:</strong> {capitalizeFirstLetter(item.lavador) || "-"}</p>
      <p><strong>Setor:</strong> {capitalizeFirstLetter(item.setor)}</p>
    </div>
  );
}

export default CardSolicitacao;