import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import VoyageApplication from './components/VoyageApplication';
import Missing404Page from './components/404/404';
import WeeklyCheckin from './components/WeeklyCheckin';
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/voyage/application/:id" component={VoyageApplication} />
          <Route exact path="/weekly/checkin/:id" component={WeeklyCheckin} />
          <Route path="*" exact component={Missing404Page} />
        </Switch>
      </div>
    );
  }
}

export default App;
