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

	}

	/**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		if (window.innerWidth > 1400) {
			this.asideWidth = '24%'
			this.interactionWidth = '76%'
		} else {
			this.asideWidth = '34%'
			this.interactionWidth = '66%'
		}

		const introTimeline = new TimelineLite()

		introTimeline.fromTo('.choice__aside', 1, {
			width: 20
		}, {
			width: this.asideWidth,
			ease: Expo.easeOut
		})
		introTimeline.fromTo('.choice__interaction', 1.2, {
			width: 0
		}, {
			width: this.interactionWidth,
			ease: Expo.easeOut
		}, '-=0.8')
		introTimeline.fromTo('.choice__interaction-background', 0.8, {
			x: -10,
			scale: 1.1
		}, {
			x: 0,
			scale: 1,
			ease: Expo.easeOut
		}, '-=1')
		.from('.choice__description', 0.3, {
			x: -20,
			opacity: 0
		}, '-=0.9')

		this.choiceAside = ReactDOM.findDOMNode(this.refs.choiceAside)
		this.choiceInteraction = ReactDOM.findDOMNode(this.refs.choiceInteraction)

		window.addEventListener('resize', debounce(this.resize.bind(this), 350))

	}

	/**
	 * @method
	 * @name componentWillUnmount
	 */
	componentWillUnmount() {

		window.removeEventListener('resize', this.resize.bind(this))

	}

	/**
	 * @method
	 * @name resize
	 */
	resize() {

		if (window.innerWidth > 1400) {
			this.choiceAside.style.width = '24%'
			this.choiceInteraction.style.width = '76%'
		} else {
			this.choiceAside.style.width = '34%'
			this.choiceInteraction.style.width = '66%'
		}

	}

	/**
	 * @method
	 * @name getContent
	 */
	getContent() {

		//Identifies wich choice to display
		this.choiceId = this.props.params.id

		const currentChoice = this.props.choicesState.find((choice) => {
			return choice.id == this.choiceId
		})

		this.choiceVersion = currentChoice.version

		//Identifies the correct interaction
		const componentName = 'Choice' + this.choiceId + this.choiceVersion

		for (let choiceComponent in ChoicesComponents) {
			if (choiceComponent == componentName) {
				this.component = ChoicesComponents[choiceComponent]
				break
			}
		}

		//Identifies the correct wording to use
		this.choiceData = choicesData.find((choice) => {
			return choice.id == this.choiceId && choice.version == this.choiceVersion
		})

		//Identifies the correct background image
		this.backgroundStyle = {
			backgroundImage: `url(assets/images/choices/${componentName}.png)`
		}

	}

	/**
	 * @method
	 * @name returnToMap
	 */
	returnToMap() {

		hashHistory.push('/experiment')

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
					<button className="choice__btn-return" type="button" onClick={this.returnToMap.bind(this)}>
						<span>Retour à la ville</span>
						<svg x="0px" y="0px" viewBox="-6.4 -6.5 224.8 65" >
							<g className="choice__btn-return__border">
								<g>
									<path fill="#495495" d="M173.1,50H23V2h166v32L173.1,50z M25,48h147.3L187,33.2V4H25C25,4,25,48,25,48z"/>
								</g>
							</g>
							<g className="choice__btn-return__fill">
								<polygon fill="#FF5951" points="170.7,46 27,46 27,6 185,6 185,31.7 	"/>
							</g>
						</svg>
					</button>
					<div className="choice__description">
						<span className ="choice__description__date">{this.choiceData.period}</span>
						<h1 className ="choice__description__title">{this.choiceData.title}</h1>
						<p className ="choice__description__context">{this.choiceData.context}</p>
					</div>
				</div>
				<div className="choice__interaction" ref="choiceInteraction">
					<div className="choice__interaction-background" style={this.backgroundStyle}></div>
					<this.component choiceData={this.choiceData} id={this.choiceId} submitHandler={this.props.onSubmit}/>
				</div>
			</div>
		)

	}

}

export default Choice
