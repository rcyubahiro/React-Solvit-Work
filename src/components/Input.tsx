import React from "react";
import type { InputProps } from "@/types/inputType";

const Input: React.FC<InputProps> = ({
  label,
  value,
  type = "text",
  placeholder,
  onChange,
  required,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white hover:border-gray-400"
      />
    </div>
  );
};

export default Input;
