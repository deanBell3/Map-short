import React, {Component} from 'react';
import axios from 'axios'

class Event extends Component{
    state={
        postLoaded:this.props.match.params.id,
        data:[]
    }
    loadData=()=>{
        if(this.props.match.params.id){
           // if(!this.state.postLoaded||(this.state.postLoaded !== this.props.match.params.id)){
                 axios.get(`https://api.seatgeek.com/2/events?client_id=MTQ1MjA3MzF8MTU0NTM5MzcxMC4yMg&id=${this.props.match.params.id}`)
                 .then(res=>this.setState({data:res.data.events}));
           // }
        }
    }
    componentDidMount=()=>this.loadData();
    //componentDidUpdate=()=>this.loadData();
    previousPage=()=>this.props.history.goBack();
    render(){
        let event= this.state.data.length>0? this.state.data.map(e=>{
            {/*If there is an  Image extract it*/}
            let image= e.performers.map(e=>e.images.huge);
           
            {/* Extracting lattitude and longetitude to generate stay22 map later*/}
            let lat= e.venue.location.lat , lon= e.venue.location.lon;
            return <div style={{width:'60%', margin:'1% auto', textAlign:'center'}}>
                <img src={image} alt={e.name} />

            {/*Extracting the name of performer */}
                <p><strong>Performer: </strong>{e.title}</p>
                <h2>Leaving far from The event?</h2>
                <h4>Airbnb and Hotels suggestions</h4>
                <div>

            {/* Generating the stay22 map close to the event*/}
                <iframe  title={e.title} id="stay22-widget" width="100%" height="360" style={{margin:'1% auto'}} src={`https://www.stay22.com/embed/gm?lat=${lat}&lng=${lon}&title=Madison%20Square%20Garden`} frameBorder="0"></iframe>
                </div>
            </div>
        }
        ):null
       // console.log(event);
        return <div>
            <p onClick={this.previousPage} style={{color:'blue'}}>««« Go back</p>
            {event}
        </div>
    }
}

export default Event;
