import React from "react"
import * as t from "three"

export interface PlaneProps {
	scene: t.Scene
	width: number,
	height: number
}

export interface PlaneState {

}

export default
class Plane
extends React.Component<PlaneProps, PlaneState> {
	geometry
		= new t.PlaneGeometry(this.props.width, this.props.height)

	material
		= new t.MeshBasicMaterial({ color: 0xffffff })

	plane = new t.Mesh(this.geometry, this.material)

	componentDidMount() {
		this.plane.rotateX(Math.PI / -2)
		this.plane.translateZ(-0.5)
		this.props.scene.add(this.plane)
	}

	componentWillUnmount() {
		this.props.scene.remove(this.plane)
	}

	render(): null {
		return null
	}
}