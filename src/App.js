import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar/SideBar';
import MainSection from './components/MainSection/MainSection';

function App() {
  return (
    <div className="App-background">
      <SideBar/>
      <MainSection/>
    </div>
  );
}

export default App;
