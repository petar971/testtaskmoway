
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchWithToken } from '../../../auth'
import LayoutAdmin from '../../../components/layoutAdmin'
import styles from '../../../styles/addProduct.module.scss'
import test from '../../../assets/test.jpg'
export default function Add() {
    const [categories,setCategories] = useState()
    const [selectedCat,setSelectedCat] = useState(1)
    const [selectedSecondCat,setSelectedSecondCat] = useState()
    const [product,setProduct] = useState({
        title:"",
        brand:"",
        description:"",
        price:0,
        discount:0,
        categories:"",
        images:[]

    })
  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
    .then(res => res.json())
    .then(res => setCategories(res.results))
    .catch(err => console.log(err))

    
  },[])
  const AddProduct = () => {
        
    var raw = JSON.stringify({
        "title": product.title,
        "brand": product.brand,
        "description": product.description,
        "price": product.price,
        "discount":product.discount,
        "categories": selectedSecondCat != undefined ? selectedSecondCat : selectedCat
    });
    
    var requestOptions = {
        method: 'POST',
        headers:{
            "Content-type":"application/json"
        },
        body: raw,
        redirect: 'follow'
    };
    
    fetchWithToken("http://localhost:8000/api/products/", requestOptions)
        .then(response => response.json())
        .then(result => {
            product.images.map(img => 
                {
                                        
                    var formdata = new FormData();
                    formdata.append("product", result.id);
                    formdata.append("image",img);

                    var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                    };
                    fetchWithToken("http://localhost:8000/api/product/images/", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                })
        })
        .catch(error => console.log('error', error));
  }
  const saveImage = (e) => {
    let buff = [...product.images]
    buff.push(e.target.files[0])
    setProduct({...product,images:buff})
  }
  useEffect(() => {
      console.log(selectedCat);
  },[selectedCat])
  return (
    <LayoutAdmin>
        <div className='Shell'>
            <div className={styles.AddProduct}>
                <div className={styles.Form_product}>
                    <label>
                        <p>Име на продукта</p>
                        <input onChange={e => setProduct({...product,title:e.target.value})} type="text" />
                    </label>
                    <label>
                        <p>Марка</p>
                        <input  onChange={e => setProduct({...product,brand:e.target.value})} type="text" />
                    </label>
                    <label>
                        <p>Категория</p>
                        <select onChange={(e) => setSelectedCat(e.target.value)}>
                        {   categories != undefined ? 
                        
                        categories.map(cat => 
                            <option value={cat.id}>{cat.name}</option>
                            )
                            
                             :""
                        }
                       
                       </select>
                    </label>
                    {   categories != undefined &&
                        categories.filter(cat => cat.id == selectedCat)[0].next_cat.length > 0 &&

                
                    <label>
                        <p>Подкатегория</p>
                        <select onChange={(e) => setSelectedSecondCat(e.target.value)}>
                        <option value="undefined"> </option>
                            {
                                categories != undefined &&
                                categories.filter(cat => cat.id == selectedCat)[0].next_cat.map(cat => 
                                    <option value={cat.id}>{cat.name}</option>
                    
                                    )
                                
                            }
                       </select>
                    </label>
                        }
                    <div className={styles.Product_price}>
                        <label>
                            <p>Цена</p>
                            <input onChange={e => setProduct({...product,price:e.target.value})} type="number" />
                        </label>
                        <label>
                            <p>Намаление</p>
                            <input onChange={e => setProduct({...product,discount:e.target.value})} type="number" />
                        </label>
                    </div>
                    <label>
                        <p>Описание</p>
                        <textarea onChange={e => setProduct({...product,description:e.target.value})} type="text" />
                    </label>
                    <div className={styles.AddImage}>
                        <label>
                            <p>Снимки:</p>
                            <input onChange={(e) => saveImage(e)} type="file"/>
                            <input onChange={(e) => saveImage(e)}  type="file"/>
                            <input onChange={(e) => saveImage(e)}  type="file"/>
                            <input onChange={(e) => saveImage(e)} type="file"/>
                            <input onChange={(e) => saveImage(e)} type="file"/>
                        </label>
                    </div>

                    <button onClick={() => AddProduct()}>Добави продукта</button>
                </div>
            </div>    
        </div>
    </LayoutAdmin>  
    )
    
}