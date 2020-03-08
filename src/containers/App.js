import React, { Component } from 'react';
import Particles from 'react-particles-js';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundry';


const particlesOptions = {
    "particles": {
        "number": {
          "value": 75,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#fcf01b"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 1,
            "color": "#fcf01b"
           },
           "line_linked": {
            "enable": true,
            "distance": 0,
            "color": "#ffff33",
            "opacity": 0.4,
            "width": 2
          },
        }
    }
}

class App extends Component {
    constructor() { 
        super()
        this.state = {
            robots: [],
            searchfield: '',
        }
    }

componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users => this.setState({ robots: users}));
    }
 

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
          })
    return !robots.length ? 
     <h1>Loading</h1>:
        (
            <div className='tc'>
                <Particles className='particles' params={particlesOptions}/>
                <h1 className='f1'>My Robots Search Engine</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                <ErrorBoundry>
                <CardList robots={filteredRobots} />
                </ErrorBoundry>
                </Scroll>
            </div>
        );
}
    
}

export default App;