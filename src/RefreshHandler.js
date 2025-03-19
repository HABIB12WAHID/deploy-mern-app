import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup'){
                navigate('/home', {replace: false});
            }
        }
    }, [location, navigate, setIsAuthenticated])
  return (
    <div style={{marginLeft: "80px"}}>
        <h1>This is Demo test website</h1>
    </div>
  )
}

export default RefreshHandler
