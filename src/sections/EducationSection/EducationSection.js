import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './EducationSection.css';

function EducationSection() {
  const { lang } = useLanguage();

  return (
    <section id="education" className="section education-bg">
      <h2>{lang === 'zh' ? '教育经历' : 'Education'}</h2>
      <div className="exp-list">
        {/* Education */}
        <div className="exp-row">
          <div className="exp-left">
            <div className="exp-title-row">
              <img className="exp-icon" src="/assets/images/校徽.webp" alt="大学校徽" />
              <span className="exp-title">{lang === 'zh' ? 'xx大学' : 'xxx University'}</span>
            </div>
            <div className="exp-type-row">
              <span className="exp-type">{lang === 'zh' ? '本科学历' : "Bachelor's Degree"}</span>
            </div>
            <div className="exp-info-row">
              <span className="exp-identity">{lang === 'zh' ? '生物医学工程' : 'Biomedical Engineering'}</span>
              <span className="exp-time">2019.9-2023.6</span>
            </div>
          </div>
          <div className="exp-right">
            <div className="exp-desc">
              {lang === 'zh' 
                ? '主修课程：\n●  信号与系统、数字信号处理、数字图像处理\n●  随机信号分析、数据结构与算法设计\n●  机器学习理论和实践、人工智能导论\n●  生物医学信号处理、医学图像处理\n●  生物统计学、医学电子学基础'
                : 'Major Courses:\n●  Signal and System, Digital Signal Processing\n●  Digital Image Processing, Random Signal Analysis\n●  Data Structure and Algorithm Design\n●  Machine Learning Theory and Practice\n●  Biomedical Signal Processing, Medical Electronics'
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
