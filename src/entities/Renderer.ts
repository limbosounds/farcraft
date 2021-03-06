import "../../typings/Console"

import { WebGLRenderer } from "three"
import { getClientDimensions } from "utils/client"

const canvas = document.createElement("canvas")
var context = canvas.getContext("webgl2")
	|| canvas.getContext("webgl")

if (!context)
	console.no("WebGL is not supported by current browser")
else
	console.nfo(`The context is *${context.constructor.name}*`)

const renderer = new WebGLRenderer({
	powerPreference: "high-performance",
	context,
	canvas
})

const dimensions = getClientDimensions()
renderer.setSize(dimensions.width, dimensions.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.autoUpdate = true

export const ERenderer = renderer