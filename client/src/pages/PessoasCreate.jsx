import { useState } from 'react';
import '../styles/PessoasCreate.css'; 
import { useNavigate } from 'react-router-dom';

function PessoasCreate() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [limiteEmprestimos, setLimiteEmprestimos] = useState(3);
  const [alertMessage, setAlertMessage] = useState(""); 
  const [alertType, setAlertType] = useState(""); 
  const navigate = useNavigate();

  const addPessoa = async () => {
    const pessoaData = {
      nome,
      endereco,
      email,
      telefone,
      limite_emprestimos: limiteEmprestimos,
    };
    
    try {
      const response = await fetch("http://127.0.0.1:8000/pessoa/pessoas/create/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pessoaData),
      });

      const data = await response.json();
      if (response.ok) {
        setAlertMessage("Pessoa registrada com sucesso!");
        setAlertType("success");
        navigate("/pessoas"); 
      } else {
        setAlertMessage("Erro ao registrar a pessoa.");
        setAlertType("error");
      }
    } catch (err) {
      console.log(err);
      setAlertMessage("Erro ao conectar com o servidor.");
      setAlertType("error");
    }
  };

  const cancelarEdicao = () => {
    navigate("/pessoas"); 
  };

  return (
    <div className="form-container">
      <h1>Criar Pessoa</h1>
      <div className="input-grid">
        <input
          type="text"
          placeholder="Nome..."
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço..."
          onChange={(e) => setEndereco(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Telefone..."
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <button className="btn-registrar" onClick={addPessoa}>Registrar Pessoa</button>
      <button className="btn-cancel" onClick={cancelarEdicao}>Cancelar</button>

      {alertMessage && (
        <div className={`alert ${alertType}`}>
          {alertMessage}
        </div>
      )}
    </div>
  );
}

export default PessoasCreate;
