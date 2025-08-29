import { useState, useEffect } from 'react';
import Section from '../../structure/section';
import Container from '../../structure/container';
import Sidebar from './Sidebar';
import styles from './Docs.module.scss';
import navbarStyles from '../../../styles/structure/navbar.module.scss';
import button 		from '../../../styles/blocks/button.module.scss';

export default function DocumentationPage() {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  // Track navbar visibility state
  useEffect(() => {
    const observeNavbar = () => {
      const navbar = document.querySelector('#Navbar');
      if (!navbar) return;

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const isHidden = navbar.classList.contains(navbarStyles.hidden);
            setIsNavbarHidden(isHidden);
          }
        });
      });

      observer.observe(navbar, {
        attributes: true,
        attributeFilter: ['class']
      });

      const initiallyHidden = navbar.classList.contains(navbarStyles.hidden);
      setIsNavbarHidden(initiallyHidden);

      return () => observer.disconnect();
    };

    const checkNavbar = () => {
      const navbar = document.querySelector('#Navbar');
      if (navbar) {
        return observeNavbar();
      } else {
        setTimeout(checkNavbar, 100);
      }
    };

    const cleanup = checkNavbar();
    return cleanup;
  }, []);

  const sections = [
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'what-is-staking', title: 'What Is Staking?' },
    {
      id: 'technical-solana', title: 'How Staking Works on Solana',
      subsections: [
        { id: 'validators-and-delegators', title: '1. Validators and Delegators' },
        { id: 'how-delegation-works', title: '2. How Delegation Works' },
        { id: 'earning-rewards', title: '3. Earning Rewards' },
        { id: 'validator-performance', title: '4. Validator Performance' },
        { id: 'unstaking-and-deactivation', title: '5. Unstaking and Deactivation' },
        { id: 'pos', title: '6. Proof of Stake and Proof of History' },
        { id: 'slashing-risks', title: '7. Slashing Risks' },
        { id: 'key-technical', title: '8. Key Technical Metrics to Monitor' },
      ],
    },
    { id: 'summary', title: 'Summary' },
  ];

  return (
    <Section>
      <div className={`${styles.layout} ${isNavbarHidden ? styles.navbarHidden : ''}`}>
        <Sidebar sections={sections} />
        <main className={styles.content}>
          <Container>
            <div className={styles.hero}>
              <h1 className={styles.title}>Solana Staking Documentation</h1>
              <p className={styles.subtitle}>
                Your comprehensive guide to understanding and participating in Solana staking with Liquified Capital
              </p>
            </div>

            <section id="getting-started" className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>🚀 Getting Started</h2>
              </div>
              <div className={styles.card}>
                <p>
                  Welcome to <strong>Liquified Capital</strong>! This guide will help you understand what staking on Solana is and how Liquified Capital simplifies the process, empowering you to earn rewards while contributing to the security and efficiency of the Solana blockchain.
                </p>
                <div className={styles.highlight}>
                  <strong>💡 Quick Start:</strong> New to staking? Start here to learn the fundamentals before diving into the technical details.
                </div>
              </div>
            </section>

            <section id="what-is-staking" className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>❓ What Is Staking?</h2>
              </div>
              <div className={styles.card}>
                <p>
                  <strong>Staking</strong> is the process of participating in network validation by locking up your cryptocurrency tokens to support blockchain operations. On Solana, staking involves delegating your SOL tokens to validators who secure the network and process transactions.
                </p>
                <div className={styles.benefitsList}>
                  <h4>Key Benefits:</h4>
                  <ul>
                    <li><strong>Earn Rewards:</strong> Generate passive income from your SOL holdings</li>
                    <li><strong>Network Security:</strong> Help secure the Solana blockchain</li>
                    <li><strong>No Lock-up:</strong> Your tokens remain in your control</li>
                    <li><strong>Compound Growth:</strong> Rewards can be automatically restaked</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="technical-solana" className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>⚙️ How Staking Works on Solana</h2>
              </div>
              <div className={styles.card}>
                <p>
                  Staking on Solana involves delegating your SOL tokens to validators who perform critical functions to secure and operate the blockchain. This process is integral to Solana&aposs high-performance, Proof-of-Stake (PoS) mechanism, which is augmented by a unique innovation called Proof of History (PoH).
                </p>
              </div>

              <div id="validators-and-delegators" className={styles.subsection}>
                <h3>1. Validators and Delegators</h3>
                <div className={styles.card}>
                  <div className={styles.definitionGrid}>
                    <div className={styles.definition}>
                      <h4>🖥️ Validators</h4>
                      <p>
                        Validators are specialized nodes responsible for processing transactions, producing new blocks, and verifying the chain&aposs integrity. They maintain the blockchain by running high-performance servers capable of handling Solana&aposs throughput.
                      </p>
                    </div>
                    <div className={styles.definition}>
                      <h4>👥 Delegators</h4>
                      <p>
                        Delegators are SOL token holders who choose to support specific validators by &quotdelegating&quot their tokens. Delegators are not giving up ownership of their tokens but instead trust validators to act in their interest.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="how-delegation-works" className={styles.subsection}>
                <h3>2. How Delegation Works</h3>
                <div className={styles.card}>
                  <p>When you delegate your SOL tokens:</p>
                  <div className={styles.stepsList}>
                    <div className={styles.step}>
                      <span className={styles.stepNumber}>1</span>
                      <div>
                        <strong>Stake Account Creation:</strong> A dedicated &quotstake account&quot is created on the blockchain, containing your delegated tokens and metadata (e.g., validator details, rewards history).
                      </div>
                    </div>
                    <div className={styles.step}>
                      <span className={styles.stepNumber}>2</span>
                      <div>
                        <strong>Bonding Period:</strong> Once delegated, there&aposs a brief activation period (typically one epoch, about 2-3 days) before your stake becomes active and starts earning rewards.
                      </div>
                    </div>
                    <div className={styles.step}>
                      <span className={styles.stepNumber}>3</span>
                      <div>
                        <strong>Delegation to Validators:</strong> Your tokens are associated with a validator but are never moved from your wallet to theirs. Validators cannot access or misuse your staked tokens.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="earning-rewards" className={styles.subsection}>
                <h3>3. Earning Rewards</h3>
                <div className={styles.card}>
                  <div className={styles.rewardInfo}>
                    <div className={styles.rewardItem}>
                      <strong>💰 Reward Distribution:</strong> Validators receive rewards for producing and confirming blocks. These rewards are proportional to their total stake (including both their own and delegated SOL). Validators share these rewards with their delegators after deducting a fee.
                    </div>
                    <div className={styles.rewardItem}>
                      <strong>💳 Fee Structure:</strong> Validators charge a commission fee (a small percentage of the rewards) for their services. When choosing a validator, consider factors like performance, uptime, and commission rate.
                    </div>
                  </div>
                </div>
              </div>

              <div id="validator-performance" className={styles.subsection}>
                <h3>4. Validator Performance</h3>
                <div className={styles.card}>
                  <p>The rewards you earn depend heavily on your validator&aposs performance:</p>
                  <div className={styles.performanceMetrics}>
                    <div className={styles.metric}>
                      <strong>⏰ Uptime:</strong> Validators must remain online and operational to produce and validate blocks. Frequent downtime reduces rewards.
                    </div>
                    <div className={styles.metric}>
                      <strong>🗳️ Vote Credits:</strong> Solana tracks how many blocks a validator has successfully voted on. Validators with higher vote credits are considered more reliable and are rewarded accordingly.
                    </div>
                  </div>
                </div>
              </div>

              <div id="unstaking-and-deactivation" className={styles.subsection}>
                <h3>5. Unstaking and Deactivation</h3>
                <div className={styles.card}>
                  <div className={styles.unstakingInfo}>
                    <div className={styles.unstakingItem}>
                      <strong>⏸️ Deactivating Stake:</strong> If you choose to stop staking, you can deactivate your stake account. Your tokens enter a &quotcooldown period,&quot typically lasting one epoch, before becoming fully accessible.
                    </div>
                    <div className={styles.unstakingItem}>
                      <strong>🔄 Unstaking Flexibility:</strong> Solana allows you to redelegate your stake to another validator at any time without withdrawing your tokens entirely.
                    </div>
                  </div>
                </div>
              </div>

              <div id="pos" className={styles.subsection}>
                <h3>6. Proof of Stake and Proof of History</h3>
                <div className={styles.card}>
                  <div className={styles.consensusInfo}>
                    <div className={styles.consensusItem}>
                      <strong>🔗 Proof of Stake (PoS):</strong> Staking on Solana follows a PoS model, where validators are selected to produce blocks based on the size of their total stake.
                    </div>
                    <div className={styles.consensusItem}>
                      <strong>⏱️ Proof of History (PoH):</strong> Solana&aposs PoH acts as a cryptographic timestamp that orders transactions and ensures consensus. This allows the network to process transactions asynchronously, significantly increasing throughput.
                    </div>
                  </div>
                </div>
              </div>

              <div id="slashing-risks" className={styles.subsection}>
                <h3>7. Slashing Risks</h3>
                <div className={styles.card}>
                  <div className={styles.safetyNotice}>
                    <strong>✅ Good News:</strong> Unlike some PoS networks, <strong>Solana does not currently implement slashing</strong> (a penalty where staked tokens are partially confiscated for validator misbehavior). However, choosing a reliable validator (Liquified Capital) remains crucial since poor performance directly impacts your staking rewards.
                  </div>
                </div>
              </div>

              <div id="key-technical" className={styles.subsection}>
                <h3>8. Key Technical Metrics to Monitor</h3>
                <div className={styles.card}>
                  <p>When staking on Solana, keep an eye on the following validator metrics:</p>
                  <div className={styles.metricsList}>
                    <div className={styles.metricItem}>
                      <strong>📊 Commission Rate:</strong> The percentage of rewards kept by the validator.
                    </div>
                    <div className={styles.metricItem}>
                      <strong>📈 Performance History:</strong> Validator reliability and uptime over time.
                    </div>
                    <div className={styles.metricItem}>
                      <strong>⚖️ Stake Weight:</strong> The total amount of SOL delegated to a validator, influencing its chances of being selected to produce blocks.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="summary" className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>📋 Summary</h2>
              </div>
              <div className={styles.card}>
                <p>
                  By staking your SOL tokens, you actively contribute to Solana&aposs scalability and security while earning rewards. Solana&aposs staking mechanism is designed to balance decentralization, performance, and accessibility, ensuring a smooth and rewarding experience for delegators.
                </p>
                <p>
                  Through <strong>Liquified Capital</strong>, we simplify this process and provide the tools you need to stake with confidence.
                </p>
                <div className={styles.ctaSection}>
                  <p><strong>Ready to start staking?</strong></p>
                  <p className={styles.ctaSubtext}>Happy Staking! 🎉</p>
                </div>
              </div>
            </section>
          </Container>
        </main>
      </div>
    </Section>
  );
}
