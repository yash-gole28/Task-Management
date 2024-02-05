import React, { useEffect, useState } from 'react'

const List = ({arr}) => {
  const [checked , setChecked] =useState(false)
   const [data , setData] = useState([]) 
  // console.log(data)

  function addCheck(arr){
    for(let i = 0 ; i<arr.length ; i++){
      let addCheck = {listData : arr[i] , checked : false}
      // console.log(addCheck)
      setData([...data , addCheck])
      console.log(data)
     }
  }
  
  
   useEffect(()=> {
    addCheck(arr)
   },[])
  return (
    <ul className="list-group list-group-flush">
   {data.map((details , index)=>(
      <li className="list-group-item list-background" onClick={() => console.log(index)} >{details.listData}</li>
   ))}
  </ul>
  )
}

export default List
