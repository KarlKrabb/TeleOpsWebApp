import React, { useEffect, useState } from "react"
import './styles/App.css'
import NavBar from './components/NavBar'
import NoMatch from "./components/externalpages/NoMatch"
import { Switch, Route } from 'react-router-dom'
import routes from "./routes"

const App = (props) => {

  const [loggedIn, setLoggedIn] = useState((sessionStorage.getItem("userID")) ? true : false)

  useEffect(() => {
    setLoggedIn((sessionStorage.getItem("UserID")) ? true : false)
  }, [])  

  return (
    <React.Fragment>
      <NavBar 
        loggedIn={loggedIn} 
        setLoggedIn={setLoggedIn}
      />
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
                setLoggedIn={setLoggedIn}
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
