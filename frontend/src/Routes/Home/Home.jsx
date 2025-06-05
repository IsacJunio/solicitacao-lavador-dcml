import "./Home.css";
import Header from "../../components/Header/Header";
import PainelSolicitacoes from "../../components/TvInfo/PainelSolicitacoes";
import SolicitacaoApi from "../../services/Solicitacao";
import { useState } from "react";

const initialFormState = {
  name: "",
  nm: "",
  componente: "",
  peca_indentificada: "",
  data_entrada: "",
  hora_entrada: "",
  data_saida: "",
  hora_saida: "",
  prioridade: "",
  setor: "",
  lavador: "Aberto",
};

const Home = () => {
  const [form, setForm] = useState(initialFormState);
  const [modalOpen, setModalOpen] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formToSend = {
      ...form,
      nm: Number(form.nm),
      lavador: form.lavador || "Aberto"
    };
    SolicitacaoApi.create(formToSend)
      .then(() => {
        setForm(initialFormState);
        setModalOpen(false);
      })
      .catch((err) => {
        alert("Erro ao salvar solicitação!");
        console.error(err);
      });
  }

  function handleOpenModal() {
    setForm(initialFormState);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setForm(initialFormState);
    setModalOpen(false);
  }

  return (
    <>
      <Header onSolicitar={handleOpenModal} />
      <div className="home-content">
        <PainelSolicitacoes hideEncerrado={true} onSelect={null} />
        {modalOpen && (
          <div className="modal-form-bg">
            <form className="form-solicitacao" onSubmit={handleSubmit}>
              <h2>Nova Solicitação</h2>
              <div className="form-grid">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nome"
                  required
                />
                <input
                  name="nm"
                  value={form.nm}
                  onChange={handleChange}
                  placeholder="NM"
                  required
                />
                <input
                  name="componente"
                  value={form.componente}
                  onChange={handleChange}
                  placeholder="Componente"
                  required
                />
                <input
                  name="peca_indentificada"
                  value={form.peca_indentificada}
                  onChange={handleChange}
                  placeholder="Peça Identificada"
                  required
                />
                <input
                  name="data_entrada"
                  value={form.data_entrada}
                  onChange={handleChange}
                  placeholder="Data Entrada"
                  required
                />
                <input
                  name="hora_entrada"
                  value={form.hora_entrada}
                  onChange={handleChange}
                  placeholder="Hora Entrada"
                  required
                />
                <select
                  name="prioridade"
                  value={form.prioridade}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Selecione a Prioridade</option>
                  <option value="Urgente">Urgente</option>
                  <option value="Importante">Importante</option>
                  <option value="Normal">Normal</option>
                </select>
                <input
                  name="setor"
                  value={form.setor}
                  onChange={handleChange}
                  placeholder="Setor"
                  required
                />
                <select 
                  name="lavador" 
                  value={form.lavador} 
                  onChange={handleChange} 
                  required
                  className="form-select"
                >
                  <option value="Aberto">Aberto</option>
                  <option value="Em Lavagem">Em Lavagem</option>
                  <option value="Encerrado">Encerrado</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit">Adicionar</button>
                <button type="button" onClick={handleCloseModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
