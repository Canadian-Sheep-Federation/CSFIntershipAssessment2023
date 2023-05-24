import './App.css';
import MainForm from './MainForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div></div>
        <div>
          <h1>Sugar tracker</h1>
          <h6>The American Heart Association recommends children and teens consume less than 25 grams, or 6 teaspoons, of added sugar per day.</h6>
          <h4>Track your children's sugar intake</h4>
          <MainForm />
        </div>
      </header>
    </div>
  );
}

export default App;
