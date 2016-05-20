import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory, Link } from 'react-router'
import * as ChoicesComponents from './ChoicesComponents'
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

		let introTimeline = new TimelineLite()

		introTimeline.fromTo('.choice__aside', 1, {
			width: 20
		}, {
			width: '34%',
			ease: Expo.easeOut
		})
		introTimeline.fromTo('.choice__interaction', 1.2, {
			width: 0
		}, {
			width: '66%',
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
		// const componentName = 'Choice' + this.choiceId + this.choiceVersion
		const componentName = 'Choice2A'

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
				<div className="choice__aside">
					<button className="choice__btn-return" type="button" onClick={this.returnToMap.bind(this)}>
						Retour à la ville
						<svg x="0px" y="0px" width="160" viewBox="0 0 160 40">
						<g>
							<polygon fill="transparent" points="145,40 0,40 0,0 160,0 160,30"/>
							<path fill="#495495" opacity="0.2" d="M158,2v26.9L144.4,38H2V2H158 M160,0H0v40h145l15-10V0L160,0z"/>
						</g>
					</svg>
				</button>
					<div className="choice__description">
						<span className ="choice__description__date">{this.choiceData.period}</span>
						<h1 className ="choice__description__title">{this.choiceData.title}</h1>
						<p className ="choice__description__context">{this.choiceData.context}</p>
					</div>
				</div>
				<div className="choice__interaction">
					<div className="choice__interaction-background" style={this.backgroundStyle}></div>
					<this.component id={this.choiceId} submitHandler={this.props.onSubmit}/>
				</div>
			</div>
		)

	}

}

export default Choice
