import React from 'react'
import ReactDOM from 'react-dom'
import ChoiceIntro from '../ChoiceIntro'
import ChoiceValidate from '../ChoiceValidate'
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
						<p className="building__name">Église</p>
						<p className="building__name">Marché</p>
						<div className="choice__interaction-main--root" ref="root"></div>
						<ChoiceValidate handleSubmit={this.handleSubmit.bind(this)} class="choice__main-btn choice__main-btn--validate choice__main-btn--2A"/>
					</div>
				</div>
			</div>
		)

	}

}

export default Choice2A
