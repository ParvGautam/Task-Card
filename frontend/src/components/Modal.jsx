function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-70">
      <div className="bg-white rounded-2xl shadow-2xl p-6 relative w-full max-w-md mx-2">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal; 