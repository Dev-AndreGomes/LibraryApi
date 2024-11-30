import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import '../styles/Pessoas.css';  

const Pessoas = () => {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/pessoa/pessoas/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPessoas(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
        setLoading(false);
      }
    };
    fetchPessoas();
  }, []);

  const deletePessoa = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/pessoa/pessoas/create/${id}`, {
        method: "DELETE",
      });

      setPessoas((prev) => prev.filter((pessoa) => pessoa.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p>Carregando pessoas...</p>;
  }

  return (
    <div className="container">
      <h1>Gerenciamento de Pessoas</h1>

      
      <button
        onClick={() => navigate("/pessoas/criar")} 
        className="btn-criar"
      >
        Criar Nova Pessoa
      </button>

     
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.map((pessoa) => (
              <tr key={pessoa.id}>
                <td>{pessoa.id}</td>
                <td title={pessoa.nome}>
                  {pessoa.nome.length > 20 ? pessoa.nome.slice(0, 20) + "..." : pessoa.nome}
                </td>
                <td title={pessoa.endereco}>
                  {pessoa.endereco.length > 20 ? pessoa.endereco.slice(0, 20) + "..." : pessoa.endereco}
                </td>
                <td title={pessoa.email}>
                  {pessoa.email.length > 20 ? pessoa.email.slice(0, 20) + "..." : pessoa.email}
                </td>
                <td>{pessoa.telefone}</td>
                <td>
                <button
                  onClick={() => navigate(`/pessoas/editar/${pessoa.id}`)}
                  className="editButton"
                >
                  Editar
                </button>

                  <button
                    onClick={() => deletePessoa(pessoa.id)} 
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

export default Pessoas;
