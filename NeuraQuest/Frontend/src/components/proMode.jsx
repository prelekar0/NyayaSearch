import React from 'react';
import { X } from 'lucide-react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProMode = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white text-black p-8 relative">
      <div className="absolute top-4 right-4">
        <button onClick={handleClose} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <X className="h-6 w-6 text-black" />
        </button>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Upgrade your plan</h1>

        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className="bg-gray-100 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">Free</h2>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
            <p className="text-gray-600 mb-6">Explore how AI can help you with everyday tasks</p>
            <button className="w-full py-2 px-4 bg-gray-100 border border-gray-400 rounded-lg mb-6">
              Your current plan
            </button>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                <span>Access to GPT-4o mini and reasoning</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                <span>Standard voice mode</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                <span>Real-time data from the web with search</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                <span>Limited access to GPT-4o</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                <span>Use custom GPTs</span>
              </li>
            </ul>
          </div>

          {/* Plus Plan */}
          <div className="bg-gray-100 rounded-xl p-6 relative border-2 border-blue-500">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-xs px-3 py-1 rounded-full uppercase text-white">Popular</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Plus</h2>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold">$20</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
            <p className="text-gray-600 mb-6">Level up productivity and creativity with expanded access</p>
            <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg mb-6 text-white">
              Get Plus
            </button>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <span>Everything in Free</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <span>Extended limits on messaging, file uploads, advanced data analysis, and image generation</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <span>Standard and advanced voice mode</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <span>Access to deep research, multiple reasoning models (o3-mini, o3-mini-high, and o1)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <span>Limited access to Sora video generation</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <span>Opportunities to test new features</span>
              </li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-gray-100 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">Pro</h2>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold">$200</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
            <p className="text-gray-600 mb-6">Get the best of OpenAI with the highest level of access</p>
            <button className="w-full py-2 px-4 bg-black text-white hover:bg-gray-800 rounded-lg mb-6">
              Get Pro
            </button>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-black mr-2 mt-0.5" />
                <span>Everything in Plus</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-black mr-2 mt-0.5" />
                <span>Unlimited access to all reasoning models and GPT-4o</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-black mr-2 mt-0.5" />
                <span>Unlimited access to advanced voice</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-black mr-2 mt-0.5" />
                <span>Extended access to deep research, which conducts multi-step online research for complex tasks</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-black mr-2 mt-0.5" />
                <span>Access to research previews of GPT-4.5 and Operator</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-black mr-2 mt-0.5" />
                <span>Extended access to Sora video generation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        
      </div>
    </div>
  );
};

export default ProMode; 