import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Privacy from './pages/Privacy.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gizlilik" element={<Privacy />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
