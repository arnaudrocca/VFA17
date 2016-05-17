import React from 'react'
import ReactDOM from 'react-dom'

class Choice0 extends React.Component {

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

	clickHandler() {

		TweenMax.to('.choice__interaction-main', 1, {display: 'block', opacity: 1})
		TweenMax.to('.choice__interaction-intro', 1, {display: 'none', opacity: 0})

	}

	render() {

		// return (
		//
		// 	<div className="choice__interaction-container">
		// 		<div className="choice__interaction-intro">
		// 			<p>Reliez les points !</p>
		// 			<button onClick={this.clickHandler.bind(this)}>
		// 				Ok !
		// 			</button>
		// 		</div>
		// 		<div className="choice__interaction-main">
		// 			<p>Choix !</p>
		// 		</div>
		// 	</div>
		//
		// )

		return (
			<div className="choice__interaction-container">
				<h1>Agriculture ou élevage ?</h1>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<label labelFor="choice-a">
						Agriculture
						<input ref="choiceA" id="choice-a" value="agriculture" name="choice0" type="radio"/>
					</label>
					<label labelFor="choice-b">
						Elevage
						<input ref="choiceB" id="choice-b" value="elevage" name="choice0" type="radio"/>
					</label>
					<input value="Faire mon choix" type="submit"/>
				</form>
			</div>
		)

	}

}

export default Choice0
