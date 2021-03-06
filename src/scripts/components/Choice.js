import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory, Link } from 'react-router'
import { debounce } from 'lodash'
import * as ChoicesComponents from './ChoicesComponents'
import ChoiceIntro from './ChoiceIntro'
import choicesData from '../data/choices.json'

class Choice extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.introTimeline = new TimelineLite({paused: true})
		this.resize = this.resize.bind(this)

	}

	/**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		this.choiceAsideNode = ReactDOM.findDOMNode(this.refs.choiceAside)
		this.choiceInteractionNode = ReactDOM.findDOMNode(this.refs.choiceInteraction)
		this.audioButtonNode = ReactDOM.findDOMNode(this.refs.audioButton)

		if (window.innerWidth > 1400) {
			this.asideWidth = '30%'
			this.interactionWidth = '70%'
		} else {
			this.asideWidth = '34%'
			this.interactionWidth = '66%'
		}

		this.introTimeline
			.fromTo('.choice__aside', 1.4, {
				width: 0
			}, {
				width: this.asideWidth,
				ease: Expo.easeOut
			})
			.fromTo('.choice__interaction', 1.4, {
				width: 0
			}, {
				width: this.interactionWidth,
				ease: Expo.easeOut
			}, '-=1.2')
			.from('.choice__description', 0.5, {
				x: -20,
				opacity: 0,
				ease: Quad.easeOut
			}, '-=1.2')

		this.introTimeline.play()

		window.addEventListener('resize', debounce(this.resize, 350))

	}

	/**
	 * @method
	 * @name componentWillUnmount
	 */
	componentWillUnmount() {

		window.removeEventListener('resize', this.resize)

	}

	/**
	 * @method
	 * @name resize
	 */
	resize() {

		if (window.innerWidth > 1400) {
			this.choiceAsideNode.style.width = '30%'
			this.choiceInteractionNode.style.width = '70%'
		} else {
			this.choiceAsideNode.style.width = '34%'
			this.choiceInteractionNode.style.width = '66%'
		}

	}

	/**
	 * @method
	 * @name clickHandler
	 * @description Return to experiment
	 */
	clickHandler() {

		hashHistory.push('/experiment')

	}

	/**
	 * @method
	 * @name mouseEnterHandler
	 * @description Play button sound
	 */
	mouseEnterHandler() {

		if (window.enableAudio) {
			this.audioButtonNode.currentTime = 0
			this.audioButtonNode.play()
		}

	}

	/**
	 * @method
	 * @name getContent
	 */
	getContent() {

		this.choiceId = this.props.params.id

		const currentChoice = this.props.choicesState.find((choice) => {
			return choice.id == this.choiceId
		})

		this.choiceVersion = currentChoice.version

		const componentName = 'Choice' + this.choiceId + this.choiceVersion

		for (let choiceComponent in ChoicesComponents) {
			if (choiceComponent == componentName) {
				this.component = ChoicesComponents[choiceComponent]
				break
			}
		}

		this.choiceData = choicesData.find((choice) => {
			return choice.id == this.choiceId && choice.version == this.choiceVersion
		})

		this.backgroundStyle = {
			backgroundImage: `url(assets/images/choices/${componentName}.png)`
		}

	}

	/**
	 * @method
	 * @name render
	 */
	render() {

		this.getContent()

		return (
			<div className="choice">
				<div className="choice__aside" ref="choiceAside">
					<button className="btn__return" type="button" onClick={this.clickHandler.bind(this)} onMouseEnter={this.mouseEnterHandler.bind(this)}>
						<span className="btn__return__label-container">
							<span className="btn__return__label">Retour à la ville</span>
						</span>
						<svg x="0px" y="0px" viewBox="0 0 166 48">
							<g className="btn__return__border">
								<g>
									<path fill="#495495" d="M150.1,48H0V0h166v32L150.1,48z M2,46h147.3L164,31.2V2H2V46z"/>
								</g>
							</g>
							<g className="btn__return__fill">
								<polygon fill="#495495" points="147.7,44 4,44 4,4 162,4 162,29.7"/>
							</g>
						</svg>
					</button>
					<div className="choice__description">
						<span className ="choice__description__date">Année {this.choiceData.period}</span>
						<h1 className ="choice__description__title">{this.choiceData.title}</h1>
						<p className ="choice__description__context">{this.choiceData.context}</p>
					</div>
				</div>
				<div className="choice__interaction" ref="choiceInteraction">
					<div className="choice__interaction-background" style={this.backgroundStyle}></div>
					<this.component choiceData={this.choiceData} id={this.choiceId} choiceDone={this.props.onChoiceDone} submitHandler={this.props.onSubmit}/>
				</div>
				<audio ref="audioButton" src="assets/audio/button.wav" preload="auto"></audio>
			</div>
		)

	}

}

export default Choice
