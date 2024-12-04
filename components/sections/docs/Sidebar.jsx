import React from 'react';
import styles from './Sidebar.module.scss';

export default function Sidebar({ sections }) {
  return (
    <nav className={styles.sidebar}>
      <ul>
        {sections.map((section, index) => (
          <li key={index}>
            <a href={`#${section.id}`}>{section.title}</a>
            {section.subsections && (
              <ul>
                {section.subsections.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <a href={`#${sub.id}`}>{sub.title}</a>
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