import React from 'react'
import ReactDOM from 'react-dom'
import { debounce, throttle } from 'lodash'
import ChoiceIntro from '../ChoiceIntro'
import ChoiceValidate from '../ChoiceValidate'

class Choice3A extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

        this.itemsNumber = 5
		this.cursorRadius = 25

		this.itemTransitionTimeline = new TimelineLite()

		this.onDrag = this.onDrag.bind(this)
        this.createDrag = this.createDrag.bind(this)

	}

    /**
     * @method
     * @name componentDidMount
     */
	componentDidMount() {

		this.cursor = ReactDOM.findDOMNode(this.refs.cursor)
        this.sliderItems = document.querySelectorAll('.propaganda__slider__item')

	}

    /**
     * @method
     * @name componentWillUnMount
     */
    componentWillUnMount() {

        window.removeEventListener('resize', this.createDrag)

    }

	/**
	 * @method
	 * @name clickHandler
	 */
	clickHandler() {

		this.answer = ''

		this.createDrag()

		window.addEventListener('resize', debounce(this.createDrag, 350))

	}

	/**
	 * @method
	 * @name createDrag
	 * @description Create the drag using Draggable
	 */
	createDrag() {

		if (window.innerWidth > 1400) {
			this.mainWidth = (window.innerWidth * 70) / 100
		} else {
			this.mainWidth = (window.innerWidth * 66) / 100
		}
		this.mainHeight = window.innerHeight

		this.lineWidth = (this.mainWidth / 2) * .75
		this.columnWidth = this.lineWidth / this.itemsNumber

		this.lastId = Math.floor(this.itemsNumber / 2)
		TweenMax.to(this.sliderItems[this.lastId], .2, {display: 'block', opacity: 1})

		this.dragChoice = Draggable.create(this.cursor, {
			type: 'x',
			edgeResistance: .99,
			bounds: {
				minX: -this.lineWidth + this.cursorRadius,
				maxX: this.lineWidth - this.cursorRadius
			},
			zIndex: 1000,
			zIndexBoost: false,
			onPress: () => {
				document.body.style.cursor = 'ew-resize'
				this.cursor.classList.add('is-active')
				TweenMax.to('.btn__main--hidden' , 0.3, {opacity: 1, display: 'block'})
			},
			onDrag: throttle(() => {
				this.onDrag()
			}, 350),
			onRelease: () => {
				document.body.style.cursor = 'default'
				this.cursor.classList.remove('is-active')
			}
		})

	}

	/**
	 * @method
	 * @name onDrag
	 * @description Triggered when the drag is moving
	 */
	onDrag() {

		const selectedId = Math.floor(((this.dragChoice[0].x + this.lineWidth) / this.columnWidth) / 2)

		if (selectedId != this.lastId) {
			const lastItem = this.sliderItems[this.lastId]
			const currentItem = this.sliderItems[selectedId]

			this.itemTransitionTimeline
				.to(lastItem, .5, {
					display: 'none',
					opacity: 0,
					scale: 1.2
				})
				.to(currentItem, .5, {
					display: 'block',
					opacity: 1,
					scale: 1
				}, '-=.5')
		}

		if (selectedId <= Math.floor(this.itemsNumber / 2)) {
			this.answer = 'jeunes'
		} else {
			this.answer = 'vieux'
		}

		this.lastId = selectedId

	}

	/**
	 * @method
	 * @name handleSubmit
	 */
	handleSubmit() {

		this.props.submitHandler(this.props.id, this.answer)

	}

	/**
     * @method
	 * @name render
     */
	render() {

		return (
			<div className="choice__interaction-container">
				<ChoiceIntro clickHandler={this.clickHandler.bind(this)} title={this.props.choiceData.introTitle} text={this.props.choiceData.introText}/>
				<div className="choice__interaction-main choice__interaction-main">
                    <div className="propaganda">
                        <div className="propaganda__slider">
                            <img className="propaganda__slider__item" src="assets/images/interactions/baby.svg"/>
                            <img className="propaganda__slider__item" src="assets/images/interactions/teen.svg"/>
                            <img className="propaganda__slider__item" src="assets/images/interactions/adult.svg"/>
                            <img className="propaganda__slider__item" src="assets/images/interactions/old.svg"/>
                            <img className="propaganda__slider__item" src="assets/images/interactions/dead.svg"/>
                        </div>
    					<span className="propaganda__line"></span>
    					<span className="propaganda__cursor" ref="cursor"></span>
						<ChoiceValidate classes="btn__main btn__main--hidden btn__main--3A" handleSubmit={this.handleSubmit.bind(this)} label="Valider" labelSecondary="Endoctriner" />
                    </div>
				</div>
			</div>
		)

	}

}

export default Choice3A
