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

        this.itemsNumber =  5

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
	 */
	createDrag() {

		if (window.innerWidth > 1400) {
			this.mainWidth = (window.innerWidth * 76) / 100
		} else {
			this.mainWidth = (window.innerWidth * 66) / 100
		}
		this.mainHeight = window.innerHeight

		const itemTransitionTimeline = new TimelineLite()

		const cursorRadius = 25
		const lineWidth = (this.mainWidth / 2) * .75
		const lineLeftOffset = (((this.mainWidth - lineWidth) / 2) + (window.innerWidth - this.mainWidth))
		const columnWidth = lineWidth / this.itemsNumber

		const self = this

		let lastId = Math.floor(this.itemsNumber / 2)
		TweenMax.to(self.sliderItems[lastId], .2, {display: 'block', opacity: 1})

		Draggable.create(this.cursor, {
			type: 'x',
			edgeResistance: .95,
			bounds: {
				minX: -lineWidth + cursorRadius,
				maxX: lineWidth - cursorRadius
			},
			zIndex: 1000,
			zIndexBoost: false,
			onDrag: throttle(function() {
				const selectedId = Math.floor(((this.x + lineWidth) / columnWidth) / 2)

				if (selectedId != lastId) {
					const lastItem = self.sliderItems[lastId]
					const currentItem = self.sliderItems[selectedId]

					itemTransitionTimeline
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

				if (selectedId <= Math.floor(self.itemsNumber / 2)) {
					self.answer = 'jeunes'
				} else {
					self.answer = 'vieux'
				}

				lastId = selectedId
			}, 150)
		})

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
    					<span ref="cursor" className="propaganda__cursor"></span>
						<ChoiceValidate handleSubmit={this.handleSubmit.bind(this)} class="choice__main-btn choice__main-btn--validate choice__main-btn--3A"/>
                    </div>
				</div>
			</div>
		)

	}

}

export default Choice3A
