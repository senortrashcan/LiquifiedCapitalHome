import React, { useState } from 'react';
import styles from './Sidebar.module.scss';

export default function Sidebar({ sections }) {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

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

      setIsOpen(false); // Close sidebar after clicking a link (on mobile)
    }
  };

  return (
    <>
      {/* Toggle Button (Only visible on mobile) */}
      <button
        className={styles.menuButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Sidebar */}
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <ul>
          {sections.map((section, index) => (
            <li key={index}>
              <a href={`#${section.id}`} onClick={handleSmoothScroll}>
                {section.title}
              </a>
              {section.subsections && (
                <ul>
                  {section.subsections.map((sub, subIndex) => (
                    <li key={subIndex}>
                      <a href={`#${sub.id}`} onClick={handleSmoothScroll}>
                        {sub.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay (for mobile) */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
