import React from "react"
import './styles/App.css'
import NavBar from './components/NavBar'
import NoMatch from "./components/externalpages/NoMatch"
import { Switch, Route } from 'react-router-dom'
import routes from "./routes"

const App = () => {
  return (
    <React.Fragment>
      <NavBar  />
      <Switch>
        {routes.map(({ path, exact, component: C, ...rest }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) => (
              <C
                {...props}
                {...rest}
              />
            )}
          />
        ))}
        <Route render={(props) => <NoMatch {...props} />} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
