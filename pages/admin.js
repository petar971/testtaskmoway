
import { useRouter } from 'next/router'
import { useState } from 'react'
import { fetchWithToken } from '../auth'
import CartBlock from '../blocks/cartBlock'

export default function Admin() {
const [admin,setAdmin]  = useState(false)
const router = useRouter()
fetchWithToken(process.env.apiUrl + '/api/users/admin')
.then(res => res.json())
.then(res => setAdmin(res))

if(!admin){
    return (
        <div>Try Next time</div>
    )
}
else {
    router.push('/admin/admin')
}
  return (  
      <div>
          
      </div>    
)
}