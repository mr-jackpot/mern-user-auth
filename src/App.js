import logo from './logo.svg';
import './App.css';
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enter your username and password.
        </p>
        <Login />
      </header>
    </div>
  );
}

export default App;
