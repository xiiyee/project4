import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../Store/ThemeContext';
import { CodeIcon, ExternalLinkIcon } from '../Icons';

export const Projects: React.FC = () => {
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

  const projects = [
    {
      title: '电商平台',
      description: '使用 React、Node.js 和 MongoDB 构建的功能齐全的在线购物平台。',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600&h=400',
      codeLink: 'https://github.com',
      demoLink: 'https://demo.com',
      tags: ['React', 'Node.js', 'MongoDB'],
    },
    {
      title: '任务管理应用',
      description: '具有拖放功能的现代任务跟踪应用程序。',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600&h=400',
      codeLink: 'https://github.com',
      demoLink: 'https://demo.com',
      tags: ['React', 'Firebase', 'Tailwind'],
    },
    {
      title: '天气仪表板',
      description: '具有美观可视化效果的实时天气预测应用程序。',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=600&h=400',
      codeLink: 'https://github.com',
      demoLink: 'https://demo.com',
      tags: ['JavaScript', 'API', 'CSS'],
    },
    {
      title: '博客平台',
      description: '具有 CMS 集成的现代博客平台，美观且响应式。',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600&h=400',
      codeLink: 'https://github.com',
      demoLink: 'https://demo.com',
      tags: ['Next.js', 'Prisma', 'PostgreSQL'],
    },
    {
      title: '健身追踪器',
      description: '全面的健身应用程序，用于跟踪锻炼和营养。',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600&h=400',
      codeLink: 'https://github.com',
      demoLink: 'https://demo.com',
      tags: ['React Native', 'Firebase'],
    },
    {
      title: '房地产网站',
      description: '具有房源展示和联系表单的房产列表网站。',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600&h=400',
      codeLink: 'https://github.com',
      demoLink: 'https://demo.com',
      tags: ['React', 'Spring Boot', 'MySQL'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`min-h-screen py-24 px-4 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          精选 <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">项目</span>
        </h2>
        <p className={`text-center mb-16 max-w-2xl mx-auto ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          选择我最近的一些工作和个人项目。
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                isDark ? 'bg-slate-800' : 'bg-white'
              } ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-end pb-6">
                  <div className="flex space-x-4">
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-slate-900 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                    >
                      <CodeIcon />
                      <span>代码</span>
                    </a>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-medium flex items-center space-x-2 hover:from-cyan-600 hover:to-teal-600 transition-colors"
                    >
                      <ExternalLinkIcon />
                      <span>演示</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                <p className={`mb-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-xs rounded-full ${
                        isDark ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
