import React from 'react'
import ReactDOM from 'react-dom'
import ChoiceIntro from '../ChoiceIntro'
import ChoiceValidate from '../ChoiceValidate'
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
                        <ChoiceValidate handleSubmit={this.handleSubmit.bind(this)} class="choice__main-btn choice__main-btn--validate choice__main-btn--1A"/>
					</div>
				</div>
			</div>
		)

	}

}

export default Choice1A
