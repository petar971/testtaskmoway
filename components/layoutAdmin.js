import React, { useEffect } from 'react';
import HeaderAdmin from './headerAdmin'
import Footer from './footer'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { fetchWithToken } from '../auth';
const LayoutAdmin =({children}) =>{
    const [admin,setAdmin]  = useState(false)
    const router = useRouter()

    useEffect(() => {
        fetchWithToken(process.env.apiUrl + '/api/users/admin')
        .then(res => res.json())
        .then(res => setAdmin(res))
    
    },[])

    if(!admin){
        return (
            <div>Try Next time</div>
        )
    }
    return(
        <>
        <HeaderAdmin/>
        <main>{children}</main>
        </>
    )
}

export default LayoutAdmin;