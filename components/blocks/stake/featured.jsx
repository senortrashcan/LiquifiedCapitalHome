import Image from 'next/image'

import { useEffect, useState } from 'react'
import { m, useAnimation, useReducedMotion } from "framer-motion"
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

import Badges 		from '../../utils/badge.list.util'
import Icon 		from '../../utils/icon.util'

import css 			from '../../../styles/sections/stake/featured.module.scss'
import content 		from '../../../content/stake/featured.json'

export default function FeaturedProject({ content }, index) {

	const { project, url, descriptionTitle, description, stack, images } = content

	// Performance optimizations
	const shouldReduceMotion = useReducedMotion()
	const [isLowEndDevice, setIsLowEndDevice] = useState(false)

	const controls = useAnimation();
	const { ref, inView } = useInView({
		threshold: 0.25, // Increased threshold to reduce triggers
		triggerOnce: true, // Only animate once for better performance
		rootMargin: '50px' // Start animation earlier but trigger less frequently
	})

	// Detect low-end devices
	useEffect(() => {
		const checkDeviceCapabilities = () => {
			const hardwareConcurrency = navigator.hardwareConcurrency || 2
			const deviceMemory = navigator.deviceMemory || 2
			const connection = navigator.connection

			// Consider device low-end if:
			// - Less than 4 CPU cores
			// - Less than 4GB RAM
			// - Slow network connection
			const isLowEnd = hardwareConcurrency < 4 ||
							deviceMemory < 4 ||
							(connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'))

			setIsLowEndDevice(isLowEnd)
		}

		checkDeviceCapabilities()
	}, [])

	useEffect(() => {
		if (shouldReduceMotion || isLowEndDevice) {
			// Skip animations for reduced motion preference or low-end devices
			return
		}

		if (inView) {
			controls.start("visible")
		}
	}, [controls, inView, shouldReduceMotion, isLowEndDevice])

	// Use regular div for low-end devices or reduced motion preference
	const MotionComponent = (shouldReduceMotion || isLowEndDevice) ? 'section' : m.section
	const motionProps = (shouldReduceMotion || isLowEndDevice) ? {} : {
		variants: container,
		initial: ["rest", "hidden"],
		whileHover: "hover",
		animate: controls
	}

	return (
		<Link href={url} target="_blank" rel="noopener noreferrer">
			<MotionComponent
				key={index}
				className={css.project}
				ref={ref}
				{...motionProps}>
				
				<div className={css.details}>
					<div className={css.projectHeader}>
						<div className={css.header}>
							<h3 className="highlight">{project}</h3>	
						</div>
						<div className={css.description}>
							<p><strong>{descriptionTitle}</strong> {description}</p>
						</div>
						<div className={css.stackContainer}>
							<Badges list={stack} block="stack" fullContainer={false} color={false} />
						</div>
						{(shouldReduceMotion || isLowEndDevice) ? (
							<div className={css.viewProject}>
								<Icon icon={[ 'fad', 'arrow-right-to-bracket' ]} />
							</div>
						) : (
							<m.div variants={''} className={css.viewProject}>
								<Icon icon={[ 'fad', 'arrow-right-to-bracket' ]} />
							</m.div>
						)}
					</div>
				</div>

				<div className={css.imageContainer}>
					<span className={`${css.imageAnimationContainer}`}>
						{ images.map( ({key, url, hover, h, w }, index) => {
							if (shouldReduceMotion || isLowEndDevice) {
								// Render static images for better performance
								return (
									<div key={`${index}-${key}`}>
										<Image
											src={url}
											alt={project}
											height={h}
											width={w}
											loading="lazy"
											quality={75}
											placeholder="blur"
											blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
										/>
									</div>
								)
							}

							hover = ( hover === 'left' ) ? hoverLeft : hoverRight
							return (
								<m.div key={`${index}-${key}`} variants={item}>
									<m.div variants={hover}>
										<Image
											src={url}
											alt={project}
											height={h}
											width={w}
											loading="lazy"
											quality={85}
											placeholder="blur"
											blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
										/>
									</m.div>
								</m.div>
							)}
						) }
					</span>
				</div>
			</MotionComponent>
		</Link>
	)
}

const container = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3, // Reduced duration
			ease: "easeOut"
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.4, // Reduced duration
			ease: "easeOut"
		}
	},
	rest: {
		scale: 1,
		transition: {
			duration: 0.2,
			ease: "easeOut"
		}
	},
	hover: {
		scale: 1.02, // Reduced scale for better performance
		transition: {
			duration: 0.2,
			ease: "easeOut"
		}
	}
}

const item = {
	hidden: {
		y: 20, // Reduced movement for better performance
		opacity: 0,
		transition: {
			duration: 0.25, // Faster animation
			ease: "easeOut"
		}
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.3, // Faster animation
			ease: "easeOut"
		}
	},
}

const hoverLeft = {
	rest: {
		x: 0,
		transition: { duration: 0.2, ease: "easeOut" }
	},
	hover: {
		x: -2, // Reduced movement
		transition: { duration: 0.2, ease: "easeOut" }
	}
}

const hoverRight = {
	rest: {
		x: 0,
		transition: { duration: 0.2, ease: "easeOut" }
	},
	hover: {
		x: 2, // Reduced movement
		transition: { duration: 0.2, ease: "easeOut" }
	}
}

