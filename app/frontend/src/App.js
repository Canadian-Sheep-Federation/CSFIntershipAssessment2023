import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from './pages/HomePage';
import { SurveyPage } from './pages/SurveyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/survey" element={<SurveyPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
