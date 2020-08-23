import React from "react"
import * as t from "three"
import { EScene } from "entities/Scene"

export interface BoxProps {
	
}

export interface BoxState {
	
}

export default
class Box
extends React.Component<BoxProps, BoxState> {
	geometry = new t.BoxGeometry(5, 5, 5)
	material = new t.MeshStandardMaterial({ color: 0x00aaff })
	box = new t.Mesh(this.geometry, this.material)

	componentDidMount() {
		EScene.add(this.box)
	}

	componentWillUnmoun() {
		EScene.remove(this.box)
	}

	render(): null {
		return null
	}
}