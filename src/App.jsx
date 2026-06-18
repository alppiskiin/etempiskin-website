import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Privacy from './pages/Privacy.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gizlilik" element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
