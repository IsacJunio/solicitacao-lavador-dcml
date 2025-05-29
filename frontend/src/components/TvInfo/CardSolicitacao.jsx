import './CardSolicitacao.css';

function CardSolicitacao({ item, onClick }) {
  return (
    <div className={`card-solicitacao prioridade-${item.prioridade?.toLowerCase()}`} onClick={onClick} >
      <h2>{item.name} ({item.nm})</h2>
      <p><strong>Componente:</strong> {item.componente}</p>
      <p><strong>Peça Identificada:</strong> {item.peca_indentificada}</p>
      <p><strong>Entrada:</strong> {item.data_entrada} às {item.hora_entrada}</p>
      <p><strong>Saída:</strong> {item.data_saida} às {item.hora_saida}</p>
      <p><strong>Responsáveis:</strong> {item.responsaveis || "-"}</p>
      <p><strong>Lavador:</strong> {item.lavador || "-"}</p>
      <p><strong>Setor:</strong> {item.setor}</p>
    </div>
  );
}

export default CardSolicitacao;