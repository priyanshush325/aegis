import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive"
  size?: "default" | "sm" | "lg"
}

export function Button({
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 interactive-scale interactive-shadow"

  const variants = {
    default: "bg-black text-white hover:bg-gray-800 hover:interactive-shadow-hover focus-visible:ring-black",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 hover:interactive-shadow-hover focus-visible:ring-gray-400",
    outline: "border border-gray-300 bg-white hover:bg-gray-100 hover:interactive-shadow-hover focus-visible:ring-gray-400",
    ghost: "hover:bg-gray-100 hover:interactive-shadow-hover focus-visible:ring-gray-400",
    destructive: "bg-red-600 text-white hover:bg-red-700 hover:interactive-shadow-hover focus-visible:ring-red-500"
  }

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8 text-base"
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim()

  return <button className={classes} {...props} />
}
