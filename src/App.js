import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList'
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from 'react-router-dom';


function App() {

  function FindPalette(id) {
    return seedColors.find(function (palette) {
      return palette.id === id;
    });
  }
  return (
    <div>
      <Switch>
        <Route
          exact
          path='/'
          render={ (routeProps) => (
          <PaletteList palettes={seedColors} {...routeProps} />//closing for paletteList Component
           ) } />
        <Route
          exact
          path='/palette/:id'
          render={
            routeProps => (
              <Palette
                palette={generatePalette(
                  FindPalette(routeProps.match.params.id)
                )}
              />
            )}
        />
        <Route exact path="/palette/:paletteId/:colorId" />
      </Switch>
    </div>
  );
}

export default App;
