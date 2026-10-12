import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Evolucao from './pages/Evolucao.jsx'

// Páginas das outras telas (Início, Refeições, Comunidade, Perfil) entram aqui
// quando o projeto for unificado. Por enquanto são placeholders.
function EmBreve({ titulo }) {
  return (
    <div className="page-header">
      <h1>{titulo}</h1>
      <p>Esta tela será integrada pela equipe.</p>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/evolucao" replace />} />
        <Route path="/inicio" element={<EmBreve titulo="Início" />} />
        <Route path="/refeicoes" element={<EmBreve titulo="Refeições" />} />
        <Route path="/evolucao" element={<Evolucao />} />
        <Route path="/ranking" element={<EmBreve titulo="Ranking" />} />
        <Route path="/comunidade" element={<EmBreve titulo="Comunidade" />} />
        <Route path="/perfil" element={<EmBreve titulo="Perfil" />} />
      </Route>
    </Routes>
  )
}
