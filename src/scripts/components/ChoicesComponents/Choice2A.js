import React from 'react'
import ReactDOM from 'react-dom'
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
	 * @name componentWillUnmount
	 */
	componentWillUnmount() {

		this.interaction.removeListeners()

	}

    /**
	 * @method
	 * @name clickHandler
	 */
	clickHandler() {

		let transitionTimeline = new TimelineLite()
		transitionTimeline
			.to('.choice__interaction-intro', 1, {display: 'none', opacity: 0})
			.to('.choice__interaction-main', 1, {display: 'block', opacity: 1})

		this.interaction = new Interaction2A()

		const root = ReactDOM.findDOMNode(this.refs.root)
		root.appendChild(this.interaction.scene.renderer.view)

	}

    /**
	 * @method
	 * @name handleSubmit
	 */
	handleSubmit() {

		this.props.submitHandler(this.props.id, this.interaction.answer)

	}

    /**
	 * @method
	 * @name render
	 */
	render() {

		return (
			<div className="choice__interaction-container">
				<div className="choice__interaction-intro">
					<p>Reliez les points !</p>
					<button onClick={this.clickHandler.bind(this)}>Ok !</button>
				</div>
				<button className="choice__interaction-validate" onClick={this.handleSubmit.bind(this)}>Valider !</button>
				<div className="choice__interaction-main" ref="root"></div>
			</div>
		)

	}

}

export default Choice2A
