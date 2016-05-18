import { Graphics } from 'pixi.js'
import { isEqual } from 'lodash'
import Scene from '../../utils/scene'

class Interaction2A extends Graphics {

    /**
     * @constructor
     */
    constructor() {

        super()

        this.containerWidth = (window.innerWidth * 66) / 100
        this.containerHeight = window.innerHeight
        this.contextWidth = window.innerWidth - this.containerWidth

        this.dotRadius = 5

        this.scene = new Scene(this.containerWidth, this.containerHeight)
        this.scene.add(this)

        this.addListeners()
        this.init()

    }

    /**
	 * @method
	 * @name init
	 */
    init() {

        this.dragging = false
        this.currentId = 0
        this.end = false

        this.setDots()
        this.draw()

    }

    /**
	 * @method
	 * @name setDots
	 */
    setDots() {

        this.dotsChurch = [
            {
                x: this.containerWidth / 10,
                y: this.containerHeight / 10
            },
            {
                x: this.containerWidth * 4 / 10,
                y: this.containerHeight / 10
            },
            {
                x: this.containerWidth * 4 / 10,
                y: this.containerHeight / 2
            },
            {
                x: this.containerWidth / 10,
                y: this.containerHeight / 2
            },
            {
                x: this.containerWidth / 10,
                y: this.containerHeight * 9 / 10
            },
            {
                x: this.containerWidth * 4 / 10,
                y: this.containerHeight * 9 / 10
            }
        ]

        this.dotsMarket = [
            {
                x: this.containerWidth * 9 / 10,
                y: this.containerHeight / 10
            },
            {
                x: this.containerWidth * 6 / 10,
                y: this.containerHeight / 10
            },
            {
                x: this.containerWidth * 6 / 10,
                y: this.containerHeight / 2
            },
            {
                x: this.containerWidth * 9 / 10,
                y: this.containerHeight / 2
            },
            {
                x: this.containerWidth * 9 / 10,
                y: this.containerHeight * 9 / 10
            },
            {
                x: this.containerWidth * 6 / 10,
                y: this.containerHeight * 9 / 10
            }
        ]

        this.allDots = [this.dotsChurch, this.dotsMarket]

        this.currentRoad = this.currentRoad || this.allDots[0]

        this.cursor = {
            x: this.currentRoad[this.currentId].x,
            y: this.currentRoad[this.currentId].y
        }

    }

    /**
	 * @method
	 * @name draw
	 */
    draw() {

        this.clear()

        // LINES
        for (let road of this.allDots) {
            this.lineStyle(1, 0x6C707B)
            this.moveTo(road[0].x, road[0].y)
            for (let i = 1; i < road.length; i++) {
                this.lineTo(road[i].x, road[i].y)
            }
            this.endFill()
        }

        // LINES TO CURSOR
        this.lineStyle(2, 0xFFFFFF)
        this.moveTo(this.currentRoad[0].x, this.currentRoad[0].y)
        for (let i = 1; i <= this.currentId; i++) {
            this.lineTo(this.currentRoad[i].x, this.currentRoad[i].y)
        }
        this.lineTo(this.cursor.x + .01, this.cursor.y + .01) // CURSOR
        this.endFill()

        // DOTS
        for (let road of this.allDots) {
            this.lineStyle(2, 0xFFFFFF)
            for (let id in road) {
                const dot = road[id]
                if (id == 0 || id <= this.currentId && isEqual(road, this.currentRoad)) {
                    this.beginFill(0xFF5951)
                } else {
                    this.beginFill(0xFFFFFF)
                }
                this.drawCircle(dot.x, dot.y, this.dotRadius)
            }
            this.endFill()
        }

    }

    /**
	 * @method
     * @name drag
	 */
    drag() {

        // LIMIT X
        const pointLeftX = Math.min(this.currentRoad[this.currentId].x, this.currentRoad[this.currentId + 1].x)
        const pointRightX = Math.max(this.currentRoad[this.currentId].x, this.currentRoad[this.currentId + 1].x)
        if (this.mouseX < pointLeftX) {
            this.mouseX = pointLeftX
        }
        else if (this.mouseX > pointRightX) {
            this.mouseX = pointRightX
        }
        // LIMIT Y
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

        // Increment current id
        if (this.cursor.x == this.currentRoad[this.currentId + 1].x && this.cursor.y == this.currentRoad[this.currentId + 1].y) {
            this.currentId++
            if (this.currentId < this.currentRoad.length - 1) {
                this.setDots()
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
    * @description Triggered when window is resized
    */
    resize() {

        this.containerWidth = (window.innerWidth * 66) / 100
        this.containerHeight = window.innerHeight
        this.contextWidth = window.innerWidth - this.containerWidth

        this.scene.resize(this.containerWidth, this.containerHeight)

        this.setDots()
        this.draw()

    }

    /**
    * @method
    * @name onMouseDown
    * @description Triggered when the user clicks
    */
    onMouseDown() {

        this.init()

        // Determine the current road
        if (this.mouseX < this.containerWidth / 2) {
            this.currentRoad = this.allDots[0]
        } else {
            this.currentRoad = this.allDots[1]
        }

        if (Math.abs(this.mouseX - this.currentRoad[0].x) < this.dotRadius && Math.abs(this.mouseY - this.currentRoad[0].y) < this.dotRadius) {
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
            TweenMax.to('.choice__interaction-validate', 1, {display: 'block', opacity: 1})
            if (isEqual(this.currentRoad, this.dotsChurch)) {
                this.answer = 'eglise'
            } else {
                this.answer = 'marche'
            }
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

        this.mouseX = event.clientX - this.contextWidth
        this.mouseY = event.clientY

        if (this.dragging && !this.end) {
            this.drag()
        }

    }

    /**
    * @method
    * @name addListeners
    */
    addListeners() {

        window.addEventListener('resize', this.resize.bind(this))
        window.addEventListener('mousedown', this.onMouseDown.bind(this))
        window.addEventListener('mouseup', this.onMouseUp.bind(this))
        window.addEventListener('mousemove', this.onMouseMove.bind(this))
        TweenMax.ticker.addEventListener('tick', this.update.bind(this))

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

    /**
    * @method
    * @name update
    * @description Triggered on every TweenMax tick
    */
    update() {

        this.scene.render()

    }

}

export default Interaction2A
