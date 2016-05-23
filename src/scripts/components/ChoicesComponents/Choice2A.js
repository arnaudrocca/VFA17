import React from 'react'
import ReactDOM from 'react-dom'
import ChoiceIntro from '../ChoiceIntro'
import Interaction2A from '../../partials/interactions/Interaction2A'

class Choice2A extends React.Component {

    /**
     * @constructor
     */
	constructor() {

		super()

	}

    /**
	 * @method
	 * @name clickHandler
	 */
	clickHandler() {

		const root = ReactDOM.findDOMNode(this.refs.root)
		this.interaction = new Interaction2A()
		root.appendChild(this.interaction.scene.renderer.view)

	}

    /**
	 * @method
	 * @name handleSubmit
	 */
	handleSubmit() {

		this.interaction.removeListeners()

		this.props.submitHandler(this.props.id, this.interaction.answer)

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
					<div className="building">
						<p>Église</p>
						<p>Marché</p>
					</div>
					<div className="choice__interaction-main--root" ref="root"></div>
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

export default Choice2A
