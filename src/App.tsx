import Main from './routes'
import Header from './Components/Header/index'
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
