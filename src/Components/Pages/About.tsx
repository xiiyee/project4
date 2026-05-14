import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../Store/ThemeContext';

export const About: React.FC = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`min-h-screen py-24 px-4 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          关于 <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">我</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`relative transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl transform rotate-3"></div>
            <img
              src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&q=80&w=500&h=600"
              alt="关于我"
              className="relative rounded-2xl shadow-2xl w-full object-cover"
            />
          </div>

          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              一位充满激情的开发者，来自北京
            </h3>
            <p className={`text-lg mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              我是一名全栈开发工程师，拥有 5 年以上构建现代 Web 应用程序的经验。
              我专注于 React、Node.js 和云技术。当我不编码时，您可以发现我正在探索新技术、
              为开源项目做贡献，或者享受户外冒险。
            </p>
            <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              我相信编写干净、可维护的代码，并创建解决实际问题的直观用户体验。
              让我们一起合作，将您的想法变为现实！
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '姓名', value: '张三' },
                { label: '邮箱', value: 'zhangsan@example.com' },
                { label: '位置', value: '北京，中国' },
                { label: '经验', value: '5+ 年' },
              ].map((info) => (
                <div
                  key={info.label}
                  className={`p-4 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}
                >
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{info.label}</p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{info.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
