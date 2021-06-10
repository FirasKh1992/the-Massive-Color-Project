import React from 'react'
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'

import { generatePalette } from "./colorHelpers";
import { Route, Switch } from 'react-router-dom';
import useLocalStorageState from './hooks/useLocalStorageState'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './App.css'
function App() {

  const [palettes, setPalette] = useLocalStorageState("palettes", seedColors);
  function FindPalette(id) {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  }
  function savePalette(Palette) {
    let newPaletteList = [...palettes, Palette];
    setPalette(newPaletteList);
  }

  function deletePalette(id) {
    const updatedPalettes = palettes.filter((palette) => palette.id !== id);
    setPalette(updatedPalettes);
  }

  return (
    <Route render={({location}) => (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='fade' timeout={500}>
          <Switch location={location}>
            <Route
              exact
              path="/palette/new"
              render={(routeProps) => (
                <div className="page">
                <NewPaletteForm 
                savePalette={savePalette} 
                {...routeProps} 
                palettes={palettes} 
                />
                </div>
                
                )}
            />
            <Route
              exact
              path='/'
              render={(routeProps) => (
                <div className="page">
                <PaletteList palettes={palettes} {...routeProps} deletePalette={deletePalette} />//closing for paletteList Component
                </div>
              )} />
            <Route
              exact
              path='/palette/:id'
              render={
                routeProps => (
                  <div className="page">
                  <Palette
                    palette={generatePalette(
                      FindPalette(routeProps.match.params.id)
                    )}
                  />
                  </div>
                )}
            />
            <Route
              exact
              path="/palette/:paletteId/:colorId"
              render={
                routeProps => (
                  <div className="page">
                  <SingleColorPalette
                    colorId={routeProps.match.params.colorId}
                    palette={generatePalette(
                      FindPalette(routeProps.match.params.paletteId)
                    )}
                  />
                  </div>
                )}
            />
          </Switch>
        </CSSTransition>
      </TransitionGroup>

    )} />

  );
}

export default App;
