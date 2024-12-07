import Section from '../../structure/section';
import Container from '../../structure/container';
import Sidebar from './Sidebar';
import styles from './Docs.module.scss';

export default function DocumentationPage() {
  const sections = [
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'what-is-staking', title: 'What Is Staking?' },
    {
      id: 'technical-solana',
      title: 'How Staking Works on Solana',
      subsections: [
        { id: 'Validators-and-Delegators', title: '• Validators and Delegators' },
        { id: 'How-Delegation-Works', title: '• How Delegation Works' },
        { id: 'Earning-Rewards', title: '• Earning Rewards' },
        { id: 'How-Delegation-Works', title: '• How Delegation Works' },
        { id: 'How-Delegation-Works', title: '• How Delegation Works' },
        { id: 'How-Delegation-Works', title: '• How Delegation Works' },
        { id: 'How-Delegation-Works', title: '• How Delegation Works' },
        { id: 'How-Delegation-Works', title: '• How Delegation Works' },
        { id: 'Tech-Summary', title: '• How Delegation Works' },
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
              <p>Welcome to Liquified Capital! This guide will help you understand what staking on Solana is and how Liquified Capital simplifies the process, empowering you to earn rewards while contributing to the security and efficiency of the Solana blockchain.</p>
            </section>
            <section id="what-is-staking">
              <h2>What Is Staking?</h2>
              <p>Welcome to Liquified Capital! This guide will help you understand what staking on Solana is and how Liquified Capital simplifies the process, empowering you to earn rewards while contributing to the security and efficiency of the Solana blockchain.</p>
            </section>


            <section id="technical-solana" style={{ marginBottom: '20px' }}>
              <h2>How Staking Works on Solana</h2>
              <p>Staking on Solana involves delegating your SOL tokens to validators who perform critical functions to secure and operate the blockchain. This process is integral to Solana&apos;s high-performance, Proof-of-Stake (PoS) mechanism, which is augmented by a unique innovation called Proof of History (PoH). Here&apos;s an in-depth look at how staking works:</p>
              <div id="Validators-and-Delegators" style={{ marginBottom: '20px' }}>
                <h3>Validators and Delegators</h3>
                <p2>Validators: Validators are specialized nodes responsible for processing transactions, producing new blocks, and verifying the chain&aposs integrity. They maintain the blockchain by running high-performance servers capable of handling Solana&apos;s throughput.
                Delegators: Delegators are SOL token holders who choose to support specific validators by &quot;delegating&quot; their tokens. Delegators are not giving up ownership of their tokens but instead trust validators to act in their interest.</p2>
              </div>
              <div id="How-Delegation-Works" style={{ marginBottom: '20px' }}>
                <h3>How Delegation Works</h3>
                <p>When you delegate your SOL tokens:
Stake Account Creation: A dedicated &quot;stake account&quot; is created on the blockchain, containing your delegated tokens and metadata (e.g., validator details, rewards history).
Bonding Period: Once delegated, there&aposs a brief activation period (typically one epoch, about 2-3 days) before your stake becomes active and starts earning rewards.
Delegation to Validators: Your tokens are associated with a validator but are never moved from your wallet to theirs. Validators cannot access or misuse your staked tokens.</p>
              </div>
              <div id="Earning-Rewards" style={{ marginBottom: '20px' }}>
                <h3>Earning Rewards</h3>
                <p>Reward Distribution: Validators receive rewards for producing and confirming blocks. These rewards are proportional to their total stake (including both their own and delegated SOL). Validators share these rewards with their delegators after deducting a fee.
Fee Structure: Validators charge a commission fee (a small percentage of the rewards) for their services. When choosing a validator, consider factors like performance, uptime, and commission rate.
</p>
              </div>
              <div id="">
                <h3></h3>
                <p></p>
              </div>
              <div id="">
                <h3></h3>
                <p></p>
              </div>
              <div id="">
                <h3></h3>
                <p></p>
              </div>
            </section>
            <section id="usage">
              <h2>Usage</h2>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
              <p>Learn how to use...</p>
            </section>
          </Container>
        </main>
      </div>
    </Section>
  );
}