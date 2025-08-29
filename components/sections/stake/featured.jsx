import dynamic from 'next/dynamic'

// Lazy load the heavy FeaturedProject component
const FeaturedProject = dynamic(() => import('../../blocks/stake/featured'), {
	loading: () => (
		<div style={{
			height: '300px',
			background: 'var(--background-color, #000)',
			borderRadius: '8px',
			margin: '20px 0'
		}} />
	),
	ssr: true
})

// Section structure
import Section 		from '../../structure/section';
import Container 	from '../../structure/container';
import SectionTitle from '../../blocks/section.title.block'

import css 			from '../../../styles/sections/stake/featured.module.scss'
import content 		from '../../../content/stake/featured.json'

export default function FeaturedProjects() {

	return (
		<Section classProp={css.hasBg}>	
			<Container spacing={'verticalXXXXLrg'}>
				<SectionTitle
					title="Our Products"
					preTitle="Security and Decentralization"
					subTitle="Focused on experience, driven by the engineering."
				/> 				{
				content.map( (data, index) => {
					return (
						<FeaturedProject content={data} index={index} key={index} />
					)
				})
				}
			</Container>
			{/* Simplified background for better performance */}
			<div className={css.bgContainer} style={{ willChange: 'auto' }}>
				<span className={css.orbitalBg}>
					<span className={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroLeft} ${css.heroOrbital}`}></span></span>
					<span className={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroCenter}`}></span></span>
					<span className={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroRight} ${css.heroOrbital}`}></span></span>
				</span>
				<span className={css.afterGlowBg}></span>
			</div>
		</Section>
	)
}