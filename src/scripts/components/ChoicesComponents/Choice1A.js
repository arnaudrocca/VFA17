import React from 'react'
import ReactDOM from 'react-dom'
import ChoiceIntro from '../ChoiceIntro'

class Choice1A extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.init()

	}

	/**
     * @method
	 * @name init
     */
	init() {

		this.answer = 'fantome'

	}

	showButton() {

		TweenMax.to('.choice__main-btn--validate', 0.3, {display: 'block', opacity: 1})

	}

	/**
     * @method
	 * @name handleSubmit
	 * @param {object} e - event
     */
	handleSubmit(e) {

		const event = e || window.e
		event.preventDefault()

		this.props.submitHandler(this.props.id, this.answer)

	}

	/**
	 * @method
	 * @name render
	 */
	render() {

		return (
			<div className="choice__interaction-container">
				<ChoiceIntro title={this.props.choiceData.introTitle} text={this.props.choiceData.introText}/>
				<div className="choice__interaction-main">

					<p onClick={this.showButton.bind(this)}>Suivant</p>

					<button onClick={this.handleSubmit.bind(this)} className="choice__main-btn choice__main-btn--validate choice__main-btn--2A" type="button">
						<span>Valider</span>
						<svg x="0px" y="0px" viewBox="1 2 122 48">
							<g className="choice__main-btn__border">
								<g>
									<path fill="#FFFFFF" d="M107.1,50H1V2h122v32.1L107.1,50z M3,48h103.3L121,33.3V4H3V48z"/>
								</g>
							</g>
							<g className="choice__main-btn__fill">
								<polygon fill="#FF5951" points="105.7,46 5,46 5,6 119,6 119,32.7"/>
							</g>
						</svg>
					</button>
				</div>
			</div>
		)

	}

}

export default Choice1A
