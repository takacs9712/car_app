interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, href }) => {
  return (
    <a
      href={href}
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer"
    >
      {children}
    </a>
  );
};
