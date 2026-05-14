import React, { useState, useEffect } from 'react';
import { useTheme } from '../../Store/ThemeContext';
import { ChevronDownIcon } from '../Icons';

export const Home: React.FC = () => {
  const { isDark } = useTheme();
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ['全栈开发工程师', 'UI/UX 设计师', '问题解决者', '技术爱好者'];

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        if (typedText === currentWord) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentWordIndex]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${
          isDark ? 'bg-cyan-500' : 'bg-cyan-400'
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDark ? 'bg-teal-500' : 'bg-teal-400'
        }`}></div>
      </div>

      <div className="text-center px-4 z-10 max-w-4xl mx-auto">
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
            alt="头像"
            className="relative w-36 h-36 rounded-full object-cover border-4 border-white shadow-2xl"
          />
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
            <span className="text-white text-lg">✓</span>
          </div>
        </div>

        <p className={`text-lg mb-2 font-medium ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
          欢迎来到我的作品网站 👋
        </p>
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          我是 <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">张三</span>
        </h1>

        <div className="h-14 flex items-center justify-center mb-8">
          <span className={`text-xl sm:text-2xl md:text-3xl font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {typedText}
            <span className="inline-block w-0.5 h-8 bg-cyan-500 ml-1 animate-pulse"></span>
          </span>
        </div>

        <p className={`text-lg mb-10 max-w-2xl mx-auto leading-relaxed ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          热衷于创建美观、功能强大且用户友好的应用程序，为人们的生活带来积极影响。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            查看我的项目
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 transform hover:-translate-y-1 ${
              isDark 
                ? 'border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500' 
                : 'border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400'
            }`}
          >
            联系我
          </button>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
          isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        <ChevronDownIcon />
      </button>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className={`w-full h-20 ${isDark ? 'text-slate-900' : 'text-gray-50'}`}>
          <path
            fill="currentColor"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};
