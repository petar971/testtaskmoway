import Cookies from 'js-cookie'
import Router from 'next/router'
import merge from 'lodash/merge'

export const fetchWithToken = async (url, options) => {

    let optionsWithToken = options
    if (Cookies.get('access') != null) {
      optionsWithToken = merge({}, options, {
        headers: {
          "Authorization": `Bearer ${Cookies.get('access')}`
        }
      })
    }
    let s = await fetch(url, optionsWithToken)
 
    if (s.status === 401) {
      const asd = await fetch("http://localhost:8000/api/token/refresh/", {
        headers: {"Content-Type": "application/json"},
        method: 'POST',
        body: JSON.stringify({"refresh": Cookies.get("refresh")})
      })
 
      const data = await asd.json()
 
      if (asd.status === 200) {
        Cookies.set('access', (data.access))
      }
      else {
        Cookies.remove('access')
        Cookies.remove('refresh')
        Router.push('/login')
      }
 
      optionsWithToken = merge({}, options, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("access")}`
        }
      })
 
      const resp = await fetch(url, optionsWithToken)
      return resp
    }
    else {
      const resp = s
      return resp
    }
  }
 