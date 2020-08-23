import React from "react"
import { observer } from "mobx-react"

import "styles/main"
import Scene from "components/Scene"
import Box from "components/Geometry/Box"

export interface AppProps {
	
}

export interface AppState {
	
}

@observer
export default
class App
extends React.Component<AppProps, AppState> {
	render() {
		return <>
			<Scene>
				<Box />
			</Scene>
		</>
	}
}