import { PerspectiveCamera } from "three"
import { ClientDimensions, getDimensions } from "utils/client"

class Camera {
	private _dimensions
		: ClientDimensions
		= getDimensions()

	private _fov
		: number
		= 75

	private _drawingDistance
		: number
		= 1000

	get fov(): number {
		return this._fov
	}

	set fov(value: number) {
		this._fov = value
		this.instance.fov = this._fov
		this.instance.updateProjectionMatrix()
	}

	get drawingDistance(): number {
		return this._drawingDistance
	}

	instance = new PerspectiveCamera(
		this._fov,
		this._dimensions.aspectRatio,
		0.1,
		this._drawingDistance
	)
}

export const ECamera = new Camera()

ECamera.instance.position.z = 15
ECamera.instance.position.y = 5