import Header from "../../components/Header/Header";
import PainelSolicitacoes from "../../components/TvInfo/PainelSolicitacoes";
import SolicitacaoApi from "../../services/Solicitacao";
import "../Home/Home.css";
import "./Menu.css";
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
  responsaveis: "",
};

const Menu = () => {
  const [form, setForm] = useState(initialFormState);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  // Função para capitalizar primeira letra
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  function handleChange(e) {
    const { name, value } = e.target;
    // Capitaliza o valor imediatamente ao digitar, exceto para nm e lavador
    const newValue = name === 'nm' || name === 'lavador' ? value : capitalizeFirstLetter(value);
    setForm(prev => ({ ...prev, [name]: newValue }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Capitaliza os campos de texto
    const formCapitalized = {
      ...form,
      name: capitalizeFirstLetter(form.name),
      componente: capitalizeFirstLetter(form.componente),
      peca_indentificada: capitalizeFirstLetter(form.peca_indentificada),
      prioridade: capitalizeFirstLetter(form.prioridade),
      setor: capitalizeFirstLetter(form.setor),
      lavador: form.lavador,
      responsaveis: form.responsaveis ? capitalizeFirstLetter(form.responsaveis) : form.responsaveis,
      nm: Number(form.nm),
    };

    // Remove o id antes de enviar
    const { id: _, ...formToSend } = formCapitalized;

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
    // Capitaliza os valores ao carregar para edição
    setForm({
      ...item,
      name: capitalizeFirstLetter(item.name),
      componente: capitalizeFirstLetter(item.componente),
      peca_indentificada: capitalizeFirstLetter(item.peca_indentificada),
      prioridade: capitalizeFirstLetter(item.prioridade),
      setor: capitalizeFirstLetter(item.setor),
      lavador: item.lavador,
      responsaveis: item.responsaveis ? capitalizeFirstLetter(item.responsaveis) : item.responsaveis,
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
                <input name="setor" value={form.setor} onChange={handleChange} placeholder="Setor" />
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