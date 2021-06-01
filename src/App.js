import Palette from './Palette';
import seedColors from './seedColors';
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
        <Route exact path='/' />
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
      </Switch>
    </div>
  );
}

export default App;
