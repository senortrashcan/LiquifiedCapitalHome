// Core packages
import { useEffect, useState } from 'react'

// Font Awesome packages
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Import only the specific icons we actually use
// FontAwesome Pro Duotone icons
import { faArrowUpRightFromSquare } from '@fortawesome/pro-duotone-svg-icons/faArrowUpRightFromSquare'
import { faUser } from '@fortawesome/pro-duotone-svg-icons/faUser'
import { faShieldCheck } from '@fortawesome/pro-duotone-svg-icons/faShieldCheck'
import { faMagnifyingGlass } from '@fortawesome/pro-duotone-svg-icons/faMagnifyingGlass'
import { faLaptopMobile } from '@fortawesome/pro-duotone-svg-icons/faLaptopMobile'
import { faThumbsUp } from '@fortawesome/pro-duotone-svg-icons/faThumbsUp'
import { faNetworkWired } from '@fortawesome/pro-duotone-svg-icons/faNetworkWired'
import { faArrowRightToBracket } from '@fortawesome/pro-duotone-svg-icons/faArrowRightToBracket'

// FontAwesome Pro Thin icons
import { faEarListen } from '@fortawesome/pro-thin-svg-icons/faEarListen'
import { faChartNetwork } from '@fortawesome/pro-thin-svg-icons/faChartNetwork'
import { faFingerprint } from '@fortawesome/pro-thin-svg-icons/faFingerprint'
import { faPeople } from '@fortawesome/pro-thin-svg-icons/faPeople'
import { faLaptopCode } from '@fortawesome/pro-thin-svg-icons/faLaptopCode'
import { faTerminal } from '@fortawesome/pro-thin-svg-icons/faTerminal'
import { faHandshakeSimple } from '@fortawesome/pro-thin-svg-icons/faHandshakeSimple'
import { faWandMagicSparkles } from '@fortawesome/pro-thin-svg-icons/faWandMagicSparkles'
import { faCircleNotch } from '@fortawesome/pro-thin-svg-icons/faCircleNotch'

// FontAwesome Free Brands icons
import { faMedium } from '@fortawesome/free-brands-svg-icons/faMedium'
import { faDev } from '@fortawesome/free-brands-svg-icons/faDev'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'

// Create icon mapping for efficient lookup
const iconMap = {
	'fad': {
		'arrow-up-right-from-square': faArrowUpRightFromSquare,
		'user': faUser,
		'shield-check': faShieldCheck,
		'magnifying-glass': faMagnifyingGlass,
		'laptop-mobile': faLaptopMobile,
		'thumbs-up': faThumbsUp,
		'network-wired': faNetworkWired,
		'arrow-right-to-bracket': faArrowRightToBracket,
	},
	'fat': {
		'ear-listen': faEarListen,
		'chart-network': faChartNetwork,
		'fingerprint': faFingerprint,
		'people': faPeople,
		'laptop-code': faLaptopCode,
		'terminal': faTerminal,
		'handshake-simple': faHandshakeSimple,
		'wand-magic-sparkles': faWandMagicSparkles,
		'circle-notch': faCircleNotch,
	},
	'fab': {
		'medium': faMedium,
		'dev': faDev,
		'linkedin': faLinkedin,
		'github': faGithub,
	}
}

/**
 * Icon factory utility.
 * Generates icon JSX and returns it. Keeps all icon packages isolated in here
 *
 * Now uses specific icon imports instead of loading entire libraries for better performance
 * This approach follows FontAwesome's recommended best practices for bundle optimization
 * * https://github.com/FortAwesome/Font-Awesome/issues/19348
 *
 * @param 	{array} icon request props [ iconType, iconKey ]
 * @returns {jsx} 	<Icon />
 */
export default function Icon({ icon }) {

	const [ iconType, iconKey ] = icon

	const [ stateIconKey, setIconKey ] = useState('circle-notch')

	useEffect( () => setIconKey( iconKey ), [ iconKey ] )

	// Get the specific icon from our mapping
	const iconDefinition = iconMap[iconType]?.[stateIconKey] || iconMap['fat']['circle-notch']

	return (
		<FontAwesomeIcon icon={iconDefinition} />
	)
}
