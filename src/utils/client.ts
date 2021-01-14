export type ClientDimensions = {
	width: number,
	height: number,
	aspectRatio: number
}

export const getClientDimensions = (): ClientDimensions => {
	const { innerHeight, innerWidth} = window
	return {
		width: innerWidth,
		height: innerHeight,
		aspectRatio: innerWidth / innerHeight
	}
}