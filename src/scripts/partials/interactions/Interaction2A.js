import { Graphics } from 'pixi.js'
import { isEqual } from 'lodash'
import Scene from '../../utils/scene'

class Interaction2A extends Graphics {

    /**
     * @constructor
     */
    constructor(root) {

        super()

        if (window.innerWidth > 1400) {
            this.sceneWidth = (window.innerWidth * 70) / 100
		} else {
			this.sceneWidth = (window.innerWidth * 66) / 100
		}
        this.sceneHeight = window.innerHeight
        this.asideWidth = window.innerWidth - this.sceneWidth
        this.gridSize = this.sceneWidth / 20
        this.top = (this.sceneHeight - (this.gridSize * 10)) / 2

        this.nodeRadius = 5
        this.onStart = false

        this.scene = new Scene(this.sceneWidth, this.sceneHeight, root)
        this.scene.add(this)

        this.buildingNames = document.querySelector('.building__container-names')
        this.buttonValidate = document.querySelector('.btn__main--hidden')

        this.buildingNames.style.top = `${this.top}px`
        this.buttonValidate.style.bottom = `${this.top / 2}px`

        this.init()

        this.resize = this.resize.bind(this)
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.update = this.update.bind(this)

        this.addListeners()

    }

    /**
	 * @method
	 * @name init
	 */
    init() {

        this.currentId = 0
        this.end = false
        this.answer = ''

        this.setNodes()
        this.draw()

        TweenMax.to(this.buttonValidate, 0.3, {display: 'none', opacity: 0})

    }

    /**
	 * @method
	 * @name setNodes
     * @description Set the nodes position
	 */
    setNodes() {

        // Church
        this.nodesChurch = [
            {
                x: this.gridSize * 4,
                y: this.gridSize * 1 + this.top
            },
            {
                x: this.gridSize * 6,
                y: this.gridSize * 1 + this.top
            },
            {
                x: this.gridSize * 6,
                y: this.gridSize * 3 + this.top
            },
            {
                x: this.gridSize * 8,
                y: this.gridSize * 3 + this.top
            },
            {
                x: this.gridSize * 8,
                y: this.gridSize * 5 + this.top
            },
            {
                x: this.gridSize * 6,
                y: this.gridSize * 5 + this.top
            },
            {
                x: this.gridSize * 6,
                y: this.gridSize * 8.5 + this.top
            },
            {
                x: this.gridSize * 4,
                y: this.gridSize * 8.5 + this.top
            },
            {
                x: this.gridSize * 4,
                y: this.gridSize * 5 + this.top
            },
            {
                x: this.gridSize * 2,
                y: this.gridSize * 5 + this.top
            },
            {
                x: this.gridSize * 2,
                y: this.gridSize * 3 + this.top
            },
            {
                x: this.gridSize * 4,
                y: this.gridSize * 3 + this.top
            }
        ]

        // Market
        this.nodesMarket = [
            {
                x: this.gridSize * 14,
                y: this.gridSize * 3 + this.top
            },
            {
                x: this.gridSize * 14,
                y: this.gridSize * 2 + this.top
            },
            {
                x: this.gridSize * 16,
                y: this.gridSize * 2 + this.top
            },
            {
                x: this.gridSize * 16,
                y: this.gridSize * 4 + this.top
            },
            {
                x: this.gridSize * 12,
                y: this.gridSize * 4 + this.top
            },
            {
                x: this.gridSize * 12,
                y: this.gridSize * 8 + this.top
            },
            {
                x: this.gridSize * 18,
                y: this.gridSize * 8 + this.top
            },
            {
                x: this.gridSize * 18,
                y: this.gridSize * 4 + this.top
            }
        ]

        this.roads = [this.nodesChurch, this.nodesMarket]

        this.currentRoad = this.currentRoad || this.roads[0]

        this.cursor = {
            x: this.currentRoad[this.currentId].x,
            y: this.currentRoad[this.currentId].y
        }

    }

    /**
	 * @method
	 * @name draw
     * @description Draw the elements
	 */
    draw() {

        this.clear()

        // LINES
        this.lineStyle(1, 0x6C707B)
        for (let road of this.roads) {
            this.moveTo(road[0].x, road[0].y)
            for (let i = 1; i < road.length; i++) {
                this.lineTo(road[i].x, road[i].y)
            }
        }
        this.endFill()

        // LINES TO CURSOR
        this.lineStyle(2, 0xFFFFFF)
        this.moveTo(this.currentRoad[0].x, this.currentRoad[0].y)
        for (let i = 1; i <= this.currentId; i++) {
            this.lineTo(this.currentRoad[i].x, this.currentRoad[i].y)
        }
        this.lineTo(this.cursor.x, this.cursor.y) // CURSOR
        this.endFill()

        // NODES
        this.lineStyle(2, 0xFFFFFF)
        for (let road of this.roads) {
            for (let id in road) {
                const node = road[id]
                if (id == 0 || id <= this.currentId && isEqual(road, this.currentRoad)) {
                    this.beginFill(0xFF5951)
                } else {
                    this.beginFill(0xFFFFFF)
                }
                this.drawCircle(node.x, node.y, this.nodeRadius)
            }
        }
        this.endFill()

    }

    /**
	 * @method
     * @name drag
     * @description Calculate the cursor position before drawing the elements
	 */
    drag() {

        // Limit X
        const pointLeftX = Math.min(this.currentRoad[this.currentId].x, this.currentRoad[this.currentId + 1].x)
        const pointRightX = Math.max(this.currentRoad[this.currentId].x, this.currentRoad[this.currentId + 1].x)
        if (this.mouseX < pointLeftX) {
            this.mouseX = pointLeftX
        }
        else if (this.mouseX > pointRightX) {
            this.mouseX = pointRightX
        }
        // Limit Y
        const pointTopY = Math.min(this.currentRoad[this.currentId].y, this.currentRoad[this.currentId + 1].y)
        const pointBottomY = Math.max(this.currentRoad[this.currentId].y, this.currentRoad[this.currentId + 1].y)
        if (this.mouseY < pointTopY) {
            this.mouseY = pointTopY
        }
        else if (this.mouseY > pointBottomY) {
            this.mouseY = pointBottomY
        }

        // Drag on X
        if (this.currentRoad[this.currentId].x != this.currentRoad[this.currentId + 1].x) {
            this.cursor.x = this.mouseX
        }
        // Drag on Y
        else {
            this.cursor.y = this.mouseY
        }

        // Check cursor position
        if (this.cursor.x == this.currentRoad[this.currentId + 1].x && this.cursor.y == this.currentRoad[this.currentId + 1].y) {
            this.currentId++
            if (this.currentId < this.currentRoad.length - 1) {
                this.setNodes()
            }
            else {
                this.end = true
            }
        }

        this.draw()

    }

    /**
    * @method
    * @name resize
    * @description Triggered when the window is resized
    */
    resize() {

        if (window.innerWidth > 1400) {
            this.sceneWidth = (window.innerWidth * 70) / 100
		} else {
			this.sceneWidth = (window.innerWidth * 66) / 100
		}
        this.sceneHeight = window.innerHeight
        this.asideWidth = window.innerWidth - this.sceneWidth
        this.gridSize = this.sceneWidth / 20
        this.top = (this.sceneHeight - (this.gridSize * 10)) / 2

        this.buildingNames.style.top = `${this.top}px`
        this.buttonValidate.style.bottom = `${this.top / 2}px`

        this.scene.resize(this.sceneWidth, this.sceneHeight)

        this.init()
        this.setNodes()
        this.draw()

    }

    /**
    * @method
    * @name onMouseDown
    * @description Triggered when the user clicks
    */
    onMouseDown() {

        // Start a new drag
        if (Math.abs(this.mouseX - this.nodesChurch[0].x) < this.nodeRadius && Math.abs(this.mouseY - this.nodesChurch[0].y) < this.nodeRadius) {
            this.currentRoad = this.nodesChurch
            this.init()
            this.dragging = true
        }
        else if (Math.abs(this.mouseX - this.nodesMarket[0].x) < this.nodeRadius && Math.abs(this.mouseY - this.nodesMarket[0].y) < this.nodeRadius) {
            this.currentRoad = this.nodesMarket
            this.init()
            this.dragging = true
        }

    }

    /**
    * @method
    * @name onMouseUp
    * @description Triggered when the user releases the click
    */
    onMouseUp() {

        this.dragging = false

        if (!this.end) {
            this.init()
        } else {
            if (isEqual(this.currentRoad, this.nodesChurch)) {
                this.answer = 'eglise'
            } else {
                this.answer = 'marche'
            }
            TweenMax.to(this.buttonValidate, 0.3, {display: 'block', opacity: 1})
        }

    }

    /**
    * @method
    * @name onMouseMove
    * @description Triggered when the mouse moves
    * @param {object} e - event
    */
    onMouseMove(e) {

        const event = e || window.e

        this.mouseX = event.clientX - this.asideWidth
        this.mouseY = event.clientY

        if (this.dragging && !this.end) {
            this.drag()
        }

        // Detect if the mouse position is on a start node
        if ((Math.abs(this.mouseX - this.nodesChurch[0].x) < this.nodeRadius && Math.abs(this.mouseY - this.nodesChurch[0].y) < this.nodeRadius) || (Math.abs(this.mouseX - this.nodesMarket[0].x) < this.nodeRadius && Math.abs(this.mouseY - this.nodesMarket[0].y) < this.nodeRadius)) {
            this.onStart = true
        } else {
            this.onStart = false
        }

    }

    /**
    * @method
    * @name update
    * @description Triggered on every TweenMax tick
    */
    update() {

        // Cursor style
        if (this.onStart && !this.dragging) {
            document.body.style.cursor = 'pointer'
        }
        else if (this.dragging) {
            document.body.style.cursor = 'move'
        }
        else {
            document.body.style.cursor = 'default'
        }

        this.scene.render()

    }

    /**
    * @method
    * @name addListeners
    */
    addListeners() {

        window.addEventListener('resize', this.resize)
        window.addEventListener('mousedown', this.onMouseDown)
        window.addEventListener('mouseup', this.onMouseUp)
        window.addEventListener('mousemove', this.onMouseMove)
        TweenMax.ticker.addEventListener('tick', this.update)

    }

    /**
    * @method
    * @name removeListeners
    */
    removeListeners() {

        window.removeEventListener('resize', this.resize)
        window.removeEventListener('mousedown', this.onMouseDown)
        window.removeEventListener('mouseup', this.onMouseUp)
        window.removeEventListener('mousemove', this.onMouseMove)
        TweenMax.ticker.removeEventListener('tick', this.update)

    }

}

export default Interaction2A
