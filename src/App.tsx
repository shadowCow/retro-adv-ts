import classes from './App.module.css';
import { GameView } from './ui/GameView/GameView';

function App() {
  return (
    <div className={classes.layout}>
      <GameView />
    </div>
  );
}

export default App;
