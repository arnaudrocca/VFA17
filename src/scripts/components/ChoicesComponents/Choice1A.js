import React from 'react'
import ReactDOM from 'react-dom'
import ChoiceIntro from '../ChoiceIntro'
import IconRedo from '../iconsComponents/icon-redo'

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

	// showButton() {
	//
	// 	TweenMax.to('.choice__main-btn--validate', 0.3, {display: 'block', opacity: 1})
	//
	// }

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
					<div className="voice">
						<button onClick={this.init.bind(this)} className="voice__redo-btn" type="button">
							<IconRedo width="25" color="#FFFFFF" />
						</button>
						<div className="voice__audiovisualizer">
							<div className="voice__level voice__level--ghost">
								<span className="voice__level__label">Fantôme</span>
								<span className="voice__level__gauge"></span>
							</div>
							<div className="voice__slider">
								<img className="voice__slider__item" src="http://lorempicsum.com/simpsons/200/200/1"/>
								<img className="voice__slider__item" src="http://lorempicsum.com/simpsons/200/200/2"/>
							</div>
							<div className="voice__level voice__level--god">
								<span className="voice__level__label">Dieu</span>
								<span className="voice__level__gauge"></span>
							</div>
						</div>
						<button onClick={this.handleSubmit.bind(this)} className="choice__main-btn choice__main-btn--validate choice__main-btn--1A" type="button">
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
			</div>
		)

	}

}

export default Choice1A
