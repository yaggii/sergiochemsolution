import React, { useState } from 'react';
import { ContactPanel } from './ContactPanel';
import { CircleDot } from 'lucide-react';

interface FooterProps {
  onSubmitClick: () => void;
}

export function Footer({ onSubmitClick }: FooterProps) {
  const [showContactPanel, setShowContactPanel] = useState(false);

  return (
    <>
      <footer>
        <div className="container mx-auto px-8 mb-16">
          <div className="bg-[#F15A29] py-16 px-12 relative overflow-hidden rounded-3xl">
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <h2 className="text-white text-lg font-medium mb-4">SCALE WITH US</h2>
                <h3 className="text-white text-4xl font-bold mb-8">
                  Submit your Solution to<br />enhance your impact
                </h3>
                <div className="flex gap-4">
                  <button 
                    onClick={onSubmitClick}
                    className="bg-white text-[#F15A29] px-6 py-3 rounded-full font-medium hover:bg-orange-50 transition-colors"
                  >
                    Submit your Solution
                  </button>
                  <button 
                    onClick={() => setShowContactPanel(true)}
                    className="bg-transparent text-white px-6 py-3 rounded-full font-medium border-2 border-white hover:bg-white/10 transition-colors"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
              <div className="opacity-20">
                <CircleDot className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-600 py-4 px-8">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img 
                src="https://s3-alpha-sig.figma.com/img/d2b1/6cc8/6481064ed23d16115feab0a837084b70?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JOykAEn04EWFUIhG7AvSh0VjTlwdKoPyFuvKBtCl3AgLiDYh6mYC9NoSpQM1DKBoY8MHlCK4Othp1paZCrYANBwbPI4235w3CO26i-mk6Va92~0EQopS3JoZ7ggnYPBEVWPpHxT4IlnpXbwZ8LtogHoVgVMDoc0jFc0Gu9Q-SwjAHQO-K6dVd9frSFJv0Iwp9pjr7vgOu85ukTb9jtLOgCrTcln~9sxfjoH4fR9pDO2q1AU9PD1zaRbHtZRxvi1LXnME4pAurnDQg8IT2faiqOQgHyt-EjwFniMnMtBcJVnr7CHOG1KcPe0Rx12S2bAmMtNHlfF8mpXshCXxu2gHUg__" 
                alt="Chemonics" 
                className="h-12 brightness-0 invert"
              />
            </div>
            <span className="text-white">Solutions Exchange</span>
          </div>
        </div>
      </footer>

      {showContactPanel && <ContactPanel onClose={() => setShowContactPanel(false)} />}
    </>
  );
}