import Header from "../../components/Header/Header";
import PainelSolicitacoes from "../../components/TvInfo/PainelSolicitacoes";
import SolicitacaoApi from "../../services/Solicitacao";
import "../Home/Home.css";
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
  lavador: "",
};

const Menu = () => {
  const [form, setForm] = useState(initialFormState);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
  e.preventDefault();
  // Remova o id do objeto enviado para o update
  const { id, ...formToSend } = {
    ...form,
    nm: Number(form.nm),
  };
  if (editId) {
    SolicitacaoApi.update(editId, formToSend)
      .then(() => {
        setForm(initialFormState);
        setEditId(null);
        setModalOpen(false);
      })
      .catch(err => {
        alert("Erro ao atualizar solicitação!");
        console.error(err);
      });
  } else {
    SolicitacaoApi.create(formToSend)
      .then(() => {
        setForm(initialFormState);
        setModalOpen(false);
      })
      .catch(err => {
        alert("Erro ao salvar solicitação!");
        console.error(err);
      });
  }
}

  function handleCloseModal() {
    setForm(initialFormState);
    setEditId(null);
    setModalOpen(false);
  }

  function handleSelectSolicitacao(item) {
    setForm({
      ...item,
      nm: item.nm.toString()
    });
    setEditId(item.id);
    setModalOpen(true);
  }

  function handleDelete() {
    if (editId && window.confirm("Tem certeza que deseja excluir?")) {
      SolicitacaoApi.delete(editId)
        .then(() => {
          setForm(initialFormState);
          setEditId(null);
          setModalOpen(false);
        })
        .catch(err => {
          alert("Erro ao excluir solicitação!");
          console.error(err);
        });
    }
  }

  return (
    <>
      <Header />
      <div className="menu-content">
        <PainelSolicitacoes onSelect={handleSelectSolicitacao} />
        {modalOpen && (
          <div className="modal-form-bg">
            <form className="form-solicitacao" onSubmit={handleSubmit}>
              <h2>{editId ? "Editar Solicitação" : "Nova Solicitação"}</h2>
              <div className="form-grid">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" required />
                <input name="nm" value={form.nm} onChange={handleChange} placeholder="NM" required />
                <input name="componente" value={form.componente} onChange={handleChange} placeholder="Componente" required />
                <input name="peca_indentificada" value={form.peca_indentificada} onChange={handleChange} placeholder="Peça Identificada" />
                <input name="data_entrada" value={form.data_entrada} onChange={handleChange} placeholder="Data Entrada" />
                <input name="hora_entrada" value={form.hora_entrada} onChange={handleChange} placeholder="Hora Entrada" />
                <input name="data_saida" value={form.data_saida} onChange={handleChange} placeholder="Data Saída" />
                <input name="hora_saida" value={form.hora_saida} onChange={handleChange} placeholder="Hora Saída" />
                <input name="prioridade" value={form.prioridade} onChange={handleChange} placeholder="Prioridade" />
                <input name="setor" value={form.setor} onChange={handleChange} placeholder="Setor" />
                <input name="lavador" value={form.lavador} onChange={handleChange} placeholder="Lavador" />
                <input name="responsaveis" value={form.responsaveis} onChange={handleChange} placeholder="Responsáveis" />
              </div>
              <div className="form-actions">
                <button type="submit">{editId ? "Salvar" : "Adicionar"}</button>
                {editId && (
                  <button type="button" onClick={handleDelete} style={{ background: "red", color: "#fff" }}>
                    Excluir
                  </button>
                )}
                <button type="button" onClick={handleCloseModal}>Cancelar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;