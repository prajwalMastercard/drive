const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center text-white text-sm space-x-4">
            <div className="flex items-center">
              <span>© 1995-2025 Mastercard®</span>
            </div>
            <div className="text-white">|</div>
            <a href="#" className="text-orange-500 hover:underline transition-colors">
              Terms of Use
            </a>
            <div className="text-white">|</div>
            <a href="#" className="text-orange-500 hover:underline transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
