
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationContainer } from './components/NotificationContainer';
import { GeneroList } from './pages/generos/GeneroList';
import { GeneroForm } from './pages/generos/GeneroForm';
import { AutorList } from './pages/autores/AutorList';
import { AutorForm } from './pages/autores/AutorForm';
import { LivroList } from './pages/livros/LivroList';
import { LivroForm } from './pages/livros/LivroForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="navbar-brand">
              <h1>📚 Biblioteca Digital</h1>
            </div>
            <div className="navbar-nav">
              <a href="/generos" className="nav-link">Gêneros</a>
              <a href="/autores" className="nav-link">Autores</a>
              <a href="/livros" className="nav-link">Livros</a>
            </div>
          </nav>
        </header>

        <main className="App-main">
          <Routes>
            {/* Redirecionar raiz para livros */}
            <Route path="/" element={<Navigate to="/livros" replace />} />
            
            {/* Rotas de Gêneros */}
            <Route path="/generos" element={<GeneroList />} />
            <Route path="/generos/novo" element={<GeneroForm />} />
            <Route path="/generos/editar/:id" element={<GeneroForm />} />
            
            {/* Rotas de Autores */}
            <Route path="/autores" element={<AutorList />} />
            <Route path="/autores/novo" element={<AutorForm />} />
            <Route path="/autores/editar/:id" element={<AutorForm />} />
            
            {/* Rotas de Livros */}
            <Route path="/livros" element={<LivroList />} />
            <Route path="/livros/novo" element={<LivroForm />} />
            <Route path="/livros/editar/:id" element={<LivroForm />} />
          </Routes>
        </main>

        <NotificationContainer />
      </div>
    </Router>
  );
}

export default App;
