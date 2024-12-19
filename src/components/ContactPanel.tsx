import React from 'react';
import { X, Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

interface ContactPanelProps {
  onClose: () => void;
}

export function ContactPanel({ onClose }: ContactPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between bg-orange-50">
          <div>
            <h3 className="font-bold text-2xl text-gray-900">Contact Us</h3>
            <p className="text-gray-600">Get in touch with our team</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-100 rounded-full transition-colors"
            aria-label="Close panel"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-semibold mb-4">Headquarters</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <p className="text-gray-900">1717 H Street NW</p>
                    <p className="text-gray-900">Washington, DC 20006</p>
                    <p className="text-gray-900">United States</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <a href="tel:+12024691900" className="text-gray-900 hover:text-orange-600">
                    +1 202 469 1900
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <a href="mailto:info@chemonics.com" className="text-gray-900 hover:text-orange-600">
                    info@chemonics.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-orange-500" />
                  <a 
                    href="https://www.chemonics.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-orange-600 flex items-center gap-1"
                  >
                    www.chemonics.com
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Send us a message</h4>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}