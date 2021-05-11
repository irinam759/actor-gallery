import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { withRouter } from 'react-router';

class SingleMovie extends React.Component{
    constructor(props){
        super(props);
       this.movieId = this.props.match.params.movieId;
      
        this.state = {
            movie: {}
        }
    }

    
    componentDidMount = () =>{
  fetch(`https://api.themoviedb.org/3/movie/${this.movieId}?api_key=33218e90fc0df5359112eb4597322c1c`)
        .then( (stream) => stream.json())
        .then((res) => {  
              
            const tempObj = {
                title: res.title,
                image: res.poster_path,
                runtime: res.runtime

            }
            fetch(`https://api.themoviedb.org/3/movie/${this.movieId}/credits?api_key=33218e90fc0df5359112eb4597322c1c`)
            .then( (stream) => stream.json())
        .then((res) => {  
           // console.log(res);
            tempObj.stars = [res.cast[0].name,res.cast[1].name,res.cast[2].name].join(', ');
        tempObj.director = res.crew.find((director) => director.known_for_department === "Directing").name ;
            
            this.setState({
                movie:tempObj
            })
            })
            
           
            

    })
   
}

        render(){
           
          
            return(
                <div >
                     
                    <Row>
                        <Col lg={4} md={6} sm={12}>
                        <Card className="mt-2">
                            <Card.Header> 
                                <Card.Title>{this.state.movie.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                            Runtime: {this.state.movie.runtime} min
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">
                            Director: {this.state.movie.director} 
                                </Card.Subtitle>
                            </Card.Header>
                            

                            <Card.Body>
                            <Card.Img src={`https://image.tmdb.org/t/p/w500${this.state.movie.image}`} ></Card.Img>
                            </Card.Body>
                            <Card.Footer>Main actors: 
                                <Card.Text >
                        {this.state.movie.stars} 
                      </Card.Text>
                      </Card.Footer>
                           
                           
                        
                      
                        </Card>
                     
                      </Col>
                    </Row>
               
                </div>
                )
           // })
        }
    }
export default withRouter(SingleMovie);      