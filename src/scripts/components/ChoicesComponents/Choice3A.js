import React from 'react'
import ReactDOM from 'react-dom'

class Choice3A extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

	}

	/**
     * @method
	 * @name handleSubmit
	 * @param {object} e - event
     */
	handleSubmit(e) {

		const event = e || window.e
		event.preventDefault()

		let answer

		if (ReactDOM.findDOMNode(this.refs.choiceA).checked) {
			answer = ReactDOM.findDOMNode(this.refs.choiceA).value
		} else {
			answer = ReactDOM.findDOMNode(this.refs.choiceB).value
		}

		this.props.submitHandler(this.props.id, answer)

	}

	/**
     * @method
	 * @name render
     */
	render() {

		return (
			<div className="choice__interaction-container">
				<h1>Jeunes ou Vieux ?</h1>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<label labelFor="choice-a">
						Jeunes
						<input ref="choiceA" id="choice-a" value="jeunes" name="choice3A" type="radio"/>
					</label>
					<label labelFor="choice-b">
						Vieux
						<input ref="choiceB" id="choice-b" value="vieux" name="choice3A" type="radio"/>
					</label>
					<input value="Faire mon choix" type="submit"/>
				</form>
			</div>
		)

	}

}

export default Choice3A
