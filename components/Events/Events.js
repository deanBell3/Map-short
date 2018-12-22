import React from 'react'
import {Link} from 'react-router-dom'

const events= props=>{
    // taking venue properties from prop
    let venue= (
        <div>
        <p><strong>Venue: </strong> {props.venue.address}</p>
        <p><strong>City: </strong>{props.venue.city}</p>
        </div>
    );
    // link to redirect user towards event page
    let link= <Link to={`/seatgeek/${+props.id}`}><p>See event...</p></Link>
    
    return (
     <div style={{border:'0.2px solid black', margin:'1% auto', width:'50%', textAlign:'center'}}>
         <p><strong>Performer: </strong> {props.performer}</p>
         {venue}
         {link}
     </div>
    );
}

export default events;