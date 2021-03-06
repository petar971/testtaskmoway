import styles from '../../styles/products.module.scss'
import Product from "../../components/product"
import Filter from '../../components/icons/filter'
import { useEffect, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/dist/client/router';


export async function getServerSideProps(context) {
    const params = context.params
    const query = context.query
    const res = await fetch(process.env.apiUrl + '/api/categories/?slug=' + params.category)
    const data = await res.json();
    console.log(query);
    return {
      props: {
        query,
        data
      },
    };
  }
export default function Products({data,query}) {
    const notify = (text) => toast(text);

    const [openFilterMenu, setOpenFilterMenu] = useState(false)
    const router = useRouter()
    const [products,setProducts] = useState()
    const [currentPage,setCurrentPage] = useState(1)
   useEffect(() => {
   
        let page = query.page ? query.page : 1
        setCurrentPage(page)
       if(data.results != undefined){
            fetch(process.env.apiUrl + `/api/products/?page=${page}&categories=` + data.results[0].id)
            .then(res => res.json())
            .then(res => setProducts(res))
        }
   
   } ,[query,data])


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
        router.push({ pathname: `/products/${data.results[0].slug}` ,
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
                <h1>{data != undefined && data.results[0].name}</h1>
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
                            <div onClick={(e) => OpenFilter(e)} className={styles.Sort_name}>????????????????</div>
                            <div className={styles.Choice_button}>
                                <label>
                                    ??????a????????
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                            <div className={styles.Choice_button}>
                                <label>
                                    ??????a????????
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                            <div className={styles.Choice_button}>
                                <label>
                                    ??????a????????
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                            <div className={styles.Choice_button}>
                                <label>
                                    ??????a????????
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                        </div>
                        <div className={styles.Sort_button}>
                            <div onClick={(e) => OpenFilter(e)} className={styles.Sort_name}>????????????????</div>
                            <div className={styles.Choice_button}>
                                <label>
                                    ??????a????????
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                            <div className={styles.Choice_button}>
                                <label>
                                    ??????a????????
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                            <div className={styles.Choice_button}>
                                <label>
                                    ??????a????????
                                    <input type="checkbox"/>
                                </label>
                                
                            </div>
                            <div className={styles.Choice_button}>
                                <label>
                                    ??????a????????
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
                        previousLabel={"????????????????"}
                        nextLabel={"????????????????"}
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