import { EventEmitter } from "./common/EventEmitter"

export enum SceneEvents {
	Destroy = "destroy",
	Drop = "drop"
}

export type SceneEventPayloads = {
	[SceneEvents.Destroy]: {
		targets: string[]
	},
	[SceneEvents.Drop]: {
		condition: number
	}
}

class Scene extends EventEmitter<SceneEvents, SceneEventPayloads> {

}

const scene = new Scene()

scene.addEventListener(SceneEvents.Destroy, (eventType, payload) => {
	payload
})

export default new Scene()