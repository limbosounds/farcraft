import React from "react"
import * as t from "three"
import { ERenderer } from "entities/Renderer"
import CamerasManager from "managers/CamerasManager"

export interface SceneProps {
	background?: t.Scene["background"]
	children: (
		scene: t.Scene
	) => React.ReactNode
}

export interface SceneState {
	
}

export default
class Scene
extends React.Component<SceneProps, SceneState> {
	static defaultProps = {
		background: "black"
	}

	scene
		= new t.Scene()

	frame
		: number

	private setupScene = () => {
		this.scene.background = this.props.background!
	}

	componentDidMount() {
		this.setupScene()

		document.body.appendChild(ERenderer.domElement)
		this.startRenderLoop()
	}

	componentWillUnmount() {
		document.body.removeChild(ERenderer.domElement)
		this.stopRenderLoop()
	}

	startRenderLoop = () => {
		this.frame = requestAnimationFrame(this.renderLoop)
	}

	renderLoop = () => {
		ERenderer.render(this.scene, CamerasManager.activeCamera.instance)
		this.frame = requestAnimationFrame(this.renderLoop)
	}

	stopRenderLoop = () => {
		cancelAnimationFrame(this.frame)
	}

	render() {
		return this.props.children(this.scene)
	}
}