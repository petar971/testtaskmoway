
import styles from '../styles/header.module.scss'
import Menu from './icons/menu'
import Cart from './icons/cart'
import Account from './icons/account'
import Search from './icons/search'
import Link from "next/link"

import Logo from '../assets/logo.jpg'
import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler';
import { useRouter } from 'next/router'
 
export default function Header() {
  const [cat,setCat] = useState([])
  const router = useRouter()
  const [openNav,setOpenNav] = useState(false)
  const [openIndex,setOpenIndex] = useState()
  const [openSearch,setOpenSearch] = useState(false)
  const sub_menu = useRef()
  const OpenSubMenu = (index) => {
    console.log(index);
    let submenu = sub_menu.current.children[0].children[index].children[1]
    if(submenu.classList.contains(styles.OpenSubMenu)){
      submenu.classList.remove(styles.OpenSubMenu)
    }
    else{
      submenu.classList.add(styles.OpenSubMenu)

    }
   
  }
  const OpenNavigation = () => {
    setOpenNav(true)
  }

  useEffect(() => {
      fetch(process.env.apiUrl  + "/api/categories/")
      .then(res => res.json())
      .then(res => setCat(res.results))
  },[])

   return (
    <div className={styles.Header_mobile}>
      <header>
        <div className={styles.Hamburger}>
          <button onClick={() => OpenNavigation()}>
            <Menu/>
          </button>
        </div>
        <div onClick={(e) => router.push("/")}  className={styles.Logo}>
          <img src={Logo}/>
        </div>
        <div className={styles.Actions_menu}>
          <button onClick={() => setOpenSearch(true)}>
            <Search/>
          </button>
          <button onClick={(e) => router.push("/cart")}>
            <Cart/>
          </button>
          <button>
            <Account/>
          </button>
        </div>
      </header>
      <OutsideClickHandler
      onOutsideClick={() => {
        setOpenSearch(false)
      }}
    >
      <div className={`${openSearch ? styles.Open_search_bar : ""} ${styles.Search_bar}`}>
        <label>
          <input placeholder="Търсене..." type="text"/>
          <button>
            <Search/>

          </button>
        </label>
    
      </div>
      </OutsideClickHandler>
      <div className={`${openNav ? styles.Opened : ""} ${styles.Nav_mobile}`}>
        <div className={styles.Nav_header}>
          <button onClick={() => setOpenNav(false)}></button>
        </div>
      
        <div ref={sub_menu} className={styles.Menu_buttons}>
          <ul>
      {
        cat.length != 0 ? 
        cat.map((category,index) => 
          <li key={category.id}>
          <button onClick={() => OpenSubMenu(index)}>{category.name}</button>
          <div className={styles.SubMenu}>
            <ul>
              {category.next_cat.length != 0 ? 
              category.next_cat.map(nxtcat => 
              <li><Link href={"/products/" + nxtcat.slug}><a>{nxtcat.name}</a></Link></li>
                
                )
              : ""}

            </ul>
          </div>
        </li>
          )
        :""

        
      }
           
          </ul>
        </div>
      </div>
    </div>
  )
}
