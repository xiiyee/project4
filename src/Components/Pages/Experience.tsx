import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../Store/ThemeContext';

export const Experience: React.FC = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const techStack = [
    { name: 'HTML', color: 'from-orange-400 to-orange-600', icon: '🌐' },
    { name: 'CSS', color: 'from-blue-400 to-blue-600', icon: '🎨' },
    { name: 'JavaScript', color: 'from-yellow-400 to-yellow-600', icon: '⚡' },
    { name: 'React', color: 'from-cyan-400 to-cyan-600', icon: '⚛️' },
    { name: 'Tailwind', color: 'from-teal-400 to-teal-600', icon: '🎯' },
    { name: 'Bootstrap', color: 'from-purple-400 to-purple-600', icon: '🅱️' },
    { name: 'Java', color: 'from-red-400 to-red-600', icon: '☕' },
    { name: 'Python', color: 'from-green-400 to-green-600', icon: '🐍' },
    { name: 'Git', color: 'from-orange-400 to-red-600', icon: '📦' },
    { name: 'GitHub', color: 'from-gray-600 to-gray-800', icon: '🐙' },
    { name: 'MySQL', color: 'from-blue-400 to-blue-700', icon: '🐬' },
    { name: 'SpringBoot', color: 'from-green-400 to-green-700', icon: '🍃' },
    { name: 'C', color: 'from-blue-500 to-blue-700', icon: '🔵' },
    { name: 'C++', color: 'from-blue-400 to-blue-800', icon: '🔷' },
    { name: 'PostgreSQL', color: 'from-blue-500 to-blue-900', icon: '🐘' },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`min-h-screen py-24 px-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          技术 <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">栈</span>
        </h2>
        <p className={`text-center mb-16 max-w-2xl mx-auto ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          这里是我用于创建出色数字体验的技术和工具。
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              className={`group relative p-6 rounded-2xl text-center transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                isDark ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-gray-50 hover:bg-white hover:shadow-2xl'
              } ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                {tech.icon}
              </div>
              <p className={`font-semibold text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
