import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePerformance } from './performance.util'

// Optimized Image component that adapts to device capabilities
export default function OptimizedImage({ 
	src, 
	alt, 
	width, 
	height, 
	priority = false,
	quality,
	className,
	style,
	...props 
}) {
	const { isLowEndDevice, connectionSpeed } = usePerformance()
	const [imageQuality, setImageQuality] = useState(85)
	const [shouldLoadImage, setShouldLoadImage] = useState(!isLowEndDevice)

	useEffect(() => {
		// Adjust quality based on device capabilities and connection
		let adaptiveQuality = quality || 85
		
		if (isLowEndDevice) {
			adaptiveQuality = 60
		} else if (connectionSpeed === 'slow') {
			adaptiveQuality = 70
		} else if (connectionSpeed === 'medium') {
			adaptiveQuality = 75
		}
		
		setImageQuality(adaptiveQuality)
		
		// For very low-end devices, delay image loading
		if (isLowEndDevice && !priority) {
			const timer = setTimeout(() => {
				setShouldLoadImage(true)
			}, 1000)
			
			return () => clearTimeout(timer)
		} else {
			setShouldLoadImage(true)
		}
	}, [isLowEndDevice, connectionSpeed, quality, priority])

	// Placeholder for low-end devices
	if (!shouldLoadImage) {
		return (
			<div 
				className={className}
				style={{
					width: width,
					height: height,
					backgroundColor: 'var(--background-secondary, #1a1a1a)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: 'var(--text-secondary, #666)',
					fontSize: '14px',
					...style
				}}
			>
				Loading...
			</div>
		)
	}

	// Generate blur data URL for better loading experience
	const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="

	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			quality={imageQuality}
			priority={priority}
			loading={priority ? 'eager' : 'lazy'}
			placeholder="blur"
			blurDataURL={blurDataURL}
			className={className}
			style={style}
			// Performance optimizations
			sizes={isLowEndDevice ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 75vw'}
			{...props}
		/>
	)
}

// Hook for responsive image sizes
export function useResponsiveImageSizes() {
	const { isLowEndDevice } = usePerformance()
	const [screenSize, setScreenSize] = useState('desktop')

	useEffect(() => {
		const updateScreenSize = () => {
			const width = window.innerWidth
			if (width < 768) {
				setScreenSize('mobile')
			} else if (width < 1024) {
				setScreenSize('tablet')
			} else {
				setScreenSize('desktop')
			}
		}

		updateScreenSize()
		window.addEventListener('resize', updateScreenSize)
		return () => window.removeEventListener('resize', updateScreenSize)
	}, [])

	const getSizes = (mobileSize = '100vw', tabletSize = '75vw', desktopSize = '50vw') => {
		if (isLowEndDevice) {
			// Use smaller sizes for low-end devices
			return `(max-width: 767px) ${mobileSize}, (max-width: 1023px) 50vw, 33vw`
		}
		
		return `(max-width: 767px) ${mobileSize}, (max-width: 1023px) ${tabletSize}, ${desktopSize}`
	}

	const getDimensions = (baseDimensions) => {
		const { width, height } = baseDimensions
		
		if (isLowEndDevice) {
			// Reduce dimensions for low-end devices
			return {
				width: Math.round(width * 0.8),
				height: Math.round(height * 0.8)
			}
		}
		
		return { width, height }
	}

	return {
		screenSize,
		getSizes,
		getDimensions,
		isLowEndDevice
	}
}

// Preload critical images
export function preloadImage(src, priority = false) {
	if (typeof window === 'undefined') return

	const link = document.createElement('link')
	link.rel = priority ? 'preload' : 'prefetch'
	link.as = 'image'
	link.href = src
	
	document.head.appendChild(link)
	
	return () => {
		if (document.head.contains(link)) {
			document.head.removeChild(link)
		}
	}
}

// Image loading state hook
export function useImageLoadingState(src) {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		if (!src) return

		const img = new window.Image()
		
		img.onload = () => {
			setIsLoading(false)
			setHasError(false)
		}
		
		img.onerror = () => {
			setIsLoading(false)
			setHasError(true)
		}
		
		img.src = src
		
		return () => {
			img.onload = null
			img.onerror = null
		}
	}, [src])

	return { isLoading, hasError }
}
