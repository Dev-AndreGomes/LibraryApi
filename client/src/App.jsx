import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Livro from "./pages/Livros";
import LivrosCreate from "./pages/LivrosCreate";
import LivrosEdit from "./pages/LivrosEdit";
import Pessoa from "./pages/Pessoas";
import PessoasCreate from "./pages/PessoasCreate";
import PessoasEdit from "./pages/PessoasEdit";
import Emprestimos from "./pages/Emprestimos";
import Relatorios from "./pages/Relatorio";
import Sidebar from "./components/Sidebar";
import Devolucoes from "./pages/Devolucoes";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", height: "690px"}}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px", background: "#394251", borderRadius: "16px", marginLeft: "10px"}}>
          <Routes>
            <Route path="/" element={<Livro />} />
            <Route path="/livros/criar" element={<LivrosCreate />} />
            <Route path="/livros/editar/:id" element={<LivrosEdit />} />
            <Route path="/pessoas" element={<Pessoa />} />
            <Route path="/pessoas/criar" element={<PessoasCreate />} />
            <Route path="/pessoas/editar/:id" element={<PessoasEdit />} />
            <Route path="/emprestimos" element={<Emprestimos />} />
            <Route path="/devolucoes" element={<Devolucoes />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="*" element={<h1>Página não encontrada</h1>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
