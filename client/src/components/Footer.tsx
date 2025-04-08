import { Twitter, GitPullRequest, Facebook } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#222222] text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-4">CodeReviewAI</h4>
            <p className="text-gray-400 text-sm">
              Instant AI-powered code reviews for freelance developers. Improve your code quality and client satisfaction.
            </p>
          </div>
          <div>
            <h5 className="font-medium mb-4">Resources</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-4">Company</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-4">Connect</h5>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <GitPullRequest className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">Subscribe to our newsletter for updates on new features and tips:</p>
            <div className="mt-2 flex">
              <Input 
                type="email" 
                placeholder="email@example.com" 
                className="bg-gray-700 text-white rounded-r-none border-gray-700"
              />
              <Button className="bg-[#14A800] rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} CodeReviewAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
