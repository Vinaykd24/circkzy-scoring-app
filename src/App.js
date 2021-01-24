import './App.css';
import './firebase/config';
import { Route, Switch, BrowserRouter, Router } from 'react-router-dom';

import HomePage from './components/homepage.component';
import Signup from './pages/Signup.component';
import ScorePage from './components/score/score.component';
import AddPlayerPage from './components/add-player/addPlayer.component';
import MatchDetails from './components/match-details/match-details.component';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/matchDetails" component={MatchDetails} />
        <Route path="/score" component={ScorePage} />
        <Route path="/addPlayers" component={AddPlayerPage} />
        {/* <Route
          path="/addPlayers"
          component={() => <AddPlayerPage isHomeTeam="true" />}
        /> */}
        <Route
          path="/score"
          component={() => <ScorePage awayTeam="Infosys" homeTeam="TCS" />}
        />
      </Switch>
      {/* <HomePage /> */}
    </BrowserRouter>
  );
}

export default App;
