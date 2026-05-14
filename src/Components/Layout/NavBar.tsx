import React, { useState, useEffect } from 'react';
import { useTheme } from '../../Store/ThemeContext';
import { SunIcon, MoonIcon } from '../Icons';

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  activeSection,
  setActiveSection,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const navItems = ['Home', 'About', 'Experience', 'Projects', 'Contact'];

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 4000);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    const element = document.getElementById(section.toLowerCase());
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? isDark ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-lg'
          : isDark ? 'bg-slate-900' : 'bg-white'
      } ${isDark ? 'border-b border-slate-800' : 'border-b border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className={`font-playball text-2xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent`}>
              Portfolio
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                    activeSection === item
                      ? 'text-cyan-500'
                      : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-cyan-500 transition-all duration-300 ${
                    activeSection === item ? 'w-6' : 'w-0 group-hover:w-4'
                  }`}></span>
                </button>
              ))}
              
              <button
                onClick={toggleTheme}
                className={`ml-4 p-2 rounded-full transition-all duration-300 relative overflow-hidden ${
                  isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className={`transform transition-transform duration-500 ${isDark ? 'rotate-0' : 'rotate-180'}`}>
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </div>
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDark ? 'bg-slate-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative w-10 h-10 flex items-center justify-center"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span className={`w-full h-0.5 rounded transition-all duration-300 origin-left ${
                    isDark ? 'bg-white' : 'bg-gray-900'
                  } ${mobileMenuOpen ? 'rotate-45 translate-x-px' : ''}`}></span>
                  <span className={`w-full h-0.5 rounded transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-gray-900'
                  } ${mobileMenuOpen ? 'opacity-0 translate-x-3' : ''}`}></span>
                  <span className={`w-full h-0.5 rounded transition-all duration-300 origin-left ${
                    isDark ? 'bg-white' : 'bg-gray-900'
                  } ${mobileMenuOpen ? '-rotate-45 translate-x-px' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div className={`absolute right-0 top-0 h-full w-72 ${
          isDark ? 'bg-slate-900' : 'bg-white'
        } shadow-2xl transform transition-transform duration-500 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="pt-20 px-6 space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`block w-full text-left py-4 px-4 rounded-xl text-lg font-medium transition-all duration-300 transform ${
                  mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                } ${
                  activeSection === item
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg'
                    : isDark ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showTooltip && (
        <div className="fixed top-20 right-4 z-50 hidden md:block">
          <div className={`px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 ${
            isDark ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'
          } animate-pulse`}>
            <span className="text-2xl">👋</span>
            <span className="text-sm">使用导航菜单浏览页面！</span>
          </div>
        </div>
      )}
    </>
  );
};
