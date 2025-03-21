import React from 'react';
import { Check, Star } from 'lucide-react';
import ProMode from '../components/proMode';

const PricingCard = ({ plan, price, features, buttonText, popular, onClick }) => (
  <div className={`relative rounded-2xl p-8 ${popular ? 'bg-blue-600 text-white' : 'bg-gray-900'} shadow-xl transform transition-all duration-300 hover:scale-105`}>
    {popular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center">
          <Star className="w-4 h-4 mr-1" />
          Popular
        </span>
      </div>
    )}
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-2">{plan}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-400">/month</span>
      </div>
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="w-5 h-5 mr-3 text-green-400" />
          <span className={`${popular ? 'text-gray-100' : 'text-gray-300'}`}>{feature}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onClick}
      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
        popular
          ? 'bg-white text-blue-600 hover:bg-gray-100'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {buttonText}
    </button>
  </div>
);

const ProModel: React.FC = () => {
  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="py-4">
          <div className="flex justify-between items-center">
            <div className="text-white text-2xl font-bold">NeuraQuest</div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white">Help</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign In
              </button>
            </div>
          </div>
        </nav>
      </div>
      
      <ProMode />
      
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© 2024 NeuraQuest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProModel;
