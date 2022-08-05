import React from 'react'
import { useSelector } from 'react-redux'

export default function GuestComponent({children}) {
    const auth = useSelector(state => state.auth)
   
    if(! auth.isAuthenticated){            
        return (
            <>
            {children}
            </>
        )
    } 
    else{
        return(
            <>

            </>
        )
    }
}
