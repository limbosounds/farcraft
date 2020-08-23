import React from "react"
import { observer } from "mobx-react"

import "styles/main"

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
			<h1>
				Hello, world!
			</h1>
		</>
	}
}