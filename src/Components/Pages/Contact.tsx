import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../Store/ThemeContext';
import { LinkedInIcon, GitHubIcon, MailIcon } from '../Icons';

export const Contact: React.FC = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setSubmitStatus('idle'), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`min-h-screen py-24 px-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          与我 <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">联系</span>
        </h2>
        <p className={`text-center mb-16 max-w-2xl mx-auto ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          有项目想法？让我们一起努力，创造一些令人惊叹的东西。
        </p>

        <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`p-8 rounded-2xl ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              让我们聊聊您的项目
            </h3>
            <p className={`mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              我始终愿意讨论新项目、创意想法，
              或成为您愿景的一部分的机会。
            </p>

            <div className="space-y-6">
              {[
                { icon: '📧', label: '邮箱', value: 'zhangsan@example.com' },
                { icon: '📱', label: '电话', value: '+86 138 0013 8000' },
                { icon: '📍', label: '位置', value: '北京，中国' },
              ].map((item) => (
                <div key={item.label} className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-2xl shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.label}</p>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>在社交媒体上关注我</p>
              <div className="flex space-x-4">
                {[
                  { icon: <LinkedInIcon />, href: '#' },
                  { icon: <GitHubIcon />, href: '#' },
                  { icon: <MailIcon />, href: '#' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      isDark 
                        ? 'bg-slate-600 text-gray-300 hover:bg-slate-500 hover:text-white' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'
                    }`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                您的姓名
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-500'
                }`}
                placeholder="张三"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                您的邮箱
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-500'
                }`}
                placeholder="zhangsan@example.com"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                您的消息
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 resize-none focus:outline-none focus:ring-0 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-500'
                }`}
                placeholder="告诉我您的项目..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  发送中...
                </span>
              ) : '发送消息'}
            </button>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-500 text-center">
                🎉 消息发送成功！我会尽快回复您。
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
