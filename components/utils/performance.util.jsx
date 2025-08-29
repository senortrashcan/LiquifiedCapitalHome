import { useState, useEffect, createContext, useContext } from 'react'

// Performance context for global performance settings
const PerformanceContext = createContext({
	isLowEndDevice: false,
	shouldReduceMotion: false,
	connectionSpeed: 'fast',
	deviceMemory: 4,
	hardwareConcurrency: 4
})

export const usePerformance = () => useContext(PerformanceContext)

export function PerformanceProvider({ children }) {
	const [performanceSettings, setPerformanceSettings] = useState({
		isLowEndDevice: false,
		shouldReduceMotion: false,
		connectionSpeed: 'fast',
		deviceMemory: 4,
		hardwareConcurrency: 4
	})

	useEffect(() => {
		const detectPerformanceCapabilities = () => {
			// Check for reduced motion preference
			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

			// Get device capabilities
			const hardwareConcurrency = navigator.hardwareConcurrency || 2
			const deviceMemory = navigator.deviceMemory || 2
			const connection = navigator.connection

			// Determine connection speed
			let connectionSpeed = 'fast'
			if (connection) {
				const effectiveType = connection.effectiveType
				if (effectiveType === 'slow-2g' || effectiveType === '2g') {
					connectionSpeed = 'slow'
				} else if (effectiveType === '3g') {
					connectionSpeed = 'medium'
				}
			}

			// Determine if device is low-end
			const isLowEndDevice = 
				hardwareConcurrency < 4 || 
				deviceMemory < 4 || 
				connectionSpeed === 'slow' ||
				prefersReducedMotion

			setPerformanceSettings({
				isLowEndDevice,
				shouldReduceMotion: prefersReducedMotion,
				connectionSpeed,
				deviceMemory,
				hardwareConcurrency
			})
		}

		detectPerformanceCapabilities()

		// Listen for changes in reduced motion preference
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
		const handleChange = () => detectPerformanceCapabilities()
		mediaQuery.addEventListener('change', handleChange)

		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [])

	return (
		<PerformanceContext.Provider value={performanceSettings}>
			{children}
		</PerformanceContext.Provider>
	)
}

// Hook for conditional rendering based on performance
export function useConditionalRender() {
	const { isLowEndDevice, shouldReduceMotion } = usePerformance()
	
	return {
		// Render component only if device can handle it
		renderIfCapable: (component, fallback = null) => {
			return (isLowEndDevice || shouldReduceMotion) ? fallback : component
		},
		
		// Get optimized props based on device capabilities
		getOptimizedProps: (highEndProps, lowEndProps = {}) => {
			return (isLowEndDevice || shouldReduceMotion) ? lowEndProps : highEndProps
		},
		
		// Check if animations should be disabled
		shouldDisableAnimations: isLowEndDevice || shouldReduceMotion,
		
		// Get optimized image quality
		getImageQuality: () => {
			if (isLowEndDevice) return 60
			return 85
		},
		
		// Get optimized animation duration
		getAnimationDuration: (normalDuration) => {
			if (isLowEndDevice || shouldReduceMotion) return 0
			return normalDuration * 0.8 // Slightly faster animations
		}
	}
}

// Performance monitoring hook
export function usePerformanceMonitor() {
	const [metrics, setMetrics] = useState({
		fps: 60,
		memoryUsage: 0,
		isThrottled: false
	})

	useEffect(() => {
		let frameCount = 0
		let lastTime = performance.now()
		let animationId

		const measureFPS = () => {
			frameCount++
			const currentTime = performance.now()
			
			if (currentTime - lastTime >= 1000) {
				const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
				
				// Get memory usage if available
				const memoryInfo = performance.memory
				const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize : 0
				
				// Consider device throttled if FPS is consistently low
				const isThrottled = fps < 30
				
				setMetrics({
					fps,
					memoryUsage,
					isThrottled
				})
				
				frameCount = 0
				lastTime = currentTime
			}
			
			animationId = requestAnimationFrame(measureFPS)
		}

		// Only monitor in development or when explicitly enabled
		if (process.env.NODE_ENV === 'development') {
			animationId = requestAnimationFrame(measureFPS)
		}

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId)
			}
		}
	}, [])

	return metrics
}

// Utility function to debounce expensive operations
export function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debouncedValue
}

// Utility to throttle scroll events and other high-frequency events
export function useThrottle(callback, delay) {
	const [isThrottled, setIsThrottled] = useState(false)

	const throttledCallback = (...args) => {
		if (!isThrottled) {
			callback(...args)
			setIsThrottled(true)
			setTimeout(() => setIsThrottled(false), delay)
		}
	}

	return throttledCallback
}
