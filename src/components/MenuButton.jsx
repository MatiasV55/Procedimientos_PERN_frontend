function MenuButton({ open, handleClick }) {
  return open ? (
    <div className="flex items-center">
      <input
        type="checkbox"
        onClickCapture={handleClick}
        className="hidden"
        id="btn-ho"
      />
      <label htmlFor="btn-ho">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover:cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </label>
    </div>
  ) : (
    <div className="flex items-center">
      <input
        type="checkbox"
        onClickCapture={handleClick}
        className="hidden"
        id="btn-hc"
      />
      <label htmlFor="btn-hc">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover:cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
    </div>
  );
}

export default MenuButton;
