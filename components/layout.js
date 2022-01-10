import React from 'react';
import Header from './header'
import Footer from './footer'
import { useRouter } from 'next/router';

const Layout =({children}) =>{

    return(
        <>
        <Header/>
        <main>{children}</main>
        <Footer/>
        </>
    )
}

export default Layout;