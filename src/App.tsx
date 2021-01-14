import React from "react"
import { observer } from "mobx-react"

import "styles/main"
import Scene from "components/Scene"
import Box from "components/Geometry/Box"
import Plane from "components/Geometry/Plane"
import EnvironementLight from "components/EnvironementLight"
import CamerasManager from "managers/CamerasManager"

export interface AppProps {
	
}

export interface AppState {
	
}

@observer
export default
class App
extends React.Component<AppProps, AppState> {
	componentDidMount() {
		document.addEventListener("click", CamerasManager.nextCamera) 
	}

	render() {
		return <>
			<Scene>
				{sceneInstance => {
					return <>
						<EnvironementLight
							scene={sceneInstance}
						/>
						<Plane
							scene={sceneInstance} // TODO: use context instead of props
							width={10}
							height={10}
						/>
						<Box
							scene={sceneInstance}
							width={1}
							height={1}
							depth={1}
						/>
					</>
				}}
			</Scene>
		</>
	}
}