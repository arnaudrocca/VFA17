import React from 'react'
import ReactDOM from 'react-dom'
import ChoiceIntro from '../ChoiceIntro'
import ChoiceValidate from '../ChoiceValidate'
import IconRedo from '../iconsComponents/icon-redo'
import IconMic from '../iconsComponents/icon-mic'
import Audio from '../../utils/audio'

class Choice1A extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.gaugeStep = .3
		this.ghostLimit = 45

		this.audio = new Audio()
		this.endTimeline = new TimelineLite()

		this.update = this.update.bind(this)

	}

	/**
     * @method
	 * @name componentWillUnmount
     */
	componentWillUnmount() {

		this.audio.stopAudioStream()

		TweenMax.ticker.removeEventListener('tick', this.update)

	}

	componentDidMount() {

		this.ghostImgNode = ReactDOM.findDOMNode(this.refs.ghostImg)
		this.godImgNode = ReactDOM.findDOMNode(this.refs.godImg)

		this.ghostLevelNode = ReactDOM.findDOMNode(this.refs.ghostLevel)
		this.godLevelNode = ReactDOM.findDOMNode(this.refs.godLevel)

	}

	/**
     * @method
	 * @name init
     */
	init() {

		this.answer = ''
		this.answerImg = null
		this.ghostGauge = 0
		this.godGauge = 0
		this.end = false
		this.endTimelineDone = false

	}

	/**
     * @method
	 * @name redo
     */
	redo() {

		// Scales audio
		this.endTimeline
			.to(this.answerImg, .3, {opacity: 0})
			.to('.voice__slider__visualizer', .3, {width: 30, height: 30, opacity: 1})
			.to('.voice__slider__icon', .3, {width: 60, height: 60, opacity: 1}, '-=.15')

		// Hides buttons
		TweenMax.to('.choice__main-btn--1A', .3, {opacity: 0, pointerEvents: 'none'})
		TweenMax.to('.voice__redo-btn', .3, {opacity: 0, pointerEvents: 'none'})

		// Removes active class
		this.ghostLevelNode.classList.remove('is-full')
		this.godLevelNode.classList.remove('is-full')

		this.init()

	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {

		if (!this.end) {
			const average = this.audio.getAverage()

			TweenMax.set('.voice__slider__visualizer', {width: `${30 + (average / 2)}%`, height:`${30 + (average / 2)}%`})

			// Increments gauges
			if (average >= 1 && average <= this.ghostLimit) {
				this.ghostGauge += this.gaugeStep
			} else if (average > this.ghostLimit) {
				this.godGauge += this.gaugeStep
			}

			// Detects end
			if (this.ghostGauge >= 100) {
				this.ghostGauge = 100
				this.answer = 'fantome'
				this.answerImg = this.ghostImgNode
				this.ghostLevelNode.classList.add('is-full')
				this.end = true
			} else if (this.godGauge >= 100) {
				this.godGauge = 100
				this.answer = 'divinite'
				this.answerImg = this.godImgNode
				this.godLevelNode.classList.add('is-full')
				this.end = true
			}

			// Update gauges
			TweenMax.set('.voice__level__gauge-ghost', {width: `${this.ghostGauge}%`})
			TweenMax.set('.voice__level__gauge-god', {width: `${this.godGauge}%`})
		}
		else if (!this.endTimelineDone) {
			// Displays buttons
			TweenMax.to('.choice__main-btn--1A', .3, {opacity: 1, pointerEvents: 'visible'})
			TweenMax.to('.voice__redo-btn', .3, {opacity: 1, pointerEvents: 'visible'})

			// Descales audio
			this.endTimeline
				.to('.voice__slider__icon', .3, {width: 0, height: 0, opacity: 0})
				.to('.voice__slider__visualizer', .3, {width: 0, height: 0, opacity: 0}, '-=.15')
				.to(this.answerImg, .3, {opacity: 1})

			this.endTimelineDone = true
		}

	}

	/**
	 * @method
	 * @name clickHandler
	 */
	clickHandler() {

		this.init()

		this.audio.readSound()

		TweenMax.ticker.addEventListener('tick', this.update)

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
				<div className="choice__interaction-main">
					<div className="voice">
						<button onClick={this.redo.bind(this)} className="voice__redo-btn" type="button">
							<IconRedo width="25" color="#FFFFFF" />
						</button>
						<div className="voice__audiovisualizer">
							<div ref="ghostLevel" className="voice__level voice__level--ghost">
								<span className="voice__level__label">Fantôme</span>
								<span className="voice__level__gauge voice__level__gauge-ghost"></span>
							</div>
							<div className="voice__slider">
								<img className="voice__slider__item" ref="ghostImg" src="http://lorempicsum.com/simpsons/200/200/1"/>
								<img className="voice__slider__item" ref="godImg" src="http://lorempicsum.com/simpsons/200/200/2"/>
								<div className="voice__slider__visualizer"></div>
								<div className="voice__slider__icon">
									<IconMic width="17" color="#FF5951"/>
								</div>
							</div>
							<div ref="godLevel" className="voice__level voice__level--god">
								<span className="voice__level__label">Divinité</span>
								<span className="voice__level__gauge voice__level__gauge-god"></span>
							</div>
						</div>
                        <ChoiceValidate handleSubmit={this.handleSubmit.bind(this)} class="choice__main-btn choice__main-btn--validate choice__main-btn--1A"/>
					</div>
				</div>
			</div>
		)

	}

}

export default Choice1A
