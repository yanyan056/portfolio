import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

function Navbar() {
  const { lang, setLang } = useLanguage();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img src="/assets/images/卡通头像.jpg" alt="logo" className="nav-logo-icon" />
          <span>{lang === 'zh' ? '主页' : 'Home'}</span>
        </Link>
        <ul className="nav-menu">
          {location.pathname === '/' ? (
            <>
              <li><a href="#education">{lang === 'zh' ? '教育经历' : 'Education'}</a></li>
              <li><a href="#work">{lang === 'zh' ? '工作经历' : 'Work'}</a></li>
              <li><a href="#skills">{lang === 'zh' ? '个人技能' : 'Skills'}</a></li>
              <li><a href="#project">{lang === 'zh' ? '项目' : 'Projects'}</a></li>
              <li><a href="#contact">{lang === 'zh' ? '联系我' : 'Contact'}</a></li>
            </>
          ) : null}
          <li><Link to="/ai-portfolio">{lang === 'zh' ? 'AI作品集' : 'AI Portfolio'}</Link></li>
        </ul>
      </div>
      <div className="nav-right">
        <button 
          className={lang === 'zh' ? 'lang-btn active' : 'lang-btn'}
          onClick={() => setLang('zh')}
        >
          中文
        </button>
        <button 
          className={lang === 'en' ? 'lang-btn active' : 'lang-btn'}
          onClick={() => setLang('en')}
        >
          EN
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 