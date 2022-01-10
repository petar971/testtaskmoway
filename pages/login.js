import styles from '../styles/loginregister.module.scss'
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/dist/client/router';
export default function Login() {
  const router = useRouter()
  const [userData, setUserData] = useState({})
  const notify = () => toast("Успешен вход, Приятно пазаруване");
  const LoginPost = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
      userData
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(process.env.apiUrl + "/api/token/", requestOptions)
      .then(response => response.json())
      .then(result => {
        Cookies.set('access', result.access)
        Cookies.set('refresh', result.refresh)
        notify()
        setTimeout(() => {
          router.push('/')
        },[1500])

      })
      .catch(error => console.log('error', error));
      
  }
  return (
    <div className="Shell">
        <div className={styles.Login_form}>
            <h1>Вход</h1>
            <div>
                <input  onChange={(e) => setUserData({...userData,username:e.target.value})} placeholder="Имейл" type='text'/>
                <input  onChange={(e) => setUserData({...userData,password:e.target.value})} placeholder="Парола" type='password'/>
                <button onClick={LoginPost}>Влез</button>

                
                <ToastContainer
                   position="top-center"
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
        </div>
    </div>
  )
}
