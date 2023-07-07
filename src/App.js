import "./App.css";
import { Redirect, Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import StudentCard from "./components/studentCard";
import Moments from "./components/moments";
import About from "./components/about";
import CardEditor from "./components/cardEditor";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/moments" component={Moments} />
        <Route path="/about" component={About} />
        <Route path="/editor" component={CardEditor} />
        <Route path="/" exact component={StudentCard} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
