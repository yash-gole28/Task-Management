import React, { useEffect } from 'react'

const List = ({arr}) => {
  
  
 const data = arr
   useEffect(()=> {
    // addCheck(arr)
    // console.log(arr)
   },[])
  return (
    <ul className="list-group list-group-flush">
   {data.map((details , index)=>(
      <li key={index} className="list-group-item list-background" onClick={() => console.log(details)} >{details}</li>
   ))}
  </ul>
  )
}

export default List
