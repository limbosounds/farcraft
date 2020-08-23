export type ClientDimensions = {
	width: number,
	height: number,
	aspectRatio: number
}

export const getDimensions = (): ClientDimensions => {
	const { innerHeight, innerWidth} = window
	return {
		width: innerWidth,
		height: innerHeight,
		aspectRatio: innerWidth / innerHeight
	}
}