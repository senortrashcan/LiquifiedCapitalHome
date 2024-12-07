import Section from '../../structure/section';
import Container from '../../structure/container';
import Sidebar from './Sidebar';
import styles from './Docs.module.scss';

export default function DocumentationPage() {
  const sections = [
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'what-is-staking', title: 'What Is Staking?' },
    {
      id: 'technical-solana', title: 'How Staking Works on Solana',
      subsections: [
        { id: 'Validators-and-Delegators', title: '1. Validators and Delegators' },
        { id: 'How-Delegation-Works', title: '2. How Delegation Works' },
        { id: 'Earning-Rewards', title: '3. Earning Rewards' },
        { id: 'Validator-Performance', title: '4. Validator Performance' },
        { id: 'Unstaking-and-Deactivation', title: '5. Unstaking and Deactivation' },
        { id: 'pos', title: '6. Proof of Stake and Proof of History' },
        { id: 'slashing-risks', title: '7. Slashing Risks' },
        { id: 'Key-Technical', title: '8. Key Technical Metrics to Monitor' },
      ],
    },
    { id: 'Summary', title: 'Summary' },
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
              <div id="Validators-and-Delegators" style={{ marginTop: '20px', marginBottom: '20px' }}>
                <h3>1. Validators and Delegators</h3>
                <p2>
                <b>• Validators:</b> Validators are specialized nodes responsible for processing transactions, producing new blocks, and verifying the chain&apos;s integrity. They maintain the blockchain by running high-performance servers capable of handling Solana&apos;s throughput.<br />
                <b>• Delegators:</b> Delegators are SOL token holders who choose to support specific validators by &quot;delegating&quot; their tokens. Delegators are not giving up ownership of their tokens but instead trust validators to act in their interest.<br />
                </p2>
              </div>
              <div id="How-Delegation-Works" style={{ marginBottom: '20px' }}>
                <h3>2. How Delegation Works</h3>
                <p>When you delegate your SOL tokens:<br />
                <b>• Stake Account Creation:</b> A dedicated &quot;stake account&quot; is created on the blockchain, containing your delegated tokens and metadata (e.g., validator details, rewards history).<br />
                <b>• Bonding Period:</b> Once delegated, there&aposs a brief activation period (typically one epoch, about 2-3 days) before your stake becomes active and starts earning rewards.<br />
                <b>• Delegation to Validators:</b> Your tokens are associated with a validator but are never moved from your wallet to theirs. Validators cannot access or misuse your staked tokens.<br />
                </p>
              </div>
              <div id="Earning-Rewards" style={{ marginBottom: '20px' }}>
                <h3>3. Earning Rewards</h3>
                <p>
                <b>• Reward Distribution:</b> Validators receive rewards for producing and confirming blocks. These rewards are proportional to their total stake (including both their own and delegated SOL). Validators share these rewards with their delegators after deducting a fee.<br />
                <b>• Fee Structure:</b> Validators charge a commission fee (a small percentage of the rewards) for their services. When choosing a validator, consider factors like performance, uptime, and commission rate.<br />
                </p>
              </div>
              <div id="Validator-Performance" style={{ marginBottom: '20px' }}>
                <h3>4. Validator Performance</h3>
                <p>
                The rewards you earn depend heavily on your validator’s performance:<br />
                <b>• Uptime:</b> Validators must remain online and operational to produce and validate blocks. Frequent downtime reduces rewards.<br />
                <b>• Vote Credits:</b> Solana tracks how many blocks a validator has successfully voted on. Validators with higher vote credits are considered more reliable and are rewarded accordingly.<br />
                </p>
              </div>
              <div id="Unstaking-and-Deactivation" style={{ marginBottom: '20px' }}>
                <h3>5. Unstaking and Deactivation</h3>
                <p>
                <strong>• Deactivating Stake:</strong> If you choose to stop staking, you can deactivate your stake account. Your tokens enter a &quot;cooldown period,&quot; typically lasting one epoch, before becoming fully accessible.<br />
                <b>• Unstaking Flexibility:</b> Solana allows you to redelegate your stake to another validator at any time without withdrawing your tokens entirely.<br />
                </p>
              </div>
              <div id="pos" style={{ marginBottom: '20px' }}>
                <h3>6. Proof of Stake and Proof of History</h3>
                <p>
                <b>• Proof of Stake (PoS):</b> Staking on Solana follows a PoS model, where validators are selected to produce blocks based on the size of their total stake.<br />
                <b>• Proof of History (PoH):</b> Solana’s PoH acts as a cryptographic timestamp that orders transactions and ensures consensus. This allows the network to process transactions asynchronously, significantly increasing throughput.<br />
                </p>
              </div>
              <div id="slashing-risks" style={{ marginBottom: '20px' }}>
                <h3>7. Slashing Risks</h3>
                <p>
                Unlike some PoS networks, <b>Solana does not currently implement slashing</b> (a penalty where staked tokens are partially confiscated for validator misbehavior). However, choosing a reliable validator (Liquified Capital) remains crucial since poor performance directly impacts your staking rewards.<br />
                </p>
              </div>
              <div id="Key-Technical" style={{ marginBottom: '20px' }}>
                <h3>8. Key Technical Metrics to Monitor</h3>
                <p>
                When staking on Solana, keep an eye on the following validator metrics:<br />
                • Commission Rate: The percentage of rewards kept by the validator.<br />
                • Performance History: Validator reliability and uptime over time.<br />
                • Stake Weight: The total amount of SOL delegated to a validator, influencing its chances of being selected to produce blocks.<br />
                </p>
              </div>
            

            </section>
            <section id="Summary">
              <h2>Summary</h2>
              <p>
              By staking your SOL tokens, you actively contribute to Solana&apos;s scalability and security while earning rewards. Solana&apos;s staking mechanism is designed to balance decentralization, performance, and accessibility, ensuring a smooth and rewarding experience for delegators. Through Liquified Capital, we simplify this process and provide the tools you need to stake with confidence.<br />

              If you&apos;re ready to start staking or have more questions, visit the Support Page or contact us directly!
              </p>

            </section>
          </Container>
        </main>
      </div>
    </Section>
  );
}