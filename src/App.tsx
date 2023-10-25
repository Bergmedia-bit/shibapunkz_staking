import Main from './routes'
import Header from './Components/Header/index'
import { Nav } from './Components/Nav/index'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (

    <div>
      <Header />
      <div className='page'>

        <div className='main-page'>
          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;
