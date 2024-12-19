import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ContactPanel } from '../ContactPanel';
import type { Project } from '../../types/project';

interface SolutionHeaderProps {
  project: Project;
  onSubmitClick: () => void;
}

export function SolutionHeader({ project, onSubmitClick }: SolutionHeaderProps) {

  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showContactPanel, setShowContactPanel] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
      toast.success('Successfully signed out');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };
  
  return (
    <>
          <header className="bg-white py-4 px-6 flex items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <img 
                src="https://s3-alpha-sig.figma.com/img/b1ab/7121/88eb5dcb44179563ae244df2a92ba749?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OkfPfxaC0dCVYNQwFrfigJKe1jomLHrhf2iz0YtUPJ3MzXYcuKGjRWkI4ZZ05GGX1hztWrv3kTy~aV8PNHSCCCYGmkpk1lDX4tsdgwRNdtfYxgnkibQKjZwYumvJ55bu3XRFAc7nrqAPneecavU29IHARwyTgEZ9qXCoJtPljIEPa6BFnljpITQ3rwJTJ5tLCvHELI7svPaudv1a2wxlL5~kT3W9GoF0MPV6bMKZ1SbK36Y9NQ3wEQzXqa6kveWfaqTBmq2yCnb5CSRJ1FYFzHM~sLpfgzRy6mkgR7LKyUCiWAXkANTY2GSr5uS~hLdJ37YyKTjz328E8z4hgoEjGQ__" 
                alt="Chemonics" 
                className="h-8"
                style={{ width: '232px', height: '51px'}}
              />
            </div>
    
            <nav className="flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
              <button 
                onClick={() => setShowContactPanel(true)} 
                className="text-gray-700 hover:text-gray-900"
              >
                Contact Us
              </button>
              <button 
              className="bg-white border border-orange-500 text-orange-500 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors">
                Share Your Feedback
              </button>
              <button 
                onClick={onSubmitClick}
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Submit your solution
              </button>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">{user?.email?.split('@')[0]}</span>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ▼
                  </button>
                </div>
              </div>
            </nav>
          </header>
    
          {showContactPanel && <ContactPanel onClose={() => setShowContactPanel(false)} />}
        </>
  );
}