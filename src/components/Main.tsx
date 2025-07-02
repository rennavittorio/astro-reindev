import { Github, Linkedin } from 'lucide-react'

const Main = () => {
  return (
    <div className="bg-gray-300 text-gray-800 min-h-dvh w-full flex justify-center items-center font-sans p-4 sm:p-0">
      <div className="sm:w-2/3 sm:h-2/3 flex flex-col gap-8 text-4xl">
        <div className="flex items-baseline gap-4">
          <h1 className="text-8xl font-semibold">Hi!</h1>
          <div className="relative w-[30px] h-[30px]">
            <div className="cube absolute rounded-md w-[40px] h-[40px] bg-green-500"></div>
          </div>
        </div>
        <p>
          I&apos;m Vittorio, a developer with a background in the neuroscience.
        </p>
        <p>
          Currently working in{' '}
          <a
            href="https://www.gility.it/"
            target="_blank"
            className="underline hover:text-green-500"
          >
            Gility
          </a>
          .
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
            className="p-4 border-1 border-gray-800 rounded-lg hover:bg-gray-800 hover:text-green-500"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/rennavittorio"
            target="_blank"
            className="p-4 border-1 border-gray-800 rounded-lg hover:bg-gray-800 hover:text-green-500"
          >
            <Github size={24} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Main
