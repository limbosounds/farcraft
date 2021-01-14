import React from "react"
import * as t from "three"

import { NoChildrenProps } from "typings/React"

export interface EnvironementLightProps
extends NoChildrenProps {
	scene: t.Scene
}

export interface EnvironementLightState {

}

export default
class EnvironementLight
extends React.Component<EnvironementLightProps, EnvironementLightState> {
	ambientLight = new t.AmbientLight("white", .5)
	directionalLight = new t.DirectionalLight("white", 1)

	constructor(props: EnvironementLightProps) {
		super(props)

		this.directionalLight.position.set(1.5, 1.5, 0) // TODO: set position due to daytime
		// TODO: also set ambient light intensity and color
	}

	componentDidMount() {
		this.props.scene.add(this.ambientLight)
		this.props.scene.add(this.directionalLight)
		this.props.scene.add(this.directionalLight.target)
	}

	componentWillUnmount() {
		this.props.scene.remove(this.directionalLight.target)
		this.props.scene.remove(this.directionalLight)
		this.props.scene.remove(this.ambientLight)
	}
	
	render(): null {
		return null
	}
}