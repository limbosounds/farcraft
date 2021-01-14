import { ECamera } from "entities/Camera"
import { observable, computed, action } from "mobx"

export enum CameraType {
	Free = "FREE",
	FirstPerson = "FIRST_PERSON"
}

class CamerasManager {
	private order
		: CameraType[]
		= [
			CameraType.Free,
			CameraType.FirstPerson
		]

	private cameras
		: {
			[key in CameraType]: ECamera
		}
		= {
			[CameraType.Free]: new ECamera({
				initialPosition: {
					x: 0, y: 5, z: 15
				}
			}),
			[CameraType.FirstPerson]: new ECamera()
		}

	@observable
	activeCameraType
		: CameraType
		= this.order[0] // TODO: Maybe define default camera as external variable

	@computed
	get activeCamera(): ECamera {
		return this.cameras[this.activeCameraType]
	}

	@action
	switchToCamera = (
		cameraType: CameraType 
	) => {
		this.activeCameraType = cameraType
	}

	@action
	nextCamera = () => {
		let newIndex = this.order.indexOf(this.activeCameraType)
		if (newIndex == this.order.length - 1)
			newIndex = 0
		else
			newIndex++

		this.switchToCamera(this.order[newIndex])
	}

	@action
	prevCamera = () => {
		let newIndex = this.order.indexOf(this.activeCameraType)
		if (newIndex == 0)
			newIndex = this.order.length - 1
		else
			newIndex--

		this.switchToCamera(this.order[newIndex])
	}
}

export default new CamerasManager()