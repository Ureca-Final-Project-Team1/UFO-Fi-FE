import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  label,
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseStyle = "px-4 py-2 font-semibold rounded-xl transition-all";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}>
      {label}
    </button>
  );
}
