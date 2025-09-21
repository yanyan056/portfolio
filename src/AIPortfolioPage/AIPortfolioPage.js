import React, { useState, useEffect } from 'react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import { useLanguage } from '../context/LanguageContext';
import './AIPortfolioPage.css';

// 数据持久化工具函数
const STORAGE_KEY = 'ai_portfolio_projects';

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('保存数据失败:', error);
  }
};

const loadFromStorage = (key, defaultValue = []) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error('读取数据失败:', error);
    return defaultValue;
  }
};

// AI项目列表组件
const AIProjectsSection = ({ children, lang }) => (
  <section className="ai-projects-section">
    <div className="projects-header">
      <h2 className="projects-title">
        {lang === 'zh' ? '🚀 我的AI项目' : '🚀 My AI Projects'}
      </h2>
      <p className="projects-subtitle">
        {lang === 'zh' ? '探索人工智能的无限可能' : 'Exploring the infinite possibilities of artificial intelligence'}
      </p>
    </div>
    <div className="projects-content">
      {children}
    </div>
  </section>
);

// 内容卡片组件
const ContentCard = ({ image, title, description, date, github, onEdit, onDelete }) => (
  <div className="content-card">
    {image && (
      <div className="content-card-image">
        <img src={image} alt={title} />
      </div>
    )}
    <div className="content-card-body">
      {title && <h3 className="content-card-title">{title}</h3>}
      {description && <p className="content-card-description">{description}</p>}
      {github && (
        <div className="content-card-github">
          <a href={github} target="_blank" rel="noopener noreferrer" className="github-link">
            <span className="github-icon">🔗</span>
            <span>GitHub</span>
          </a>
        </div>
      )}
      {date && <span className="content-card-date">{date}</span>}
    </div>
    <div className="content-card-actions">
      <button className="content-card-edit" onClick={onEdit}>
        ✏️
      </button>
      <button className="content-card-delete" onClick={onDelete}>
        🗑️
      </button>
    </div>
  </div>
);

// 添加内容按钮组件
const AddContentButton = ({ onClick, text }) => (
  <div className="add-content-button" onClick={onClick}>
    <div className="add-content-icon">+</div>
    <span>{text}</span>
  </div>
);

// 添加/编辑内容弹窗组件
const AddContentModal = ({ isOpen, onClose, onSubmit, type, lang, editData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    github: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [imagePreview, setImagePreview] = useState('');

  // 当有编辑数据时，初始化表单
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || '',
        description: editData.description || '',
        image: editData.image || '',
        github: editData.github || '',
        date: editData.date || new Date().toISOString().split('T')[0]
      });
      if (editData.image) {
        setImagePreview(editData.image);
      }
    } else {
      setFormData({
        title: '',
        description: '',
        image: '',
        github: '',
        date: new Date().toISOString().split('T')[0]
      });
      setImagePreview('');
    }
  }, [editData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      onSubmit(formData, editData?.id);
      setFormData({ title: '', description: '', image: '', github: '', date: new Date().toISOString().split('T')[0] });
      setImagePreview('');
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        alert(lang === 'zh' ? '请选择图片文件！' : 'Please select an image file!');
        return;
      }
      
      // 验证文件大小 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(lang === 'zh' ? '图片文件不能超过5MB！' : 'Image file cannot exceed 5MB!');
        return;
      }

      // 创建FileReader来读取文件
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setFormData(prev => ({ ...prev, image: base64String }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setImagePreview('');
    // 清空文件输入框
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const getModalTitle = () => {
    const isEditing = !!editData;
    return isEditing 
      ? (lang === 'zh' ? '编辑AI项目' : 'Edit AI Project')
      : (lang === 'zh' ? '添加AI项目' : 'Add AI Project');
  };

  const getPlaceholders = () => {
    return {
      title: lang === 'zh' ? 'AI项目名称，如：智能客服工作流' : 'AI project name, e.g.: AI Customer Service Workflow',
      description: lang === 'zh' ? '项目描述、技术栈、实现功能、遇到的挑战和解决方案...' : 'Project description, tech stack, features, challenges and solutions...'
    };
  };

  if (!isOpen) return null;

  const placeholders = getPlaceholders();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{getModalTitle()}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>{lang === 'zh' ? '标题' : 'Title'} *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder={placeholders.title}
              required
            />
          </div>
          <div className="form-group">
            <label>{lang === 'zh' ? '描述' : 'Description'} *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder={placeholders.description}
              rows={4}
              required
            />
          </div>
          <div className="form-group">
            <label>{lang === 'zh' ? '图片' : 'Image'}</label>
            <div className="image-upload-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="image-upload-input"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="image-upload-label">
                <span className="upload-icon">📁</span>
                <span>{lang === 'zh' ? '选择图片文件' : 'Choose Image File'}</span>
                <span className="upload-hint">
                  {lang === 'zh' ? '支持 JPG, PNG, GIF (最大5MB)' : 'Support JPG, PNG, GIF (Max 5MB)'}
                </span>
              </label>
              
              {imagePreview && (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <button 
                    type="button" 
                    onClick={handleRemoveImage}
                    className="remove-image-btn"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>{lang === 'zh' ? 'GitHub地址' : 'GitHub URL'}</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder={lang === 'zh' ? 'https://github.com/username/project' : 'https://github.com/username/project'}
            />
          </div>
          <div className="form-group">
            <label>{lang === 'zh' ? '日期' : 'Date'}</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              {lang === 'zh' ? '取消' : 'Cancel'}
            </button>
            <button type="submit" className="btn-submit">
              {editData ? (lang === 'zh' ? '保存' : 'Save') : (lang === 'zh' ? '添加' : 'Add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function AIPortfolioPage() {
  const { lang } = useLanguage();
  
  // 弹窗状态管理
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    editData: null
  });
  
  // 默认示例数据
  const getDefaultData = () => {
    return [
      {
        id: 1,
        image: '/assets/photos/01.jpg',
        title: lang === 'zh' ? 'Coze智能客服工作流' : 'Coze AI Customer Service Workflow',
        description: lang === 'zh' ? '使用Coze平台搭建了一个智能客服系统，集成了自然语言理解、意图识别和自动回复功能，大幅提升了客户服务效率...' : 'Built an intelligent customer service system using Coze platform with NLU, intent recognition and auto-reply features...',
        github: 'https://github.com/username/coze-customer-service',
        date: '2024-01-15'
      },
      {
        id: 2,
        image: '/assets/photos/02.jpg',
        title: lang === 'zh' ? '小红书AI内容运营账号' : 'Xiaohongshu AI Content Operation Account',
        description: lang === 'zh' ? '开发了AI驱动的小红书内容创作和运营系统，自动生成高质量的图文内容，实现了账号的快速增长和用户互动...' : 'Developed an AI-driven content creation and operation system for Xiaohongshu, automatically generating high-quality posts...',
        github: 'https://github.com/username/xiaohongshu-ai-bot',
        date: '2024-02-10'
      },
      {
        id: 3,
        image: '/assets/photos/03.jpg',
        title: lang === 'zh' ? '本地RAG知识库系统' : 'Local RAG Knowledge Base System',
        description: lang === 'zh' ? '构建了基于RAG架构的本地知识库系统，支持文档向量化、语义搜索和智能问答，为企业提供了高效的知识管理解决方案...' : 'Built a local knowledge base system based on RAG architecture with document vectorization, semantic search and intelligent Q&A...',
        github: 'https://github.com/username/local-rag-system',
        date: '2024-03-05'
      },
      {
        id: 4,
        image: '/assets/photos/04.jpg',
        title: lang === 'zh' ? 'Cursor AI辅助小游戏开发' : 'Cursor AI-Assisted Game Development',
        description: lang === 'zh' ? '利用Cursor AI编程助手开发了多款小游戏，包括俄罗斯方块、贪吃蛇等经典游戏，展示了AI在代码生成和调试方面的强大能力...' : 'Developed multiple mini-games using Cursor AI programming assistant, including Tetris, Snake, demonstrating AI\'s power in code generation...',
        github: 'https://github.com/username/cursor-games',
        date: '2024-03-20'
      }
    ];
  };

  // AI项目列表状态 - 从localStorage加载或使用默认数据
  const [projects, setProjects] = useState(() => 
    loadFromStorage(STORAGE_KEY, getDefaultData())
  );
  
  // 页面加载时尝试从项目配置文件加载数据
  useEffect(() => {
    const loadProjectsFromConfig = async () => {
      try {
        // 检查localStorage是否为空或只有默认数据
        const localData = loadFromStorage(STORAGE_KEY, []);
        const hasOnlyDefaultData = localData.length <= 4; // 默认有4个示例项目
        
        if (hasOnlyDefaultData) {
          const response = await fetch('/assets/ai-projects/projects-config.json');
          if (response.ok) {
            const configData = await response.json();
            if (configData.projects && Array.isArray(configData.projects)) {
              setProjects(configData.projects);
              console.log('从项目配置文件加载了数据');
            }
          }
        }
      } catch (error) {
        console.log('项目配置文件不存在或加载失败，使用默认数据');
      }
    };
    
    loadProjectsFromConfig();
  }, []);

  // 自动保存数据到localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEY, projects);
  }, [projects]);

  const handleAddContent = () => {
    setModalState({
      isOpen: true,
      type: 'ai-project',
      editData: null
    });
  };

  const handleEditContent = (id) => {
    const itemToEdit = projects.find(item => item.id === id);
    if (itemToEdit) {
      setModalState({
        isOpen: true,
        type: 'ai-project',
        editData: itemToEdit
      });
    }
  };

  const handleDeleteContent = (id) => {
    const itemToDelete = projects.find(item => item.id === id);
    if (itemToDelete) {
      const confirmMessage = lang === 'zh' 
        ? `确定要删除项目"${itemToDelete.title}"吗？此操作无法撤销。`
        : `Are you sure you want to delete "${itemToDelete.title}"? This action cannot be undone.`;
      
      if (window.confirm(confirmMessage)) {
        setProjects(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      editData: null
    });
  };

  const handleSubmitContent = (formData, editId = null) => {
    if (editId) {
      // 编辑现有项目
      const updatedItem = {
        id: editId,
        title: formData.title,
        description: formData.description,
        image: formData.image || '/assets/photos/01.jpg',
        github: formData.github,
        date: formData.date
      };
      setProjects(prev => prev.map(item => item.id === editId ? updatedItem : item));
    } else {
      // 添加新项目
      const newItem = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        image: formData.image || '/assets/photos/01.jpg',
        github: formData.github,
        date: formData.date
      };
      setProjects(prev => [...prev, newItem]);
    }
  };

  // 数据导出功能
  const handleExportData = () => {
    try {
      const exportData = {
        projects: projects,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert(lang === 'zh' ? '数据导出成功！' : 'Data exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert(lang === 'zh' ? '导出失败，请重试' : 'Export failed, please try again');
    }
  };

  // 数据导入功能
  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        
        if (importData.projects && Array.isArray(importData.projects)) {
          const confirmMessage = lang === 'zh' 
            ? `确定要导入 ${importData.projects.length} 个项目吗？这将替换当前所有数据。`
            : `Are you sure you want to import ${importData.projects.length} projects? This will replace all current data.`;
          
          if (window.confirm(confirmMessage)) {
            setProjects(importData.projects);
            alert(lang === 'zh' ? '数据导入成功！' : 'Data imported successfully!');
          }
        } else {
          alert(lang === 'zh' ? '文件格式不正确' : 'Invalid file format');
        }
      } catch (error) {
        console.error('Import failed:', error);
        alert(lang === 'zh' ? '导入失败，文件格式错误' : 'Import failed, invalid file format');
      }
    };
    reader.readAsText(file);
    
    // 清空input值，允许重复选择同一文件
    event.target.value = '';
  };

  return (
    <div className="life-page">
      <Navbar />
      
      {/* 页面标题区域 */}
      <section className="life-hero">
        <div className="life-hero-content">
          <h1 className="life-hero-title">
            {lang === 'zh' ? 'AI作品集' : 'AI Portfolio'}
          </h1>
          <p className="life-hero-subtitle">
            {lang === 'zh' 
              ? '展示我在人工智能领域的项目经验和技术成果' 
              : 'Showcasing my project experience and technical achievements in artificial intelligence'}
          </p>
        </div>
      </section>

      {/* AI作品集内容区域 */}
      <div className="life-content">
        <AIProjectsSection lang={lang}>
          {/* 数据管理按钮 */}
          <div className="data-management">
            <button className="export-btn" onClick={handleExportData}>
              📤 {lang === 'zh' ? '导出数据' : 'Export Data'}
            </button>
            <label className="import-btn">
              📥 {lang === 'zh' ? '导入数据' : 'Import Data'}
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          
          <div className="content-grid">
            {projects.map(item => (
              <ContentCard
                key={item.id}
                {...item}
                onEdit={() => handleEditContent(item.id)}
                onDelete={() => handleDeleteContent(item.id)}
              />
            ))}
            <AddContentButton
              onClick={handleAddContent}
              text={lang === 'zh' ? '添加AI项目' : 'Add AI Project'}
            />
          </div>
        </AIProjectsSection>
      </div>
      
      {/* 添加/编辑内容弹窗 */}
      <AddContentModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitContent}
        type={modalState.type}
        lang={lang}
        editData={modalState.editData}
      />
      
      <Footer />
    </div>
  );
}

export default AIPortfolioPage;
