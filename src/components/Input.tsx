import React from "react";
import type { InputProps } from "@/types/inputType";
const Input: React.FC<InputProps> = ({
  label,
  value,
  type = "text",
  placeholder,
  onChange,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
