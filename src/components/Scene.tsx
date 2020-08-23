import React from "react"
import { ERenderer } from "entities/Renderer"
import { EScene } from "entities/Scene"
import { ECamera } from "entities/Camera"

export interface SceneProps {
	
}

export interface SceneState {
	
}

export default
class Scene
extends React.Component<SceneProps, SceneState> {
	frame
		: number

	componentDidMount() {
		document.body.appendChild(ERenderer.domElement)
		this.startRenderLoop()

		document.addEventListener("wheel", this.handleWheel)
	}

	componentWillUnmount() {
		document.body.removeChild(ERenderer.domElement)
		this.stopRenderLoop()

		document.removeEventListener("wheel", this.handleWheel)
	}

	startRenderLoop = () => {
		this.frame = requestAnimationFrame(this.renderLoop)
	}

	renderLoop = () => {
		ERenderer.render(EScene, ECamera.instance)
		this.frame = requestAnimationFrame(this.renderLoop)
	}

	stopRenderLoop = () => {
		cancelAnimationFrame(this.frame)
	}

	handleWheel = (
		event: WheelEvent
	) => {
		if (event.deltaY > 0)
			ECamera.fov += 2
		else
			ECamera.fov -= 2
	}

	render() {
		return this.props.children
	}
}