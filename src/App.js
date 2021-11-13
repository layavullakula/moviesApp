import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import Popular from './components/Popular'
import Home from './components/Home'
import Account from './components/Account'
import Movies from './components/Movies'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/movie/:movieId" component={Movies} />
      <ProtectedRoute path="/bad-path" component={NotFound} />
      <Redirect to="/bad-path" />
    </Switch>
  </BrowserRouter>
)

export default App
