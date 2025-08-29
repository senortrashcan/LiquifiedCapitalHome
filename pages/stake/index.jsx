// Dynamic imports for better performance
import dynamic from 'next/dynamic'

import Color from '../../components/utils/page.colors.util'
import colors from '../../content/stake/_colors.json'

// Lazy load the heavy FeaturedProjects component
const FeaturedProjects = dynamic(() => import('../../components/sections/stake/featured'), {
	loading: () => (
		<div style={{
			height: '400px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: 'var(--background-color, #000)',
			color: 'var(--text-color, #fff)'
		}}>
			<div>Loading...</div>
		</div>
	),
	ssr: true // Enable SSR for SEO
})

//
export default function Projects() {
	return (
		<>
		<Color colors={colors} />
		<FeaturedProjects />
		</>
	)
}
