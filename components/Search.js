import React ,{Component} from 'react';
import InputEl from '../UI/InputEl';
import Events from '../components/Events/Events'
import axios from 'axios';
import './Search.css';

class Search extends Component{
    // state for input and data from location 
    state={
        searchForm:{
            search:{
                id:1,
                elementType:'input',
                elementConfig:{
                    placeholder:'Look for events close to you by entering your postal code.',
                    type:'text',
                    required:true
                },
                value:''
            }
        },
        // data from data fetch
        data:[],
        // if fetch call is unsuccessful , to display error message to client
        err:false
    }
    // event input 
    inputChangedHandler=(event,id)=>{
        let updatedForm={
        ...this.state.searchForm,
        [id]:{...this.state.searchForm[id],
           value: event.target.value,   
        }
        }
        this.setState({searchForm:updatedForm});
    }
    // get request for the events according to location
    searchInput=event=>{
        event.preventDefault();
       let location= this.state.searchForm.search.value;
      axios(`https://api.seatgeek.com/2/events?client_id=MTQ1MjA3MzF8MTU0NTM5MzcxMC4yMg&geoip=${location}&range=25mi`)
      .then(res=> this.setState({data:res.data.events, err:false})).catch(()=>this.setState({err:true, data:[]}));
    
    }
    render(){
        
        // taking the form from the state to display an input
        let arr=[];
        for(let i in this.state.searchForm) arr.push({id:i, config:this.state.searchForm[i]});
        let element=arr.map(e=><InputEl key={e.id} elementType={e.config.elementType} elementConfig={e.config.elementConfig}
        value={e.config.value} changed={(event)=>this.inputChangedHandler(event,e.id)}/>);

        // if we have events data on our data state loop through to display data
        let events= this.state.data.length>0&& !this.state.err? this.state.data.map(e=><Events 
            key={e.id} 
            id={e.id}
            performer={e.title}
            venue={e.venue}/>):null;
       // error message with no result found
       let errorMessage= this.state.err?
       <p style={{color:'red', fontSize:'18px', textAlign:'center'}}>Events not found, try with another postal code.</p>:null;
       
        return (
           <div>
               <h1 id='Search-logo' style={{fontSize:'100px',color:'#566c73'}}><em>EVENTS.com</em></h1>
               < form onSubmit={this.searchInput} className='Search-input'>
                    {element}
                    <br/>
                    <button className='Search-button'>Find Events</button>
               </form>
               {events}
               {errorMessage}
           </div>
        );
    }
}

export default Search;