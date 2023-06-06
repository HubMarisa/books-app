import './App.css';

import Hello from '../Hello/Hello';
import Counter from '../Counter/Counter';

function App() {
  const infoObj = { title: 'Developer', age: 33 };
  const nameArr = ['Alexander', 'Sergey', 'Maria'];
  
  return (
    <div className="App">  
    <h1>Application</h1>
          <Hello info={infoObj} names={nameArr} />   
          <Counter />        
    </div>
  );
}

export default App;
