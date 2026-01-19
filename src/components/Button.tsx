import React from "react";
// Type for union of string literals
// type ButtonVariant = "primary" | "secondary" | "danger";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger";
  type?: "button" | "submit" | "reset";
}



const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105";

  //     Record<K, V> is a TypeScript utility type that creates an object type where:

  // Keys (K) must be specific values

  // Values (V) must follow a specific type

  // In simple words:

  // Record forces an object to have exact keys with a fixed value type.

  const variantStyles: Record<typeof variant, string> = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    danger: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
