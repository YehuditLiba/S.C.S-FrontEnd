import { useEffect } from "react";
import { useState } from "react";

function Hi(){
   
    const [users, setUsers] = useState([]);

    useEffect(() => {
       fetch('http://localhost:5073/api/User', {method: 'GET'})
          .then((res) => res.json())
          .then((data) => {
             console.log(data);
             setUsers(data);
          })
          
    }, []);

    return (
<>
{users.map((item)=>
<h1>{item.name}{ item.email}{ item.password}</h1>
   )}
</>
    )
}export default Hi;