import { useEffect, useState,useCallback,useRef } from 'react'
import './App.css'

function App() {  
  const [length, setLength] = useState(8)
  const [numberallowed, setNumberallowed]=useState(false)
  const [charallowed,setCharallowed]=useState(false)
  const [password, setPassword]=useState("")
  const passwordgenerator= useCallback(()=>{
       let pass =""
       let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
       if(numberallowed) str+="0123456789";
       if(charallowed) str+="!@#$%^&*-_+=[]{}~`";
       for(let i=1;i<=length;i++)
       {
         let char =Math.floor(Math.random()* str.length)
         pass += str.charAt(char)
       }   
        setPassword(pass)
    },[length,numberallowed,charallowed,setPassword] )

  const copytoclipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordgenerator()},[length,numberallowed,charallowed]) 
  const passwordRef=useRef(null)
   return  (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700'>
     <div className='flex overflow-hidden rounded-lg  mb-4'>
      <input
       type="text"
       value={password}
       className="outline-none w-full py-1 px-3 "
       placeholder='password'
       readOnly
       ref={passwordRef}
       />
       <button
        onClick={copytoclipboard}
        className="bg-blue-600 text-white px-3">copy</button>
     </div>
     <div>
      <div className='flex text-sm items- center gap-x-2'>
        <div className='flex items-center'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}} />
        <label>Length({length})</label>
        </div>
        <div>
        <input 
        type="checkbox"
        checked={numberallowed}
        onChange={()=>{setNumberallowed(!numberallowed)}}
        /> 
        <label>Numbers</label>
        </div>
        <div>
        <input
        type="checkbox"
        checked={charallowed}
        onChange={()=>{setCharallowed(!charallowed)}}
        />
        <label>character</label>
        </div>
     </div>
    </div>
    </div>
    </>
  ) ;    

}
export default App