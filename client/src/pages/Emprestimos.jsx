import React, { useState, useEffect } from "react";
import "../styles/Emprestimo.css"; 

function Emprestimo() {
  const [pessoaId, setPessoaId] = useState("");
  const [livroId, setLivroId] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [pessoaDetails, setPessoaDetails] = useState(null);
  const [livroDetails, setLivroDetails] = useState(null);
  const [showConfirmacao, setShowConfirmacao] = useState(false);

  const fetchPessoaDetails = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/pessoa/pessoas/${id}`);
      const data = await response.json();
      if (response.ok) {
        setPessoaDetails(data);
      } else {
        setPessoaDetails(null);
      }
    } catch (error) {
      setPessoaDetails(null);
    }
  };

  const fetchLivroDetails = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/livro/livros/${id}`);
      const data = await response.json();
      if (response.ok) {
        setLivroDetails(data);
      } else {
        setLivroDetails(null);
      }
    } catch (error) {
      setLivroDetails(null);
    }
  };

  useEffect(() => {
    if (pessoaId) {
      fetchPessoaDetails(pessoaId);
    }
    if (livroId) {
      fetchLivroDetails(livroId);
    }
  }, [pessoaId, livroId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = {
      pessoa_id: pessoaId,
      livro_id: livroId,
      data_devolucao: dataDevolucao,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/emprestimo/registrar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const result = await response.json();

      if (response.ok) {
        setMensagem(`Sucesso! Empréstimo registrado com ID: ${result.emprestimo_id}`);
      } else {
        setMensagem(`Erro: ${result.error}`);
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="emprestimo-container">
      <h1>Registrar Empréstimo</h1>
      <form onSubmit={handleSubmit} className="form-container-em">
        <div className="input-field">
          <label>Pessoa ID:</label>
          <input
            type="text"
            value={pessoaId}
            onChange={(e) => setPessoaId(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label>Livro ID:</label>
          <input
            type="text"
            value={livroId}
            onChange={(e) => setLivroId(e.target.value)}
            required
          />
        </div>

        <button type="button" onClick={() => setShowConfirmacao(true)} className="btn-confirmar-e">
          Visualizar Confirmação
        </button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      {showConfirmacao && pessoaDetails && livroDetails && (
        <form onSubmit={handleSubmit}>
          <div className="confirmacao">
            <h3>Confirmação do Empréstimo</h3>
            <div className="info-container">
              <h4>Pessoa:</h4>
              <div className="info">
                <p className="informacao"><strong>Nome:</strong> {pessoaDetails.nome}</p>
                <p className="informacao"><strong>Email:</strong> {pessoaDetails.email}</p>
              </div>
            </div>

            <div className="info-container">
              <h4>Livro:</h4>
              <div className="info">
                <p className="informacao"><strong>Título:</strong> {livroDetails.titulo}</p>
                <p className="informacao"><strong>Autor:</strong> {livroDetails.autor}</p>
              </div>
            </div>

            <div className="data-devolucao">
              <label htmlFor="dataDevolucao">Data para devolução:</label>
              <input
                type="date"
                id="dataDevolucao"
                value={dataDevolucao}
                onChange={(e) => setDataDevolucao(e.target.value)}
                required
              />
            </div>

            <div className="actions">
              <button type="submit" className="btn-confirmar">Confirmar</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Emprestimo;
