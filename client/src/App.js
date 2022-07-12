import './App.css';
import { Switch, Route, Redirect } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Navbar from "./components/shared/Navbar/Navbar"
import Authenticate from "./Pages/Authenticate/Authenticate"
import Activate from './Pages/Activate/Activate';
import Rooms from './Pages/Rooms/Rooms';
import {useSelector} from "react-redux"
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';
import Room from './Pages/Room/Room';


// TODO 1: Generate random username
// TODO 2: Prevent user to choose username that is already exists
// TODO 3: Code activation loader component
// TODO 4: reloging user after each refresh
// TODO 5: use refresh token
// TODO 6: allow user to upload jpg,gif images not just png

function App() {
  // call refresh endpoint
  const {loading} = useLoadingWithRefresh()

  return (
    loading ? (
        <Loader message="Your stuff is being Loading, Please wait ..." />
    )
    : (
    <Switch>
      <>
        <Navbar />
        <GuestRoute path="/" exact>
          <Home />
        </GuestRoute>
        <GuestRoute path="/authenticate" exact>
          <Authenticate />
        </GuestRoute>
        <SemiProtectedRoutes path="/activate" exact>
          <Activate />
        </SemiProtectedRoutes>
        <ProtectedRoutes path="/rooms" exact>
          <Rooms />
        </ProtectedRoutes>
        <ProtectedRoutes path="/room/:id" exact>
          <Room />
        </ProtectedRoutes>
      </>
    </Switch>
    )
  );
}


function GuestRoute({ children, ...rest }) {
  const {isAuth} = useSelector((state) => state.auth)
  // const isAuth = true;
  return (
    <Route {...rest} render={({ location }) => {
      return isAuth ?
        (
          <Redirect to={{
            pathname: "/rooms",
            state: {from: location}
          }} />
        )
        :
        (
          children
        )
    }} />
  )
}
function SemiProtectedRoutes({ children, ...rest }) {
  const {user,isAuth} = useSelector((state) => state.auth)

  return (
    <Route {...rest} render={({ location }) => {

      return !isAuth ?
        (
          <Redirect to={{
            pathname: "/",
            state: {from: location}
          }} />
        )
        :
        (
          isAuth && !user.activated ? (
            children
          )
          :
          <Redirect to={{
            pathname: "/rooms",
            state: {from: location}
          }} />
        )
    }} />
  )
}
function ProtectedRoutes({ children, ...rest }) {
  const {user,isAuth} = useSelector((state) => state.auth)
  // const isAuth = true;
  // const user = {activated: true};

  return (
    <Route {...rest} render={({ location }) => {
      return !isAuth ?
        (
          <Redirect to={{
            pathname: "/",
            state: {from: location}
          }} />
        )
        :
        (
          isAuth && !user.activated ? (
            <Redirect to={{
              pathname: "/activate",
              state: {from: location}
            }} />
          )
          :
          (
            children
          )
        )
    }} />
  )
}

export default App;
