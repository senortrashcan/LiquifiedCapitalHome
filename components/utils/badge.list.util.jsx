import { useEffect, useState } from 'react'
import { m, useAnimation, useReducedMotion } from "framer-motion"
import { useInView } from 'react-intersection-observer'

// Utility components
import Icon from '../utils/icon.util.jsx'

/**
* scss reference for utils should probably be pulled in from the first component under the section
*/
import badges from '../../styles/blocks/badges.module.scss';


export default function Badges({ list, block, color, fullContainer }) {

	// Performance optimizations
	const shouldReduceMotion = useReducedMotion()
	const [isLowEndDevice, setIsLowEndDevice] = useState(false)

	const controls = useAnimation();
	const { ref, inView } = useInView({
		threshold: 0.6, // Higher threshold for better performance
		triggerOnce: true, // Only animate once
		rootMargin: '20px'
	})

	// Detect low-end devices
	useEffect(() => {
		const hardwareConcurrency = navigator.hardwareConcurrency || 2
		const deviceMemory = navigator.deviceMemory || 2
		setIsLowEndDevice(hardwareConcurrency < 4 || deviceMemory < 4)
	}, [])

	useEffect(() => {
		if (shouldReduceMotion || isLowEndDevice) {
			return // Skip animations
		}

		if (inView) {
			controls.start("visible")
		}
	}, [controls, inView, shouldReduceMotion, isLowEndDevice])

	// Simplified animations for better performance
	const container = {
		hidden: {
			opacity: 0,
			transition: {
				duration: 0.2,
				ease: "easeOut"
			}
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.3,
				ease: "easeOut"
			}
		}
	}

	const item = {
		hidden: {
			y: 10, // Reduced movement
			opacity: 0
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.25, // Faster animation
				ease: "easeOut"
			}
		}
	}

	// Use regular ul for low-end devices or reduced motion preference
	const ListComponent = (shouldReduceMotion || isLowEndDevice) ? 'ul' : m.ul
	const motionProps = (shouldReduceMotion || isLowEndDevice) ? {} : {
		variants: container,
		initial: "hidden",
		animate: controls,
		whileHover: "hover"
	}

	return (
		<ListComponent
			className={`${badges.list} ${badges[block]} ${badges[fullContainer]}`}
			ref={ref}
			{...motionProps}>
		{
		list.map( ({ key, name, type }) => {
			const ItemComponent = (shouldReduceMotion || isLowEndDevice) ? 'li' : m.li
			const itemMotionProps = (shouldReduceMotion || isLowEndDevice) ? {} : { variants: item }

			return (
				<ItemComponent
					key={name}
					className={`${badges.item} ${key}`}
					{...itemMotionProps} >
					<IconModule iconKey={key} iconType={type} color={color}/>
					<span className={badges.title}>{name}</span>
				</ItemComponent>
				)
			})
		}
		</ListComponent>
	)
}

function IconModule({ iconKey, iconType, color }) {
	let colored = 'colored'
	if (color === false) { colored = '' }

	switch (iconType) {
		case 'far':
		case 'fad':
		case 'fat':
		case 'fas':
			return ( <Icon icon={[ iconType, iconKey ]} /> )
		case 'devicon':
			return ( <i className={`devicon-${iconKey}-plain ${colored}`} /> )
		default:
			return ( '' )
	}
}
		
		