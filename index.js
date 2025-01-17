import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

import nebula from './img/nebula.jpg'
import stars from './img/stars.jpg'
import nebula1 from './img/nebula1.jpg'
import { TextureLoader } from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

camera.position.set(-10, 30, 30)
orbit.update()



const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, wireframe: false })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.set(-10, 10, 0)
sphere.castShadow = true

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

const spotLight = new THREE.SpotLight(0xFFFFFF, 15000)
scene.add(spotLight)
spotLight.position.set(-100, 100, 0)
spotLight.castShadow = true
spotLight.angle = 0.2

const sLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(sLightHelper)

const gui = new dat.GUI()

const textureLoader = new THREE.TextureLoader()
scene.background = textureLoader.load(nebula1)


// const cubeTextureLoader = new THREE.CubeTextureLoader()
// scene.background = cubeTextureLoader.load([
//     nebula1, 
//     nebula1,
//     stars,
//     stars,
//     stars,
//     stars,
// ])

const box2Geometry = new THREE.BoxGeometry(4, 4, 4)
const box2Material = new THREE.MeshStandardMaterial({ map: textureLoader.load(nebula1) })
const box2 = new THREE.Mesh(box2Geometry, box2Material)
scene.add(box2)
box2.position.set(-10, 15, 10)
box2.castShadow = true
// box2.material.map = textureLoader.load(nebula1)


const options = {
    sphereColor: "#ffea00",
    wireframe: false,
    speed: 0.01, 
    angle: 0.02,
    penumbra: 0.0,
    intensity: 20000,

}



// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
// directionalLight.position.set(-30, 50, 0)
// scene.add(directionalLight)
// directionalLight.castShadow = true
// directionalLight.shadow.camera.bottom = -12

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// scene.add(dLightHelper)

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(dLightShadowHelper)




gui.addColor(options, "sphereColor").onChange((e) => sphere.material.color.set(e))
gui.add(options, "wireframe").onChange((e) => sphere.material.wireframe = e)
gui.add(options, "speed", 0, 0.1)

gui.add(options, "angle", 0, 1).onChange((e) => {
    spotLight.angle = e
    sLightHelper.update()
})
gui.add(options,"penumbra", 0, 1).onChange((e) => spotLight.penumbra = e)
gui.add(options, "intensity", 20000, 50000).onChange((e) => spotLight.intensity = e)

let step = 0

function animate(time){
    box.rotation.x = time / 1000
    box.rotation.y = time / 1000

    step += options.speed
    sphere.position.y = 10 * Math.abs(Math.sin(step))


    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

