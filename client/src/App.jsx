import React, { useState, useEffect } from 'react';
import Form from './Components/Form'
import './App.css';
import axios from 'axios';
import profile from './assets/template.jpg'

function App() {
    const [state, setState] = useState({})
    const [isLoggedIn, setLogin] = useState(false)
    const [imgLink, setImage] = useState(profile)
    useEffect(() => {
        axios.get('http://localhost:8000/api/data', { withCredentials: true })
        .then(response => setState(response.data));

        console.log(state)
        if(Object.keys(state).length === 0){
            setLogin(false)
        }
        else{
            setLogin(true)
            setImage(state._json.picture)
        }
    }, [state])
    return (
        <>
            <div>
                <Form />
                {state.displayName}<br/>
                {state.id}<br/>
                <img style={{height: "100px", width:"100px"}} src={imgLink}  alt="" />
            </div>        
        </>
    )

}

export default App;
