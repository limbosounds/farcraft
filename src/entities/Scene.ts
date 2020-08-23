import { Scene, Color, AmbientLight, PointLight, PointLightHelper } from "three"

export const EScene = new Scene()
EScene.background = new Color("black")
EScene.add(new AmbientLight(0x424242))
const light = new PointLight()
light.position.set(3, 5, 2)
EScene.add(light)
const helper = new PointLightHelper(light)
EScene.add(helper)