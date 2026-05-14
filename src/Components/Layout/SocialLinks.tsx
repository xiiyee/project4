import React from 'react';
import { useTheme } from '../../Store/ThemeContext';
import { LinkedInIcon, GitHubIcon, MailIcon, DocumentIcon } from '../Icons';

export const SocialLinks: React.FC = () => {
  const { isDark } = useTheme();

  const links = [
    { icon: <LinkedInIcon />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <GitHubIcon />, href: 'https://github.com', label: 'GitHub' },
    { icon: <MailIcon />, href: 'mailto:hello@example.com', label: 'Email' },
    { icon: <DocumentIcon />, href: '#resume', label: 'Resume' },
  ];

  return (
    <div className="fixed left-6 bottom-0 hidden xl:flex flex-col items-center z-30">
      <div className="flex flex-col space-y-5">
        {links.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
              isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            title={link.label}
          >
            <div className="transform transition-transform duration-300 group-hover:scale-110">
              {link.icon}
            </div>
          </a>
        ))}
      </div>
      <div className={`w-px h-28 mt-5 ${isDark ? 'bg-slate-600' : 'bg-gray-300'}`}></div>
    </div>
  );
};
