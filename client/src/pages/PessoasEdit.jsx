import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/PessoasEdit.css';

const PessoasEdit = () => {
  const { id } = useParams(); 
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [limiteEmprestimos, setLimiteEmprestimos] = useState(3);
  const navigate = useNavigate();

  
  useEffect(() => {
    const buscarPessoa = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/pessoa/pessoas/create/${id}`); 
        const data = await response.json();
        setNome(data.nome);
        setEndereco(data.endereco);
        setEmail(data.email);
        setTelefone(data.telefone);
        setLimiteEmprestimos(data.limite_emprestimos);
      } catch (err) {
        console.log(err);
      }
    };
    buscarPessoa();
  }, [id]);

  const updatePessoa = async () => {
    const pessoaData = {
      nome,
      endereco,
      email,
      telefone,
      limite_emprestimos: limiteEmprestimos,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/pessoa/pessoas/create/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pessoaData),
      });
      const data = await response.json();
      navigate("/pessoas"); 
    } catch (err) {
      console.log(err);
    }
  };

  const cancelarEdicao = () => {
    navigate("/pessoas"); 
  };

  return (
    <div className="edit-container">
      <h1>Editar Pessoa</h1>
      <div className="edit-form">
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
          />
        </div>
        <div className="form-group">
          <label>Endereço</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Endereço"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Telefone</label>
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Telefone"
          />
        </div>
        <div className="form-group">
          <label>Limite de Empréstimos</label>
          <input
            type="number"
            value={limiteEmprestimos}
            onChange={(e) => setLimiteEmprestimos(e.target.value)}
            placeholder="Limite de Empréstimos"
          />
        </div>
        <div className="buttons">
          <button className="btn-save" onClick={updatePessoa}>Salvar</button>
          <button className="btn-cancel" onClick={cancelarEdicao}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default PessoasEdit;
