
import React, { useState } from 'react';

const Icon = ({ children }) => (
  <span style={{ marginRight: '5px', display: 'inline-block', width: '16px', height: '16px', textAlign: 'center' }}>
    {children}
  </span>
);

const JavaProjectDisplay = ({ project }) => {
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [copied, setCopied] = useState(false);

  // 增强的错误检查
  if (!project) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ff0000', borderRadius: '4px', backgroundColor: '#ffeeee' }}>
        <h3 style={{ color: '#ff0000' }}>Error: Project data is missing</h3>
        <p>The project prop is undefined or null. Please ensure you are passing valid project data to the JavaProjectDisplay component.</p>
      </div>
    );
  }

  if (typeof project !== 'object' || Array.isArray(project)) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ff0000', borderRadius: '4px', backgroundColor: '#ffeeee' }}>
        <h3 style={{ color: '#ff0000' }}>Error: Invalid project data</h3>
        <p>The project prop must be an object. Received: {typeof project}</p>
        <pre>{JSON.stringify(project, null, 2)}</pre>
      </div>
    );
  }

  const toggleFolder = (path) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const selectFile = (file) => {
    setSelectedFile(file);
  };

  const renderTree = (item, path = '') => {
    if (!item || typeof item !== 'object' || !item.name) {
      console.warn('Invalid item in project tree:', item);
      return null;
    }

    const currentPath = `${path}/${item.name}`;
    if (item.type === 'folder') {
      const isExpanded = expandedFolders[currentPath];
      return (
        <div key={currentPath}>
          <div 
            style={{ cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
            onClick={() => toggleFolder(currentPath)}
          >
            <Icon>{isExpanded ? '▼' : '▶'}</Icon>
            <Icon>📁</Icon>
            <span>{item.name}</span>
          </div>
          {isExpanded && item.children && Array.isArray(item.children) && (
            <div style={{ marginLeft: '20px' }}>
              {item.children.map((child, index) => renderTree(child, currentPath))}
            </div>
          )}
        </div>
      );
    } else if (item.type === 'file') {
      return (
        <div 
          key={currentPath}
          style={{ cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          onClick={() => selectFile(item)}
        >
          <Icon>📄</Icon>
          <span>{item.name}</span>
        </div>
      );
    }
    return null;
  };

  const copyToClipboard = () => {
    if (selectedFile && selectedFile.content) {
      navigator.clipboard.writeText(selectedFile.content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', fontWeight: 'bold' }}>
        Java Project: {project.name || 'Unnamed Project'}
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px', height: '500px', overflowY: 'auto' }}>
          {renderTree(project)}
        </div>
        <div style={{ width: '70%', height: '500px', overflow: 'auto' }}>
          {selectedFile ? (
            <>
              <div style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{selectedFile.name}</span>
                <button onClick={copyToClipboard} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre style={{ margin: 0, padding: '10px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {selectedFile.content || 'No content available'}
              </pre>
            </>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
              Select a file to view its content
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JavaProjectDisplay;
