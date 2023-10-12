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
  }

  const resetCopyButtonText = () => {
    setCopyButtonText('copy')
  }

  const regeneratePassword = () => {
    generatePassword()
  }

  const getPasswordDifficulty = () => {
    const criteriaCount = (numberAllowed ? 1 : 0) + (charAllowed ? 1 : 0) + (upperCaseAllowed ? 1 : 0) + (lowerCaseAllowed ? 1 : 0)
    if (criteriaCount === 1) {
      return (
        <span style={{ color: 'red' }}>Easy</span>
      )
    } else if (criteriaCount === 2) {
      return (
        <span style={{ color: 'yellow' }}>Medium</span>
      )
    } else if (criteriaCount >= 3) {
      return (
        <span style={{ color: 'green' }}>Hard</span>
      )
    } else {
      return ''
    }
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed, upperCaseAllowed, lowerCaseAllowed])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-white text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
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
          <button onClick={copyPasswordToClipboard} className='absolute right-10 top-0 h-full bg-cyan-600 text-white px-3 py-0.5'>{copyButtonText}</button>
        </div>
      </div>
      <div className='flex text-sm flex-col gap-y-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer flex-grow'
            onChange={(e) => {
              setLength(e.target.value)
              resetCopyButtonText()
            }}
          />
          <label htmlFor='length'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
              resetCopyButtonText()
            }}
          />
          <label htmlFor='number'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
              resetCopyButtonText()
            }}
          />
          <label htmlFor='charInput'>Special Characters</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={upperCaseAllowed}
            onChange={() => {
              setUpperCaseAllowed((prev) => !prev)
              resetCopyButtonText()
            }}
          />
          <label htmlFor='upperCase'>Uppercase</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={lowerCaseAllowed}
            onChange={() => {
              setLowerCaseAllowed((prev) => !prev)
              resetCopyButtonText()
            }}
          />
          <label htmlFor='lowerCase'>Lowercase</label>
        </div>
        <div className='text-center text-gray-400'>
          Password Difficulty: {getPasswordDifficulty()}
        </div>
      </div>
    </div>
  )
}

export default App
