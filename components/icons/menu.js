import * as React from "react"

function Menu(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={36}
      viewBox="0 0 24 24"
      width={36}
      {...props}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path fill="#443f37" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  )
}

export default Menu
