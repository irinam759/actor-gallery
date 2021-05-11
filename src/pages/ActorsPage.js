import React from 'react';
import { Card } from 'react-bootstrap';
import './ActorsPage.css';




class ActorsPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFilter: {},
            sortedBy: ''
        }
        
    }
    filterByName = (event) => {
        this.setState (
            {
                isFilter: event.target.value
            }
            );
            
        }
        
    isFilter = (actor) => {
        const actorFullName = actor.fName.concat(' ',actor.lName);
        const regex = new RegExp(this.state.isFilter,"i");
        return (regex.test(actorFullName));
        
    }
        
    sortValue = (event) => {
       
        this.setState (
            {
                sortedBy: event.target.value
            }
            );
            console.log(this.state.sortedBy)
        }
            
    sortFunc = (a,b) => {
        const sortVal = this.state.sortedBy;
        
        if (sortVal === 'age'){
            return a.age - b.age;
        } 
        
        
        if (sortVal === 'lName')
        
        {   
            let aa = a.lName.toLowerCase() + ',' + a.fName.toLowerCase(); 
            let bb = b.lName.toLowerCase() + ',' + b.fName.toLowerCase(); 
            return this.sortFullName(aa,bb);
        }
        if (sortVal === 'fName'){
            let aa = a.fName.toLowerCase() + ',' + a.lName.toLowerCase(); 
            let bb = b.fName.toLowerCase() + ',' + b.lName.toLowerCase(); 
            return this.sortFullName(aa,bb);
        }
        
    }
    sortFullName = (fullname1,fullname2) => {
        if(fullname1 < fullname2) {return -1;}
        if(fullname1 > fullname2) {return 1;}
        return 0;
    }
            
        actorsGallery = (actor) => {
            return (
                <div key={actor.id} className="col-sm-6 col-md-4 col-lg-3 ">
                <Card className="m-2">
                 {/* <a href="#" onClick={this.func}> */}
                <img className="card-img-top img-fluid" src={actor.imgUrl} alt="" />
                {/* </a> */}
            <div className="card-body p-3">
            <h4 className="card-title"><a href={actor.imdbLink} target="_blank" rel="noreferrer">{actor.fName} {actor.lName}</a></h4>
            <p className="card-text"><span className="font-weight-bold">Birth date:</span> {actor.bday}</p>
            </div>
            <div className="card-footer text-muted text-center p-1">
            Age: {actor.age}
            </div>
            </Card>
            </div>
            )
            
        }
        render(){
            let checkActor = this.props.actorsData;
            let actorsCards =  checkActor
            .filter(this.isFilter)
            .sort(this.sortFunc)
            .map(this.actorsGallery);
            
            return(
                <div className='p-actors-page'>
                               
                <div className="row"> 
                <div className="col-sm-6 col-md-4 col-lg-3 ">
                <div className="form-group">
                <label htmlFor="search-name">Find name:</label>
                <input type="text"
                onChange={this.filterByName}
                className="form-control"
                name="search-name" 
                id="search-name" 
                placeholder="type here.." />
                </div>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3 ">
                <label htmlFor="sort-opt">Sort:</label>
                <select name="sort-opt" onChange={this.sortValue} id="sort-opt" className="form-control">
                <option value="">Sort by:</option>
                <option value="fName">First name</option>
                <option value="lName">Last name</option>
                <option value="age">Age</option>
                </select>
                </div>
                </div>
                
                <div className="row"> 
                {actorsCards}
                </div>
                </div>
                
                
                
                )
            }
        }
        export default ActorsPage;      