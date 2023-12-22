import { Route, Routes } from 'react-router-dom';
import Library from './components/Library.jsx';
import Registration from './components/Registration.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Library/>} /> 
        <Route path='/register' element={<Registration/>} /> 
      </Routes>
    </div>
  );
}

export default App;