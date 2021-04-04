// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Bookings from "./components/Bookings";
import CampsiteBook from "./components/CampsiteBook"
import CampsiteInfo from "./components/CampsiteInfo"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <CampsiteBook />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/bookings">
            <Bookings />
          </Route>
          <Route path="/parks" exact>
            <CampsiteBook />
          </Route>
          {/* <Route path="/parks/:parkId">
            <ParkInfo />
          </Route> */}
          <Route path="/parks/:parkId/campsites/:campsiteId">
            <CampsiteInfo />
          </Route>
  
        </Switch>
      )}
    </>
  );
}

export default App;
