import styles from '../styles/products.module.scss'
import Product from "../components/product"
import Filter from '../components/icons/filter'
import { useEffect, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import ReactPaginate from "react-paginate";

import { useRouter } from 'next/dist/client/router';
import { ToastContainer, toast } from 'react-toastify';


export async function getServerSideProps(context) {
    console.log(context);
    const query = context.query
    return {
      props: {
        query
      },
    };
  }
export default function Products({query}) {
    const [openFilterMenu, setOpenFilterMenu] = useState(false)
    const router = useRouter()
    const [products,setProducts] = useState()
    const [currentPage,setCurrentPage] = useState(1)
    const notify = (text) => toast(text);
   useEffect(() => {
       let page = query.page ? query.page : 1
       setCurrentPage(page)
       fetch(process.env.apiUrl + "/api/products/?page=" + page)
       .then(res => res.json())
       .then(res => setProducts(res))
   } ,[query])


   const OpenFilter = (e) => {
       if(e.target.parentElement.classList.contains(styles.Opened)){
        e.target.parentElement.classList.remove(styles.Opened)
       }
       else {
        e.target.parentElement.classList.add(styles.Opened)
       }

   }

    const handlePageClick = (select) => {
        let page;

        page = select.selected + 1;
        setCurrentPage(page)
        router.push({ pathname: '/products',
        query: { page: page }})
//         if (true) {
//         fetch(
//             `http://localhost:8000/api/products/?page=${page}`
//         )
//             .then((res) => res.json())
//             .then((res) => setProducts(res))
//             .then(console.log(products));
//             window.scrollTo(0,0)
//         }
    }
    return (
        <div className="Shell">
            <div className={styles.Products_title}>
                <h1>Всички продукти</h1>
            </div>

            <div className={styles.Products_wrap}>
            <OutsideClickHandler
      onOutsideClick={() => {
        setOpenFilterMenu(false)
      }}
    >
                <div className={`${openFilterMenu ? styles.OpenFilter : ""} ${styles.Product_cat}`}>
                    <div className={styles.Close_button}>
                        <button onClick={(e) => setOpenFilterMenu(false)}></button>
                    </div>

                    <div  className={styles.Sort_menu}>
                        <div className={styles.Sort_button}>
                            <div onClick={(e) => OpenFilter(e)} className={styles.Sort_name}>Сортирай</div>
                            <div className={styles.Choice_button}>
                                <label>
                                    Намaлени
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                            <div className={styles.Choice_button}>
                                <label>
                                    Намaлени
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                            <div className={styles.Choice_button}>
                                <label>
                                    Намaлени
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                            <div className={styles.Choice_button}>
                                <label>
                                    Намaлени
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                        </div>
                        <div className={styles.Sort_button}>
                            <div onClick={(e) => OpenFilter(e)} className={styles.Sort_name}>Сортирай</div>
                            <div className={styles.Choice_button}>
                                <label>
                                    Намaлени
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                            <div className={styles.Choice_button}>
                                <label>
                                    Намaлени
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                            <div className={styles.Choice_button}>
                                <label>
                                    Намaлени
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                            <div className={styles.Choice_button}>
                                <label>
                                    Намaлени
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                </OutsideClickHandler>
                <div className={styles.Products}>
                    {
                        products != undefined ? 
                        products.results.map(pr => 
                            <div className={styles.Product_case}>
                        <Product notify={notify} data = {pr}/>
                    </div>
                            )
                        :""
                    }
                   
                    
                </div>
                <ReactPaginate
                        forcePage={Number(currentPage - 1)}
                        className='Pagination'
                        previousLabel={"Предишна"}
                        nextLabel={"Следваща"}
                        breakLabel={"..."}
                        pageCount={products != undefined ? Math.ceil(products.count / 12) : 1}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
      />
            </div>
            <div className={styles.Filter_mobile_button}><button onClick={() => setOpenFilterMenu(true)}><Filter/></button></div>
            <ToastContainer
                   position="top-right"
                   autoClose={2000}
                   hideProgressBar={false}
                   newestOnTop={false}
                   closeOnClick
                   rtl={false}
                   pauseOnFocusLoss
                   draggable
                   pauseOnHover
                    />


        </div>
    )
}