import React from "react"
import { TrendingUp } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="bg-[#E50000] text-white px-3 py-2 rounded-lg font-bold text-lg mb-4 inline-block">
              LinkPNG
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Papua New Guinea&apos;s premier online marketplace. Shop with confidence, deliver with care.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-sm">f</div>
              <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center text-sm">t</div>
              <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center text-sm">i</div>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* About LinkPNG */}
          <div>
            <h3 className="font-semibold mb-4">About LinkPNG</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Investor Relations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Payment & Logistics */}
          <div>
            <h3 className="font-semibold mb-4">Payment & Delivery</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-300 mb-2">Payment Methods</p>
                <div className="flex gap-2 flex-wrap">
                  <div className="bg-white text-black px-2 py-1 rounded text-xs">VISA</div>
                  <div className="bg-white text-black px-2 py-1 rounded text-xs">Mobile Money</div>
                  <div className="bg-white text-black px-2 py-1 rounded text-xs">COD</div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-300 mb-2">Delivery Partners</p>
                <div className="flex gap-2 flex-wrap">
                  <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs">PNG Post</div>
                  <div className="bg-green-600 text-white px-2 py-1 rounded text-xs">Express</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>We&apos;re committed to fair trade.</span>
          </div>
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} LinkPNG. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
