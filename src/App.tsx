import { Route, Routes } from 'react-router-dom';
import './App.css';
import { BetsPage } from './pages';

export default function App() {
  return (
    <div className="App relative">
      <Routes>
        <Route path="/" element={<BetsPage />} />
      </Routes>
    </div>
  );
}
