import React from 'react'
import ReactDOM from 'react-dom'

class Choice1A extends React.Component {

	constructor() {

		super()

	}

	handleSubmit(e) {

		e.preventDefault()

		let answer

		if (ReactDOM.findDOMNode(this.refs.choiceA).checked) {
			answer = ReactDOM.findDOMNode(this.refs.choiceA).value
		} else {
			answer = ReactDOM.findDOMNode(this.refs.choiceB).value
		}

		this.props.submitHandler(this.props.id, answer)

	}

	render() {

		return (
			<div className="choice__interaction-container">
				<h1>Fantome ou Dieu ?</h1>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<label labelFor="choice-a">
						Fantome
						<input ref="choiceA" id="choice-a" value="fantome" name="choice1A" type="radio"/>
					</label>
					<label labelFor="choice-b">
						Dieu
						<input ref="choiceB" id="choice-b" value="dieu" name="choice1A" type="radio"/>
					</label>
					<input value="Faire mon choix" type="submit"/>
				</form>
			</div>
		)

	}

}

export default Choice1A
