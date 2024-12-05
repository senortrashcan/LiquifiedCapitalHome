import React from 'react';
import styles from './Sidebar.module.scss';

export default function Sidebar({ sections }) {
  const handleSmoothScroll = (e) => {
    e.preventDefault(); // Prevent the default link behavior

    const targetId = e.target.getAttribute('href').slice(1); // Extract the ID from href
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0; // Adjust for navbar height
      const extraPadding = 20; // Add extra padding above the section
      const targetPosition = targetElement.offsetTop - navbarHeight - extraPadding;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth', // Smooth scrolling effect
      });
    }
  };

  return (
    <nav className={styles.sidebar}>
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
  );
}
