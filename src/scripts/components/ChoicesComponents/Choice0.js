import React from 'react'
import ReactDOM from 'react-dom'

class Choice0 extends React.Component {

	constructor() {

		super()

		this.value = ''

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

	selectField(e) {

		const matchingList = e.target.nextElementSibling

		TweenMax.to(matchingList, 0.3, {
			'display': 'block'
		})

	}

	selectOption(e) {

		const optionText = e.target.textContent
		const optionValue = e.target.getAttribute('data-value')
		const matchingList = e.target.parentNode
		const matchingField = matchingList.previousElementSibling

		matchingField.textContent = optionText

		if(optionValue) {
			this.value = optionValue
		}

		TweenMax.to(matchingList, 0.3, {
			'display': 'none'
		})

	}

	render() {

		return (
		
			<div className="choice__interaction-container">
				<div className="choice__interaction-intro">
					<p>Fais ton choix !</p>
					<button onClick={this.clickHandler.bind(this)}>
						Ok !
					</button>
				</div>
				<div className="choice__interaction-main">
					<div className="gossip">
						<div className="gossip__field">
							<span onClick={this.selectField.bind(this)} className="gossip__field__label"></span>
							<ul className="gossip__field__list">
								<li onClick={this.selectOption.bind(this)} data-value="agriculture" className="gossip__field__list-item">Les viandes de monsieur viandé</li>
								<li onClick={this.selectOption.bind(this)} data-value="elevage" className="gossip__field__list-item">Les légumes de monsieur plantard</li>
							</ul>
						</div>
						<div className="gossip__field">
							<span onClick={this.selectField.bind(this)} className="gossip__field__label"></span>
							<ul className="gossip__field__list">
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">provoquent le choléra</li>
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">irritent en dessous des ongls</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		
		)

		// // return (
		// 	<select className="gossip__field">
		// 					<option value="Les légumes de la famille plantard">Les légumes de la famille plantard</option>
		// 					<option value="La viande de la famille viandée">La viande de la famille viandée</option>
		// 				</select>
		// 	<div className="choice__interaction-main">
	 // 			<div className="choice__interaction-container">
	 //  				<h1>Agriculture ou élevage ?</h1>
	 //  				<form onSubmit={this.handleSubmit.bind(this)}>
	 //  					<label labelFor="choice-a">
	 // 						Agriculture
	 // 						<input ref="choiceA" id="choice-a" value="agriculture" name="choice0" type="radio"/>
	 // 					</label>
	 // 					<label labelFor="choice-b">
	 // 						Elevage
	 // 						<input ref="choiceB" id="choice-b" value="elevage" name="choice0" type="radio"/>
	 // 					</label>
	 // 					<input value="Faire mon choix" type="submit"/>
	 // 				</form>
	 // 			</div>
	 // 		</div>
 	// 	)
	}

}

export default Choice0
