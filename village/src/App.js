import React, {
  Component
} from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from 'axios';
import { Route, Link} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount(){
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        console.log(res)
        this.setState({
          smurfs: res.data
        })
      })
      .catch(err => console.log(err));
  }

  createHandler = data => {
    console.log(data)
    axios
      .post('http://localhost:3333/smurfs',data)
      .then(res => {
        this.setState({
          smurfs: res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const NewButton = () => {
      return (
        <Link to='/new'>Add</Link>
      );
    }

    const BackButton = () => {
      return (
        <Link to='/'>Back</Link>
      );
    }

    

    return (
    <div className = "App" >
      <Route exact path='/new' component={BackButton}  />
      <Route exact path='/new' render={props => <SmurfForm {...props} createHandler={this.createHandler} />} />
      <Route exact path='/' component={NewButton}  />
      <Route path="/" render={props => <Smurfs {...props} smurfs={this.state.smurfs}/> }  />
      </div>
    );
  }
}

export default App;