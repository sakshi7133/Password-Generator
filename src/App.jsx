import { useEffect, useState,useCallback,useRef } from 'react'
import './App.css'

function App() {  
  const [length, setLength] = useState(8)
  const [numberallowed, setNumberallowed]=useState(false)
  const [charallowed,setCharallowed]=useState(false)
  const [password, setPassword]=useState("")

  const[strengthScore,setStrengthScore]=useState(0)
  const[strengthLabel,setStrengthLabel]=useState("weak")
  const[strengthColor,setStrengthColor]=useState("red")

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
    },[length,numberallowed,charallowed] )

  const analyzeStrength=useCallback((password)=>{
    let score=0;
    if(password.length>=8) score++;
    if(password.length>=12) score++;

    if(/[0-9]/.test(password)) score++;
    if(/[!@#$%^&*()_|\-+=\[\]{}~`]/.test(password)) score++;
    if(/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;

    if(!/(.)\1{2,}/.test(password)) score++;

    setStrengthScore(score);

    if(score<=2){
      setStrengthLabel("weak");
      setStrengthColor("red")
    }
    else if(score<=4){
      setStrengthLabel("medium");
      setStrengthColor("orange");
    } else{
      setStrengthLabel("strong");
      setStrengthColor("green")
    }

  },[])
  const copytoclipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordgenerator()},[length,numberallowed,charallowed])
  useEffect(()=>{analyzeStrength(password);},[password]) ;
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
        className="bg-green-600 text-white px-3">copy</button>
     </div>
     
      <div className='py-4'>
          <div className="mt-2 mb-3 px-3 mx-2 flex">
           <p>Strength:</p> 
           <p style={{ color: strengthColor, fontWeight: "bold" }}>
             {strengthLabel} ({strengthScore})
          </p>
        </div>
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
     <button onClick={()=>{passwordgenerator()}} className='bg-green-600 text-white py-2 rounded-lg mb-4 px-2 '> Generate password</button>
    </div>
    </div>
    </>
  ) ;    

}
export default App