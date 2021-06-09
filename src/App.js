import React,{useState} from 'react'
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'

import { generatePalette } from "./colorHelpers";
import { Route, Switch } from 'react-router-dom';
import useLocalStorageState from './hooks/useLocalStorageState'

function App() {
  
  const [palettes, AddPalette]=useLocalStorageState("palettes",seedColors);
  function FindPalette(id) {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  }
  function savePalette(Palette){
    let newPaletteList=[...palettes,Palette];
    AddPalette(newPaletteList);
  }

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (<NewPaletteForm savePalette={savePalette} {...routeProps}  palettes={palettes} />)}
        />
        <Route
          exact
          path='/'
          render={(routeProps) => (
            <PaletteList palettes={palettes} {...routeProps} />//closing for paletteList Component
          )} />
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
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={
            routeProps => (
              <SingleColorPalette
                colorId={routeProps.match.params.colorId}
                palette={generatePalette(
                  FindPalette(routeProps.match.params.paletteId)
                )}
              />
            )}
        />
      </Switch>
    </div>
  );
}

export default App;
