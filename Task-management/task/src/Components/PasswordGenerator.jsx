import React, { useCallback, useEffect, useRef, useState } from 'react'

const PasswordGenerator = () => {
    const [length , setLength] = useState(8)
    const [numAllowed , setNumAllowed] = useState(true)
    const [character , setCharacter] = useState(true)
    const [password , setPassword] = useState("")
    const passwordRef = useRef(null)


    const passwordGenerate = useCallback(()=>{
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        
        if(numAllowed) str += "0123456789"
        if(character) str += "!@#$%^&*`_-+"

        for(let i = 1 ; i <= length ; i++){
            let char = Math.floor(Math.random() * str.length + 1)

            pass += str.charAt(char)
        }
        setPassword(pass)

    },[length,numAllowed,character,setPassword])

    const copyText = useCallback(() => {
      window.navigator.clipboard.writeText(password)
      passwordRef.current?.select()
      passwordRef.current.setSelectionRange(0 , 15)
    }, [password])

    useEffect(()=>{
        passwordGenerate()
    },[length , numAllowed , character , passwordGenerate])

  return (
    <div>
      <input style={{color:"red"}} type="text" placeholder='password' value={password} ref={passwordRef}/>
      <button onClick={copyText}>copy</button><br />
      <input type="range" min={8} max={20} value={length} onChange={(e)=>setLength(e.target.value)} />
      <label htmlFor=""> {length} </label><br />
      <input type="checkbox"
      defaultChecked = {numAllowed}
      onClick={()=>setNumAllowed(!numAllowed)} /> 
      <label htmlFor="">number</label><br />
      <input type="checkbox"
      defaultChecked={character}
      onClick={()=>setCharacter(!character)} />
      <label htmlFor="">Special characher</label>
    </div>
  )
}

export default PasswordGenerator
