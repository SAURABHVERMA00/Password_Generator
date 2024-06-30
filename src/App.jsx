import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length,setLength] = useState(8)
  const [number,setNumber] = useState(false)
  const [character,setCharacter] = useState(false)
  const [password,setPassword ] = useState(" ")


  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass=" "
    let str="ABCEDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number){
      str+="0123456789"
    }
    if(character){
      str+="!@#$&"
    }
    
    for(let i=1; i<=length; i++){
      let char=Math.floor(Math.random()*str.length+1)
     
      pass+=str.charAt(char)

    }
    
    setPassword(pass)
  },[length, number, character, setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, number , character, passwordGenerator])
  

  return (
    <div className='flex items-center justify-center h-screen' >
      <div className=' w-3/4 h-3/4 flex items-center justify-around flex-col gap-10  text-orange-500 bg-gray-800'>
      <h1 className='text-6xl text-center text-white my-1 '>Password Generator </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 w-2/3 mb-6   '>
          <input type="text"
                  value={password}
                  className="outline-none w-full py-5  px-6 text-2xl  "
                  placeholder="Password"
                 readOnly
                 ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none text-white text-2xl px-3 py-0.5 shrink-0 bg-blue-700' >Copy</button>

        </div>

        <div className='flex  text-sm gap-x-2'>

          <div className='flex items-center text-xl gap-x-2'>
            <input type="range"
                  min={5}
                  max={20}
                  value={length}
                  className='cursor-pointer'
                  onChange={(e)=>{setLength(e.target.value)}}
            />
            <label htmlFor="" >Length:{length}</label>
          </div>

          <div className='flex items-center text-xl gap-x-2'>
            <input type="checkbox"
                    defaultChecked={number}
                    id="numberInput"

                    onChange={()=>{setNumber((prev)=>!prev)}}
                   
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center text-xl gap-x-2'>
            <input type="checkbox"
                    defaultChecked={character}
                    id="charcterInput"

                    onChange={()=>{setCharacter((prev)=>!prev)}}
                   
            />
            <label htmlFor="charcterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
