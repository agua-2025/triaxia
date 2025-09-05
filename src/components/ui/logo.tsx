import { Brain } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'white' | 'dark'
  showIcon?: boolean
  href?: string
}

const sizeClasses = {
  sm: {
    icon: 'w-6 h-6',
    iconContainer: 'w-8 h-8',
    text: 'text-lg'
  },
  md: {
    icon: 'w-6 h-6', 
    iconContainer: 'w-10 h-10',
    text: 'text-2xl'
  },
  lg: {
    icon: 'w-8 h-8',
    iconContainer: 'w-12 h-12', 
    text: 'text-3xl'
  }
}

const variantClasses = {
  default: {
    iconContainer: 'bg-gradient-to-r from-blue-500 to-purple-600',
    icon: 'text-white',
    text: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
  },
  white: {
    iconContainer: 'bg-white/10 backdrop-blur-sm border border-white/20',
    icon: 'text-white',
    text: 'text-white'
  },
  dark: {
    iconContainer: 'bg-gray-900',
    icon: 'text-white', 
    text: 'text-gray-900'
  }
}

export function Logo({ 
  className, 
  size = 'md', 
  variant = 'default', 
  showIcon = true, 
  href 
}: LogoProps) {
  const sizeConfig = sizeClasses[size]
  const variantConfig = variantClasses[variant]
  
  const logoContent = (
    <div className={cn('flex items-center space-x-2', className)}>
      {showIcon && (
        <div className={cn(
          'rounded-lg flex items-center justify-center transition-all duration-300',
          sizeConfig.iconContainer,
          variantConfig.iconContainer
        )}>
          <Brain className={cn(sizeConfig.icon, variantConfig.icon)} />
        </div>
      )}
      <span className={cn(
        'font-bold transition-all duration-300',
        sizeConfig.text,
        variantConfig.text
      )}>
        Triaxia
      </span>
    </div>
  )
  
  if (href) {
    return (
      <Link href={href} className="transition-transform duration-300 hover:scale-105">
        {logoContent}
      </Link>
    )
  }
  
  return logoContent
}