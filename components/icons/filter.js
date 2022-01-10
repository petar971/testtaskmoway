import * as React from "react"

const Filter = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={36}
    viewBox="0 0 24 24"
    width={36}
    {...props}
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path fill="#fff" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
)

export default Filter

