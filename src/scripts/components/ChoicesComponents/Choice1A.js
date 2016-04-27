import React from 'react'
import ReactDOM from 'react-dom'

class Choice1A extends React.Component {

	constructor() {

		super();

	}

	handleSubmit(e) {

		e.preventDefault();

		let answer;

		if (ReactDOM.findDOMNode(this.refs.choiceA).checked) {
			answer = ReactDOM.findDOMNode(this.refs.choiceA).value;
		} else {
			answer = ReactDOM.findDOMNode(this.refs.choiceB).value;
		}

		this.props.submitHandler(this.props.id, answer);

	}

	render() {

		return (
			<div>
				<h1>Lapins ou lions ?</h1>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<label labelFor="choice-a">
						Lapins
						<input ref="choiceA" id="choice-a" value="lapins" name="choice1A" type="radio"/>
					</label>
					<label labelFor="choice-b">
						Lions
						<input ref="choiceB" id="choice-b" value="lions" name="choice1A" type="radio"/>
					</label>
					<input value="Faire mon choix" type="submit"/>
				</form>
			</div>
		)

	}

}

export default Choice1A
