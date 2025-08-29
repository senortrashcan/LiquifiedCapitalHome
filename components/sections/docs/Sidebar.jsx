import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Sidebar.module.scss';
import navbarStyles from '../../../styles/structure/navbar.module.scss';

export default function Sidebar({ sections }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const sidebarRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  // Performance-aware smooth scroll
  const handleSmoothScroll = useCallback((e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const extraPadding = 75;
      const targetPosition = targetElement.offsetTop - navbarHeight - extraPadding;

      window.scrollTo({
        top: targetPosition,
        behavior: isLowEndDevice ? 'auto' : 'smooth', // Use instant scroll for low-end devices
      });

      setIsOpen(false);
    }
  }, [isLowEndDevice]);

  // Device capability detection
  useEffect(() => {
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const deviceMemory = navigator.deviceMemory || 2;
    setIsLowEndDevice(hardwareConcurrency < 4 || deviceMemory < 4);
  }, []);

  // Track navbar visibility state
  useEffect(() => {
    const observeNavbar = () => {
      const navbar = document.querySelector('#Navbar');
      if (!navbar) return;

      // Create a MutationObserver to watch for class changes on the navbar
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const isHidden = navbar.classList.contains(navbarStyles.hidden);
            setIsNavbarHidden(isHidden);
          }
        });
      });

      // Start observing
      observer.observe(navbar, {
        attributes: true,
        attributeFilter: ['class']
      });

      // Check initial state
      const initiallyHidden = navbar.classList.contains(navbarStyles.hidden);
      setIsNavbarHidden(initiallyHidden);

      return () => observer.disconnect();
    };

    // Wait for navbar to be available
    const checkNavbar = () => {
      const navbar = document.querySelector('#Navbar');
      if (navbar) {
        return observeNavbar();
      } else {
        // Retry after a short delay
        setTimeout(checkNavbar, 100);
      }
    };

    const cleanup = checkNavbar();
    return cleanup;
  }, []);

  // Track active section based on scroll position with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
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
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Touch handlers for mobile swipe gestures
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && isOpen) {
      setIsOpen(false);
    }
    if (isRightSwipe && !isOpen) {
      setIsOpen(true);
    }
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button (Only visible on mobile) */}
      <button
        className={`${styles.menuButton} ${isNavbarHidden ? styles.navbarHidden : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle documentation menu"
      >
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <nav
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${isNavbarHidden ? styles.navbarHidden : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
      </nav>

      {/* Overlay (for mobile) */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
