import { Github, Linkedin } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

const Main = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div
      className={twMerge(
        'bg-gray-300 text-gray-800 min-h-dvh w-full flex justify-center items-center font-sans p-4 sm:p-0',
        darkMode && 'bg-gray-800 text-gray-300'
      )}
    >
      <div className="sm:w-2/3 sm:h-2/3 flex flex-col gap-8 text-4xl">
        <div className="flex items-baseline gap-4">
          <h1 className="text-8xl font-semibold">Hi!</h1>
          <div
            className="relative w-[30px] h-[30px] cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
          >
            <div
              className={twMerge(
                'cube absolute rounded-md w-[40px] h-[40px] text-xs flex items-center justify-center',
                darkMode
                  ? 'text-gray-800 bg-gray-300'
                  : 'text-gray-300 bg-gray-800'
              )}
            >
              {darkMode ? 'dark' : 'light'}
            </div>
          </div>
        </div>
        <p>
          I&apos;m Vittorio, a developer with a background in the neuroscience.
        </p>
        <p>
          I mainly code in JS/TS and Ruby. I work with React, Next and Ruby on
          Rails
        </p>
        <p>Beside programming, I love mountains and beers</p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/rennavittorio"
            target="_blank"
            className={twMerge(
              'p-4 border-1 border-gray-800 rounded-lg hover:bg-gray-800 hover:text-gray-300',
              darkMode &&
                'border-gray-300 hover:bg-gray-300 hover:text-gray-800'
            )}
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/rennavittorio"
            target="_blank"
            className={twMerge(
              'p-4 border-1 border-gray-800 rounded-lg hover:bg-gray-800 hover:text-gray-300',
              darkMode &&
                'border-gray-300 hover:bg-gray-300 hover:text-gray-800'
            )}
          >
            <Github size={24} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Main
