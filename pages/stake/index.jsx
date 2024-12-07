// Sections
import FeaturedProjects from '../../components/sections/stake/featured'

import Color  from '../../components/utils/page.colors.util'

import settings from '../../content/_settings.json'
import colors from '../../content/stake/_colors.json'

//
export default function Projects() {
	return (
		<>
		<Color colors={colors} />
		<FeaturedProjects />
		</>
	)
}
