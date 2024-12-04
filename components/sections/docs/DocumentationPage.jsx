import Section from '../structure/section';
import Container from '../structure/container';
import Sidebar from './Sidebar';
import styles from './Docs.module.scss';

export default function DocumentationPage() {
  const sections = [
    { id: 'getting-started', title: 'Getting Started' },
    {
      id: 'installation',
      title: 'Installation',
      subsections: [
        { id: 'step-1', title: 'Step 1: Download' },
        { id: 'step-2', title: 'Step 2: Install' },
      ],
    },
    { id: 'usage', title: 'Usage' },
  ];

  return (
    <Section>
      <div className={styles.layout}>
        <Sidebar sections={sections} />
        <main className={styles.content}>
          <Container>
            <section id="getting-started">
              <h2>Getting Started</h2>
              <p>Welcome to the documentation! Here&apos;s how to get started...</p>
            </section>
            <section id="installation">
              <h2>Installation</h2>
              <p>Follow these steps to install...</p>
              <div id="step-1">
                <h3>Step 1: Download</h3>
                <p>Details for step 1...</p>
              </div>
              <div id="step-2">
                <h3>Step 2: Install</h3>
                <p>Details for step 2...</p>
              </div>
            </section>
            <section id="usage">
              <h2>Usage</h2>
              <p>Learn how to use...</p>
            </section>
          </Container>
        </main>
      </div>
    </Section>
  );
}