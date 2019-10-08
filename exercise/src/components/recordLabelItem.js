import React from 'react';
/*Stateless component that display the record label with bands and festivals attended */
const RecordLabelItem = (prop) => {
   return <div className="container">
       <div className="pl-5"><strong>{prop.recordobj.name ? prop.recordobj.name : <i>Unknown Label</i>}</strong>
       {prop.recordobj.bands.map(b => {
          return (
              <div className="pl-5">{b.name}
                 <div className="pl-5">{b.festivals.map(f => <div>{f ? f : <i>No Festivals Attended</i>}</div>)}</div>
              </div>)
       })}
       </div>
   </div>
}

export default RecordLabelItem;