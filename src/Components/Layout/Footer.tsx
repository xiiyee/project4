import React from 'react';
import { useTheme } from '../../Store/ThemeContext';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`py-16 px-4 ${isDark ? 'bg-slate-900 border-t border-slate-800' : 'bg-gray-50 border-t border-gray-200'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="font-playball text-3xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent mb-2">
              Portfolio
            </div>
            <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              用心构建每一个项目。
            </p>
          </div>

          <div className="text-center">
            <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              © {new Date().getFullYear()} 张三. 保留所有权利.
            </p>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              使用 React & Tailwind CSS 构建 ❤️
            </p>
          </div>

          <div className="flex space-x-4">
            <a href="#" className={`p-2 rounded-lg transition-all duration-300 ${
              isDark ? 'text-gray-500 hover:text-white hover:bg-slate-800' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              隐私政策
            </a>
            <a href="#" className={`p-2 rounded-lg transition-all duration-300 ${
              isDark ? 'text-gray-500 hover:text-white hover:bg-slate-800' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              使用条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
