import Pallete from './Palette';
import seedColors from './seedColors';
import {generatePalette} from "./colorHelpers"

function App() {
  return (
    <div className="App">
      <Pallete {...seedColors[4]} />
    </div>
  );
}

export default App;
