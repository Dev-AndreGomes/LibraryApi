import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/LivrosEdit.css';

const LivrosEdit = () => {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [anoLancamento, setAnoLancamento] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarLivros = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/livro/livros/${id}`);
        const data = await response.json();
        setTitulo(data.titulo);
        setAutor(data.autor);
        setGenero(data.genero);
        setAnoLancamento(data.ano_lancamento);
      } catch (err) {
        console.log(err);
      }
    };
    buscarLivros();
  }, [id]);

  const updateLivro = async () => {
    const livroData = {
      titulo,
      autor,
      genero,
      ano_lancamento: anoLancamento,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/livro/livros/create/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livroData),
      });
      const data = await response.json();
      navigate("/"); 
    } catch (err) {
      console.log(err);
    }
  };

 
  const cancelarEdicao = () => {
    navigate("/"); 
  };

  return (
    <div className="edit-container">
      <h1>Editar Livro</h1>
      <div className="edit-form">
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
          />
        </div>
        <div className="form-group">
          <label>Autor</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            placeholder="Autor"
          />
        </div>
        <div className="form-group">
          <label>Gênero</label>
          <input
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            placeholder="Gênero"
          />
        </div>
        <div className="form-group">
          <label>Ano de Lançamento</label>
          <input
            type="number"
            value={anoLancamento}
            onChange={(e) => setAnoLancamento(e.target.value)}
            placeholder="Ano de Lançamento"
          />
        </div>
        <div className="buttons">
          <button className="btn-save" onClick={updateLivro}>Salvar</button>
          <button className="btn-cancel" onClick={cancelarEdicao}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default LivrosEdit;
