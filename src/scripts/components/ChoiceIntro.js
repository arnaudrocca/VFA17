import React from 'react'
import ChoiceValidate from './ChoiceValidate'

class ChoiceIntro extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.transitionTimeline = new TimelineLite()

	}

	/**
     * @method
	 * @name clickHandler
     */
	clickHandler() {

		this.transitionTimeline
			.to('.choice__interaction-intro', .6, {display: 'none', opacity: 0})
			.to('.choice__interaction-main', .6, {display: 'block', opacity: 1})

		if (typeof this.props.clickHandler === 'function') {
			this.props.clickHandler()
		}

	}

	/**
     * @method
	 * @name render
     */
	render() {

		return (
			<div className="choice__interaction-intro">
				<h2 className="choice__interaction-intro__title">{this.props.title}</h2>
				<p className="choice__interaction-intro__text">
					{this.props.text}
				</p>
				<ChoiceValidate classes="btn__main choice__interaction-intro__btn" handleSubmit={this.clickHandler.bind(this)} label="Valider" labelSecondary="OK"/>
			</div>
		)

	}

}

export default ChoiceIntro
