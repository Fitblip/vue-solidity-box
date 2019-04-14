import * as THREE from 'three'
import * as dat from 'dat.gui'
import * as Stats from 'stats.js'
import _ from 'lodash'

export default class VaporWaveBackground {
  constructor (canvas, showFPSCounter = false, showControls = false) {
    this.name = name
    this.canvas = canvas

    this.init()

    this.gui = new dat.GUI()
    let camFolder = this.gui.addFolder('Camera')
    camFolder.add(this.camera.position, 'z', 0, 500).listen().name('Camera Z')
    camFolder.add(this.camera.position, 'x', 0, 500).listen().name('Camera X')
    camFolder.add(this.camera.position, 'y', 0, 500).listen().name('Camera Y')
    camFolder.add(this.camera, 'fov', 0, 100).name('FOV').onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera, 'near', 0, 100).name('Near').onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera, 'far', 0, 2000).name('Far').onChange(() => { this.camera.updateProjectionMatrix() })

    let gridFolder = this.gui.addFolder('Grid')
    gridFolder.add(this.gridHelper.position, 'x', -200, 200).listen().name('Grid X')
    gridFolder.add(this.gridHelper.position, 'y', -200, 200).listen().name('Grid Y')
    gridFolder.add(this.gridHelper.position, 'z', -200, 200).listen().name('Grid Z')

    if (!showControls) {
      this.gui.hide()
    }

    if (showFPSCounter) {
      this.stats = new Stats()
      document.body.appendChild(this.stats.dom)
    }
  }

  noGridActive () {
    _.each(_.concat(this.bottomGrids, this.topGrids), (grid) => {
      grid.visible = false
    })
  }

  fullGridActive () {
    _.each(_.concat(this.bottomGrids, this.topGrids), (grid) => {
      grid.visible = true
    })
  }

  singleGridActive () {
    this.noGridActive()
    this.bottomGrids[0].visible = true
    this.topGrids[0].visible = true
  }

  init () {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, alpha: true})
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    // Camera
    this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 500)
    this.camera.position.z = 215
    this.camera.position.y = 80
    this.camera.position.x = 0

    // Scene
    this.scene = new THREE.Scene()

    // Grids
    this.gridHelper = new THREE.GridHelper(2000, 40, 0xff71ce, 0xff71ce)
    this.gridHelper2 = new THREE.GridHelper(2000, 40, 0x05ffa1, 0x05ffa1)
    this.gridHelper3 = new THREE.GridHelper(2000, 40, 0x01cdfe, 0x01cdfe)
    this.scene.add(this.gridHelper)
    this.scene.add(this.gridHelper2)
    this.scene.add(this.gridHelper3)
    this.bottomGrids = [this.gridHelper, this.gridHelper2, this.gridHelper3]

    this.gridHelper4 = new THREE.GridHelper(2000, 40, 0xff71ce, 0xff71ce)
    this.gridHelper5 = new THREE.GridHelper(2000, 40, 0x05ffa1, 0x05ffa1)
    this.gridHelper6 = new THREE.GridHelper(2000, 40, 0x01cdfe, 0x01cdfe)
    this.gridHelper4.position.y = 200
    this.gridHelper5.position.y = 200
    this.gridHelper6.position.y = 200
    this.scene.add(this.gridHelper4)
    this.scene.add(this.gridHelper5)
    this.scene.add(this.gridHelper6)
    this.topGrids = [this.gridHelper4, this.gridHelper5, this.gridHelper6]

    // Resize listener
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }, false)
  }

  animate () {
    requestAnimationFrame(this.animate.bind(this))

    if (this.stats !== undefined) { this.stats.begin() }

    this.gridHelper.position.z += 1
    this.gridHelper2.position.z += 1.5
    this.gridHelper3.position.z += 0.5

    this.gridHelper4.position.z += 1
    this.gridHelper5.position.z += 1.5
    this.gridHelper6.position.z += 0.5

    _.each(_.concat(this.bottomGrids, this.topGrids), (grid) => {
      if (grid.position.z >= 250) {
        grid.position.z = 0
      }
    })

    this.renderer.render(this.scene, this.camera)

    if (this.stats !== undefined) { this.stats.end() }
  }

}
