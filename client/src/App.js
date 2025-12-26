import './App.css';
 
import {Route,Routes} from 'react-router-dom'
import HomePage from './components/HomePage.jsx';
import Editor from './components/Editor.jsx';
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div className="App">
      <Toaster position='top-center'></Toaster>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/editor/:roomId' element={<Editor/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
