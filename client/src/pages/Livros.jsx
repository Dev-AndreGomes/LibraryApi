import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import '../styles/Livros.css';  

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/livro/livros/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLivros(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        setLoading(false);
      }
    };
    fetchLivros();
  }, []);

  const deleteLivro = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/livro/livros/create/${pk}`, {
        method: "DELETE",
      });

      setLivros((prev) => prev.filter((livro) => livro.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p>Carregando livros...</p>;
  }

  return (
    <div className="container">
      <h1>Gerenciamento de Livros</h1>

      <button
        onClick={() => navigate("/livros/criar")} 
        className="btn-criar"
      >
        Criar Novo Livro
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Gênero</th>
              <th>Ano</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <tr key={livro.id}>
                <td>{livro.id}</td>
                <td title={livro.titulo}>{livro.titulo.length > 20 ? livro.titulo.slice(0, 20) + "..." : livro.titulo}</td>
                <td title={livro.autor}>{livro.autor.length > 20 ? livro.autor.slice(0, 20) + "..." : livro.autor}</td>
                <td title={livro.genero}>{livro.genero.length > 15 ? livro.genero.slice(0, 15) + "..." : livro.genero}</td>
                <td>{livro.ano_lancamento}</td>
                <td>
                  <span className={`status-indicator ${livro.disponivel ? 'disponivel' : 'indisponivel'}`}></span>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/livros/editar/${livro.id}`)}
                    className="editButton"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deleteLivro(livro.id)}
                    className="deleteButton"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Livros;
