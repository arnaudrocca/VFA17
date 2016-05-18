import { Graphics } from 'pixi.js'
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

        this.scene = new Scene(this.containerWidth, this.containerHeight)

        this.init()

        this.scene.add(this)

        this.addListeners()

    }

    /**
	 * @method
	 * @name init
	 */
    init() {

        this.mousePressed = false
        this.end = false
        this.currentId = 0

        this.setDots()
        this.draw()

    }

    /**
	 * @method
	 * @name setDots
	 */
    setDots() {

        this.dotsLeft = [
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

        this.dotsRight = [
            {
                x: this.containerWidth * 6 / 10,
                y: this.containerHeight / 10
            },
            {
                x: this.containerWidth * 9 / 10,
                y: this.containerHeight / 10
            },
            {
                x: this.containerWidth * 9 / 10,
                y: this.containerHeight / 2
            },
            {
                x: this.containerWidth * 6 / 10,
                y: this.containerHeight / 2
            },
            {
                x: this.containerWidth * 6 / 10,
                y: this.containerHeight * 9 / 10
            },
            {
                x: this.containerWidth * 9 / 10,
                y: this.containerHeight * 9 / 10
            }
        ]

        // HAVE TO CHANGE
        this.dots = this.dotsRight

        this.cursor = {
            x: this.dots[this.currentId].x,
            y: this.dots[this.currentId].y
        }

    }

    /**
	 * @method
	 * @name draw
	 */
    draw() {

        this.clear()

        // ROAD
        this.lineStyle(2, 0x666666)
        this.moveTo(this.dots[0].x, this.dots[0].y) // FIRST
        for (let i = 1; i < this.dots.length; i++) {
            this.lineTo(this.dots[i].x, this.dots[i].y)
        }
        this.endFill()

        // LINES
        this.lineStyle(3, 0xFFFFFF)
        this.moveTo(this.dots[0].x, this.dots[0].y) // FIRST
        for (let i = 1; i <= this.currentId; i++) {
            this.lineTo(this.dots[i].x, this.dots[i].y)
        }
        this.lineTo(this.cursor.x + .01, this.cursor.y + .01) // CURSOR
        this.endFill()

        if (this.cursor.x == this.dots[this.currentId + 1].x && this.cursor.y == this.dots[this.currentId + 1].y) {
            this.currentId++
            if (this.currentId < this.dots.length - 1) {
                this.setDots()
            }
            else {
                this.end = true
            }
        }

        // DOTS
        this.lineStyle(0, 0xFFFFFF)
        for (let id in this.dots) {
            const dot = this.dots[id]
            if (id <= this.currentId) {
                this.beginFill(0x0000FF)
                this.drawCircle(dot.x, dot.y, 3)
            }
            else if (id == this.currentId + 1) {
                this.beginFill(0xFFFFFF)
                this.drawCircle(dot.x, dot.y, 5)
            }
            else {
                this.beginFill(0xFFFFFF)
                this.drawCircle(dot.x, dot.y, 3)
            }
        }

    }

    /**
	 * @method
     * @name onDrag
     * @param {number} mouseX
     * @param {number} mouseY
	 */
    onDrag(mouseX, mouseY) {

        // LIMIT X
        const pointLeftX = Math.min(this.dots[this.currentId].x, this.dots[this.currentId + 1].x)
        const pointRightX = Math.max(this.dots[this.currentId].x, this.dots[this.currentId + 1].x)
        if (mouseX < pointLeftX) {
            mouseX = pointLeftX
        }
        else if (mouseX > pointRightX) {
            mouseX = pointRightX
        }

        // LIMIT Y
        const pointTopY = Math.min(this.dots[this.currentId].y, this.dots[this.currentId + 1].y)
        const pointBottomY = Math.max(this.dots[this.currentId].y, this.dots[this.currentId + 1].y)
        if (mouseY < pointTopY) {
            mouseY = pointTopY
        }
        else if (mouseY > pointBottomY) {
            mouseY = pointBottomY
        }

        // MOVE X
        if (this.dots[this.currentId].x != this.dots[this.currentId + 1].x) {
            this.cursor.x = mouseX
        }
        // MOVE Y
        else {
            this.cursor.y = mouseY
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

        this.mousePressed = true

    }

    /**
    * @method
    * @name onMouseUp
    * @description Triggered when the user releases the click
    */
    onMouseUp() {

        this.mousePressed = false

        if (!this.end) {
            this.init()
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

        if (this.mousePressed && !this.end) {
            this.onDrag(this.mouseX, this.mouseY)
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
