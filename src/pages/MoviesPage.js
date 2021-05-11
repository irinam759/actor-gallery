import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LiveSearchBox from '../components/LiveSearchBox';


class Movies extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newString: '',
            chosenMovie: [],
            results: []
        }
       
    }
    searchTextChanged =(newText) => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=33218e90fc0df5359112eb4597322c1c&query=${newText}`)
            .then( (stream) => stream.json())
            .then((res) => {  
                              
                if(res && res.results){    
                    const newResults = res.results.map((movie,index) => {
                        
                            return  {id:movie.id, title: movie.title, image:movie.poster_path , overview:movie.overview, key:movie.index};
                        })
                        this.setState({
                            results: newResults,
                        })
                    }   
                    
                  })
                  
                 
               
           
           
           
      
        this.setState ({
            newString: newText
         
        })
    }

    addMovie = (index) => {
        const currentMovie = this.state.results[index];
       
      
        const movies = this.state.chosenMovie.concat(currentMovie);
        this.setState({
            chosenMovie: movies,
            results:[]
        })
        
    }
        render(){
           const movieCards = this.state.chosenMovie.map((movie,id)=> {
                          return <Col lg={3} md={6} sm={12}>
                   <Card key={id}><h1>{movie.title}</h1>
                   
                   <Link to={`/movies/${movie.id}`}>
                   <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.image}`} />
                  
                  </Link>  
                      
                     <div> {movie.overview}</div>
    
                   </Card>
                   </Col> 
           })
                return(
                <div className='p-movies-page'>

                <LiveSearchBox 
                    results={this.state.results}
                    placeholder='Choose a Movie'
                    onSearchChanged={this.searchTextChanged}
                    onResultSelected={this.addMovie}
                />
                
                    <Row> {movieCards}</Row>
                   
                </div>
                )
            }
        }
export default Movies;      