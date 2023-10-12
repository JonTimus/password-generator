import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [upperCaseAllowed, setUpperCaseAllowed] = useState(false)
  const [lowerCaseAllowed, setLowerCaseAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [copyButtonText, setCopyButtonText] = useState('copy')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = ""

    if (upperCaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (lowerCaseAllowed) str += "abcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, upperCaseAllowed, lowerCaseAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select() // 
    setCopyButtonText('copied')
    // console.log(password)
  }

  const resetCopyButtonText = () => {
    setCopyButtonText('copy')
  }

  const regeneratePassword = () => {
    generatePassword()
    resetCopyButtonText()
  }

  const getPasswordDifficulty = () => {
    const criteriaCount = (numberAllowed ? 1 : 0) + (charAllowed ? 1 : 0) + (upperCaseAllowed ? 1 : 0) + (lowerCaseAllowed ? 1 : 0)
    if (criteriaCount === 1) {
      return (
        <span className='text-red-600 text-sm'>Easy</span>
      )
    } else if (criteriaCount === 2) {
      return (
        <span className='text-amber-400 text-sm'>Medium</span>
      )
    } else if (criteriaCount >= 3) {
      return (
        <span className='text-lime-600 text-sm'>Hard</span>
      )
    } else {
      return ''
    }
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed, upperCaseAllowed, lowerCaseAllowed, generatePassword])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-white text-neutral-800'>
      <h1 className='text-neutral-800 text-center my-1'>PASSWORD GENERATOR</h1>
      <p className='text-neutral-600 text-center my-5 text-sm'>Create a strong and secure passwords to keep your account safe online.</p>
      <div className='flex shadow rounded-lg overflow-hidden'>
        <div className='relative flex-grow'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 pr-10' // Added pr-10 for icon
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={regeneratePassword} className='absolute right-0 top-0 h-full bg-white px-2 py-0.5'>
            <FontAwesomeIcon icon={faRedo} />
          </button>
          <button onClick={copyPasswordToClipboard} className='absolute right-10 top-0 h-full bg-cyan-500 text-white px-3 py-0.5'>{copyButtonText}</button>
        </div>
      </div>
      <div className='text-gray-400 text-left mb-4'>
          {getPasswordDifficulty()}
      </div>
      <div className='flex text-sm flex-col gap-y-2'>
        <label className='text-sm' htmlFor='length'>Password Length: {length}</label>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer flex-grow accent-cyan-500'
            onChange={(e) => {
              setLength(e.target.value)
              resetCopyButtonText()
            }}
          />
        </div>
        <div className='flex items-center gap-x-1'>
          <label htmlFor='upperCase'>Uppercase</label>
          <input
            type="checkbox"
            defaultChecked={upperCaseAllowed}
            className='w-5 h-5 bg-white accent-cyan-500 border border-gray-600 rounded-md cursor-pointer ml-auto'
            onChange={() => {
              setUpperCaseAllowed((prev) => !prev)
              resetCopyButtonText()
            }}
          />
        </div>
        <div className='flex items-center gap-x-1'>
          <label htmlFor='lowerCase'>Lowercase</label>
          <input
            type="checkbox"
            defaultChecked={lowerCaseAllowed}
            className='w-5 h-5 bg-white accent-cyan-500 border border-gray-600 rounded-md cursor-pointer ml-auto'
            onChange={() => {
              setLowerCaseAllowed((prev) => !prev)
              resetCopyButtonText()
            }}
          />
        </div>
        <div className='flex items-center gap-x-1'>
          <label htmlFor='number'>Numbers</label>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            className='w-5 h-5 bg-white accent-cyan-500 border border-gray-600 rounded-md cursor-pointer ml-auto'
            onChange={() => {
              setNumberAllowed((prev) => !prev)
              resetCopyButtonText()
            }}
          />
        </div>
        <div className='flex items-center gap-x-1'>
          <label htmlFor='charInput'>Special Characters</label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            className='w-5 h-5 bg-white accent-cyan-500 border border-gray-600 rounded-lg cursor-pointer ml-auto'
            onChange={() => {
              setCharAllowed((prev) => !prev)
              resetCopyButtonText()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
