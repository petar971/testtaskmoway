import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import styles from '../styles/loginregister.module.scss'
export default function Register() {
  const [userData, setUserData] = useState({})
  const router = useRouter()
  const Register = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "user": 
       userData
      
    });
    console.log(typeof raw);
    console.log(raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(process.env.apiUrl + "/api/customers/", requestOptions)
      .then(response => response.json())
      .then(result => router.push("/login"))
      .catch(error => setError("Потребителското име вече е заето"));
    }

  return (
    <div className="Shell">
        <div className={`${styles.Login_form} ${styles.Register_form}`}>
            <h1>Регистрация</h1>
            <div>
                <input onChange={(e) => setUserData({...userData,first_name:e.target.value})} placeholder="Име" type='text'/>
                <input onChange={(e) => setUserData({...userData,last_name:e.target.value})} placeholder="Фамилия" type='text'/>

                <input  onChange={(e) => setUserData({...userData,username:e.target.value})} placeholder="Имейл" type='text'/>
                <input  onChange={(e) => setUserData({...userData,password:e.target.value})} placeholder="Парола" type='password'/>
                <button onClick={Register}>Регистрация</button>
            </div>
        </div>
    </div>
  )
}
