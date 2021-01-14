import React from "react"
import * as t from "three"

export interface BoxProps {
	scene: t.Scene
	width: number
	height: number
	depth: number
}

export interface BoxState {
	
}

export default
class Box
extends React.Component<BoxProps, BoxState> {
	geometry = new t.BoxGeometry(this.props.width, this.props.height, this.props.depth)

	material = new t.MeshStandardMaterial({ color: 0x00aaff })
	box = new t.Mesh(this.geometry, this.material)

	componentDidMount() {
		this.box.castShadow = true
		this.props.scene.add(this.box)
	}

	componentWillUnmoun() {
		this.props.scene.remove(this.box)
	}

	render(): null {
		return null
	}
}