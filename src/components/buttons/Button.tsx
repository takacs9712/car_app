import { Link, LinkProps } from "react-router-dom";

interface ButtonProps extends Omit<LinkProps, "to"> {
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  to,
  className,
  ...rest
}) => {
  return (
    <Link
      to={to || ""}
      className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
};
