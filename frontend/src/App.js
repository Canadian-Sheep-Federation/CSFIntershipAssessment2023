import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';

// Component imports 
import Layout from './pages/Layout';
import Home from './pages/Home';
import CreateExcuse from './pages/CreateExcuse';
import ViewExcuses from './pages/ViewExcuses';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create-excuse" element={<CreateExcuse />}/>
          <Route path="/view-excuses" element={<ViewExcuses />}/>
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
