// Core packages
import Image from 'next/image'

// Section structure
import Section from '../../structure/section';
import Container from '../../structure/container';

// Section general blocks
import SectionTitle from '../../blocks/section.title.block'
import SectionGridBg from '../../blocks/section.grid.block'

// Section specific blocks
import BadgesBlock from '../../blocks/about.badges.block'
import CopyBlock from '../../blocks/about.copy.block'

// Section scss
import about from '../../../styles/sections/index/about.module.scss';

/**
 * Section: About
 * An overview of yourself.
 * Highlight your top level attributes and disciplines.
 * 
 * @returns {jsx} <About />
 */
export default function About() {
	return (
		<Section classProp={about.section}>	
			<Container spacing={['verticalXXXLrg']}>
				<SectionTitle
					title="What We Do"
					preTitle="Synopsis"
					subTitle="Decentralized staking is more than just a buzzword, it’s the backbone of a more democratic and resilient financial system. We offer a robust platform that simplifies the staking process, ensuring you can easily participate in staking networks and earn rewards without compromising on security or ease of use."
				/>
				<section className={about.content}>
					<div className={about.image}>
						<img src="/img/family-photo.jpg" alt="cat"/>
						{/* <Image src="/img/family-photo.jpg" width={600} height={800}/> */}
					</div>
					<div className={about.copy} >
						<CopyBlock 
							title="We Facilitate Staking"
							containerClass={about.container}
							iconClass={about.icon}
							icon={[ 'fat', 'ear-listen' ]}
							copy="We enable you to participate in staking by managing the technical complexities for you. You can easily stake your cryptocurrency through our platform, contributing to the network and earning rewards without the need to operate your own nodes."
						/>
						<BadgesBlock 
							title="We Ensure Security and Reliability" 
							containerClass={about.container}
							list={methods} 
							fullContainer="fullContainer"
							block="methods" 
							icon="fingerprint"
							copy="Your security is our top priority. We employ advanced security measures, including encryption and multi-signature wallets, to protect your assets and data from potential threats."
							//invertedColor="invertedColor"
							headerIcon={`${about.icon}`}
						/>
					</div>
				</section>	
			</Container>
		</Section>
	)
}

const methods 	= [
	{ key: 'planet-moon', 		name: 'User Friendly', 		type: 'fad' },
	{ key: 'qrcode', 			name: 'Secure', 	type: 'fad' },
	{ key: 'window', 			name: 'Transparent', 	type: 'fad' },
	{ key: 'cubes', 			name: 'Accessible', 	type: 'far' },
	{ key: 'layer-plus', 		name: 'Effortless', 	type: 'fad' },
	{ key: 'solar-system', 		name: 'Decentralized', 		type: 'fad' },
]