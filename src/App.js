
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import ActorsPage from './pages/ActorsPage';
import Movies from './pages/MoviesPage';

import ActorCard from './data-models/ActorCard';
import SingleMovie from './pages/SingleMovie';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      actorsData: [],
    }
  }

componentDidMount = () => {
   //  import Json actors
  fetch('/actors-data.json')
  .then ((stream) => {return stream.json()})
  .then (res =>{
    //console.log(res);
     let actors = res.map( actor => (new ActorCard(actor.fName,actor.lName,actor.bday,actor.imgUrl,actor.imdbLink)));
     //console.log(actors);
     this.setState({actorsData: actors});
  })
  .catch ((err) => {
    alert('the ajax has failed')
    //console.log(err)
  })
 
  
}
  
 render (){
 
  return (
    <HashRouter>
    
      <Navbar bg="light" expand="lg">
      <Navbar.Brand  href="/#/actors">Movie App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/#/actors">Actors</Nav.Link>
              <Nav.Link href="/#/movies">Movies</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>   
      <Route exact path='/actors'>
        <ActorsPage actorsData={this.state.actorsData}/>
      </Route>
      <Route exact path='/movies'>
        <Movies />
      </Route>
      <Route exact path='/movies/:movieId'>
       
        <SingleMovie></SingleMovie>
      </Route>
     
      </Container>
    
    
    </HashRouter>
  );
  }
}

export default App;
