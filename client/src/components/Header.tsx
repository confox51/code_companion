import { Code } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Code className="w-8 h-8 text-[#14A800] mr-2" />
          <h1 className="text-xl font-semibold text-[#222222]">CodeReviewAI</h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><a href="#" className="text-[#707070] hover:text-[#14A800] transition-colors">Home</a></li>
            <li><a href="#" className="text-[#707070] hover:text-[#14A800] transition-colors">How it Works</a></li>
            <li><a href="#" className="text-[#707070] hover:text-[#14A800] transition-colors">Pricing</a></li>
            <li><a href="#" className="text-[#707070] hover:text-[#14A800] transition-colors">FAQ</a></li>
          </ul>
        </nav>
        <div className="hidden md:block">
          <button className="bg-[#14A800] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded transition-colors">
            Sign In
          </button>
        </div>
        <div className="md:hidden">
          <button className="text-[#222222]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
