import Color 	from '../../components/utils/page.colors.util'
import ComingSoon from '../../components/sections/comingsoon'
import DocumentationPage from '../../components/sections/docs/DocumentationPage'

import colors 		from '../../content/case-studies/_colors.json'
import settings 	from '../../content/_settings.json'

//
export default function documentation({}) {
	return (
		<>	
			<Color colors={colors} />
			<DocumentationPage />
		</>
	)
}