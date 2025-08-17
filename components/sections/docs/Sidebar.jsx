import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.scss';

export default function Sidebar({ sections }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const extraPadding = 75;
      const targetPosition = targetElement.offsetTop - navbarHeight - extraPadding;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      setIsOpen(false);
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      // Get all section elements
      const sectionElements = sections.flatMap(section => {
        const elements = [{ id: section.id, element: document.getElementById(section.id) }];
        if (section.subsections) {
          elements.push(...section.subsections.map(sub => ({
            id: sub.id,
            element: document.getElementById(sub.id)
          })));
        }
        return elements;
      }).filter(item => item.element);

      // Find the current active section
      let currentActive = '';
      for (const { id, element } of sectionElements) {
        if (element.offsetTop <= scrollPosition) {
          currentActive = id;
        } else {
          break;
        }
      }
      
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <>
      {/* Toggle Button (Only visible on mobile) */}
      <button
        className={styles.menuButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle documentation menu"
      >
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Sidebar */}
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h3>📚 Contents</h3>
        </div>
        <ul className={styles.mainList}>
          {sections.map((section, index) => (
            <li key={index} className={styles.mainItem}>
              <a 
                href={`#${section.id}`} 
                onClick={handleSmoothScroll}
                className={activeSection === section.id ? styles.active : ''}
              >
                {section.title}
              </a>
              {section.subsections && (
                <ul className={styles.subList}>
                  {section.subsections.map((sub, subIndex) => (
                    <li key={subIndex} className={styles.subItem}>
                      <a 
                        href={`#${sub.id}`} 
                        onClick={handleSmoothScroll}
                        className={activeSection === sub.id ? styles.active : ''}
                      >
                        {sub.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        
        <div className={styles.sidebarFooter}>
          <div className={styles.progressIndicator}>
            <div className={styles.progressText}>Reading Progress</div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay (for mobile) */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
