import React from "react";

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default InputField;
