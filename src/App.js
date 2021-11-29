import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
