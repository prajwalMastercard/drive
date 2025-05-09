const Header = () => {

  return (
    <header className="bg-black border-b border-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Mastercard Logo */}
          <div className="flex items-center justify-center">
            <img src="https://www.mastercard.us/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" alt="Mastercard" className="h-8" />
          </div>
          <div className="ml-1">
            <h1 className="text-lg font-semibold tracking-tight text-white">Momentum Value Calculator</h1>
            <p className="text-xs text-gray-300">Financial Intelligence Tool</p>
          </div>
        </div>
        
        <div className="flex items-center">
          {/* User avatar with white border */}
          <div className="w-9 h-9 rounded-full bg-gray-800 border border-white flex items-center justify-center shadow-sm hover:bg-gray-700 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-300">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
