import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/LivrosCreate.css'; 

function LivrosCreate() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [anoLancamento, setAnoLancamento] = useState(0);
  const [alertMessage, setAlertMessage] = useState(""); 
  const [alertType, setAlertType] = useState(""); 

  const navigate = useNavigate();

  const addLivro = async () => {
    const livroData = {
      titulo,
      autor,
      genero,
      ano_lancamento: anoLancamento,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/livro/livros/create/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livroData),
      });

      const data = await response.json();
      if (response.ok) {
        setLivros((prev) => [...prev, data]);
        setAlertMessage("Livro registrado com sucesso!");
        setAlertType("success");
      } else {
        setAlertMessage("Erro ao registrar o livro.");
        setAlertType("error");
      }
    } catch (err) {
      console.log(err);
      setAlertMessage("Erro ao conectar com o servidor.");
      setAlertType("error");
    }
  };

  const cancelarAdd = () => {
    navigate("/"); 
  };

  return (
    <div className="form-container">
      <h1>Criar Livros</h1>
      <div className="input-grid">
        <input
          type="text"
          placeholder="Título..."
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor..."
          onChange={(e) => setAutor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gênero..."
          onChange={(e) => setGenero(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ano de Lançamento..."
          onChange={(e) => setAnoLancamento(e.target.value)}
        />
      </div>
      <button className="btn-registrar" onClick={addLivro}>Registrar Livro</button>
      <button className="btn-cancel" onClick={cancelarAdd}>Cancelar</button>

      {alertMessage && (
        <div className={`alert ${alertType}`}>
          {alertMessage}
        </div>
      )}
    </div>
  );
}

export default LivrosCreate;
