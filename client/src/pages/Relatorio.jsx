import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import '../styles/Relatorio.css'

ChartJS.register(ArcElement, Tooltip, Legend);

function Relatorio() {
  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/emprestimo/relatorio/livros_mais_emprestados/")
      .then((response) => response.json())
      .then((data) => setLivros(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/emprestimo/relatorio/usuarios_com_emprestimos_pendentes/")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  const chartData = {
    labels: livros.map((livro) => livro.titulo),
    datasets: [
      {
        data: livros.map((livro) => livro.quantidade),
        backgroundColor: [
          '#A9A9F5', 
          '#B8A9C9', 
          '#F7B7B7', 
          '#FDFD96', 
          '#77DD77', 
          '#FFB347', 
          '#AEC6CF', 
          '#FFD1DC', 
          '#B39EB5', 
          '#CFCFC4'  
        ] 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} empréstimos`;  
          },
        },
      },
    },
  };

  return (
    <div className="relatorio-container">
      <h2>Livros Mais Emprestados</h2>
      <div className="chart-container">
        <Pie data={chartData} options={chartOptions} />
      </div>

      <div className="usuarios-container">
        <h2>Usuários com Empréstimos Pendentes</h2>
        <div className="table-scroll">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Empréstimos Pendentes</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.quantidade_emprestimos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Relatorio;
