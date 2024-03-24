import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  redirectPath,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleClose);
    }

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, [isOpen, onClose]);

  const handleRedirect = () => {
    onClose();
    // If so, it will take you to the next page, depending on which page you are on
    navigate(redirectPath);
  };

  return isOpen
    ? createPortal(
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {children}
            <div className="flex justify-end mt-4">
              <button
                onClick={onClose}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
              >
                Nem
              </button>
              <button
                onClick={handleRedirect}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Igen
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
