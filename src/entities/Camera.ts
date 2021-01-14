import { PerspectiveCamera } from "three"
import { getClientDimensions } from "utils/client"

export interface ECameraConstructorProps {
	initialPosition?: Coordinates3D
	initialRotation?: Coordinates3D
	initialFov?: number,
	initialDrawingDistance?: number,
	aspectRatio?: number
}

export class ECamera {
	static readonly CONST = {
		FOV: {
			DEFAULT: 60,
			MIN: 50,
			MAX: 100
		},
		DRAWING_DISTANCE: {
			DEFAULT: 1000,
			MIN: 500,
			MAX: 10000
		}
	}

	constructor(
		props?: ECameraConstructorProps
	) {
		const {
			initialPosition = {
				x: 0,
				y: 0,
				z: 0,
			},
			initialRotation = {
				x: 0,
				y: 0,
				z: 0,
			},
			initialFov = ECamera.CONST.FOV.DEFAULT,
			initialDrawingDistance = ECamera.CONST.DRAWING_DISTANCE.DEFAULT,
			aspectRatio = getClientDimensions().aspectRatio
		} = props || {}

		this.instance = new PerspectiveCamera(
			initialFov,
			aspectRatio,
			0.1,
			initialDrawingDistance
		)

		this.instance.position.set(initialPosition.x, initialPosition.y, initialPosition.z)
		this.instance.rotation.set(initialRotation.x, initialRotation.y, initialRotation.z)
	}

	instance
		: PerspectiveCamera

	get fov(): number {
		return this.instance.fov
	}

	set fov(value: number) {
		this.instance.fov = value
		this.instance.updateProjectionMatrix()
	}

	get drawingDistance(): number {
		return this.instance.far
	}

	get aspectRatio(): number {
		return this.instance.aspect
	}
}