import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import App from "App"

import "../typings/Console"
import "typings/global"

export interface ProviderProps {
	
}

export interface ProviderState {
	
}

export default
class Provider
extends React.Component<ProviderProps, ProviderState> {
	render() {
		return <>
			<Switch>
				<Route path="/" component={App} />
				<Redirect to="/" />
			</Switch>
		</>
	}
}