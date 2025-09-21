import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './WorkSection.css';

function WorkSection() {
  const { lang } = useLanguage();

  return (
    <section id="work" className="section work-bg">
      <h2>{lang === 'zh' ? '工作经历' : 'Work Experience'}</h2>
      <div className="exp-list">
        {/* Internship */}
        <div className="exp-row">
          <div className="exp-left">
            <div className="exp-title-row">
              <img className="exp-icon" src="/assets/images/京东健康.webp" alt="京东健康" />
              <span className="exp-title">{lang === 'zh' ? '京东健康' : 'JD Health'}</span>
            </div>
            <div className="exp-type-row">
              <span className="exp-type">{lang === 'zh' ? '实习生' : 'Internship'}</span>
            </div>
            <div className="exp-info-row">
              <span className="exp-identity">{lang === 'zh' ? '测试开发工程师' : 'Test Development Engineer'}</span>
              <span className="exp-time">2022.10-2023.4</span>
            </div>
          </div>
          <div className="exp-right">
            <div className="exp-desc">
              {lang === 'zh' 
                ? '主要职责：\n●  负责产品的Web端、移动端、小程序的功能测试、接口测试、性能测试、兼容性测试、弱网测试、线上监控等\n●  独立完成分配的测试工作，确保20+个产品顺利上线\n●  参与测试流程优化，提升团队测试效率15%'
                : 'Responsibilities:\n●  Conducted functional, API, performance, compatibility, low-network, and production monitoring tests for web, mobile, and mini-program products\n●  Independently managed testing for 20+ product launches\n●  Participated in test process optimization, improving team efficiency by 15%'
              }
            </div>
          </div>
        </div>
        
        {/* Full-time */}
        <div className="exp-row">
          <div className="exp-left">
            <div className="exp-title-row">
              <img className="exp-icon" src="/assets/images/准动.jpg" alt="准动网络" />
              <span className="exp-title">{lang === 'zh' ? '准动网络' : 'Zhundong Network'}</span>
            </div>
            <div className="exp-type-row">
              <span className="exp-type">{lang === 'zh' ? '全职员工' : 'Full-time'}</span>
            </div>
            <div className="exp-info-row">
              <span className="exp-identity">{lang === 'zh' ? '测试工程师' : 'Test Engineer'}</span>
              <span className="exp-time">2023.11-2025.5</span>
            </div>
          </div>
          <div className="exp-right">
            <div className="exp-desc">
              {lang === 'zh' 
                ? '主要职责：\n●  负责易宝客户端、web端的接口测试、功能测试等\n●  在单接口自动化的基础上实现场景自动化，提高测试效率以及业务测试用例覆盖率\n●  根据抓包结果以及后端日志辅助定位缺陷产生原因\n●  累计跟进测试项目30+，缺陷发现率提升25%'
                : 'Responsibilities:\n●  Developed scenario-based automation on top of single-interface automation to improve testing efficiency and business test coverage for Yibao client and web platforms\n●  Analyzed packet capture results and backend logs to identify root causes of defects\n●  Supported 30+ test projects with 25% improvement in defect detection rate'
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkSection;
