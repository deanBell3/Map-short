import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Search from './components/Search'
import Single_Event from './components/Events/Event'

class App extends Component{
  render(){
    return (
      <Switch>
        <Route path='/' exact component={Search} />
        <Route path='/seatgeek/:id' component={Single_Event} />
      </Switch>
    )
  }
}

export default App;