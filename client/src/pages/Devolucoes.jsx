import React, { useState } from "react";
import '../styles/Devolucoes.css'

function Devolucoes() {
  const [emprestimoId, setEmprestimoId] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");
  const [emprestimoDetails, setEmprestimoDetails] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const fetchEmprestimoDetails = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/emprestimo/detalhes/${id}/`);
      const data = await response.json();
      if (response.ok) {
        setEmprestimoDetails(data);
      } else {
        setEmprestimoDetails(null);
      }
    } catch (error) {
      setEmprestimoDetails(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = {
      emprestimo_id: emprestimoId,
      data_devolucao: dataDevolucao,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/emprestimo/devolver/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMensagem(`Sucesso! Devolução registrada com ID: ${result.devolucao_id}`);
      } else {
        setMensagem(`Erro: ${result.error}`);
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="devolucao-container">
      <h1>Registrar Devolução</h1>
      <form onSubmit={handleSubmit} className="form-devolucao">
        <div className="form-group">
          <label className="label-devolucao">ID do Empréstimo:</label>
          <input
            type="text"
            value={emprestimoId}
            onChange={(e) => {
              setEmprestimoId(e.target.value);
              fetchEmprestimoDetails(e.target.value); 
            }}
            required
            className="input-devolucao"
          />
        </div>
        {emprestimoDetails && (
          <div className="confirmacao">
            <h3>Confirmar Devolução</h3>
            <p className="info-pessoa"><strong>Pessoa:</strong> {emprestimoDetails.pessoa.nome}</p>
            <p className="info-livro"><strong>Livro:</strong> {emprestimoDetails.livro.titulo}</p>
            <div className="form-group">
              <label htmlFor="dataDevolucao" className="label-devolucao">Data de Devolução:</label>
              <input
                type="date"
                value={dataDevolucao}
                onChange={(e) => setDataDevolucao(e.target.value)}
                required
                className="input-devolucao"
              />
            </div>
            <div className="actions-d">
              <button type="submit" className="btn-confirmar-d">Confirmar Devolução</button>
              <button
                type="button"
                onClick={() => { setEmprestimoDetails(null); }}
                className="btn-cancelar-d"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}

export default Devolucoes;
