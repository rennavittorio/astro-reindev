import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface SocialLinkProps {
  href: string
  children: ReactNode
  darkMode: boolean
  label: string
  download?: boolean
}

const SocialLink = ({
  href,
  children,
  darkMode,
  label,
  download = false,
}: SocialLinkProps) => {
  return (
    <div className="relative group flex flex-col items-center gap-2">
      <a
        href={href}
        target={download ? undefined : '_blank'}
        rel={download ? undefined : 'noopener noreferrer'}
        download={download}
        className={twMerge(
          'p-4 border-1 border-gray-800 rounded-lg hover:bg-gray-800 hover:text-gray-300',
          darkMode && 'border-gray-300 hover:bg-gray-300 hover:text-gray-800'
        )}
      >
        {children}
      </a>
      <div
        className={twMerge(
          'transition-opacity',
          'absolute rounded-lg px-3 py-1.5 text-xs',
          'top-[-1rem] left-1/2 -translate-x-1/2 -rotate-6',
          'sm:-top-12 sm:left-1/2 sm:-translate-x-1/2 sm:text-sm sm:whitespace-nowrap sm:rotate-0',
          'sm:opacity-0 sm:group-hover:opacity-100',

          darkMode ? 'bg-gray-300 text-gray-800' : 'bg-gray-800 text-gray-300'
        )}
      >
        {label}
        <div className="hidden sm:block absolute w-2 h-2 bg-inherit transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  )
}

export default SocialLink
