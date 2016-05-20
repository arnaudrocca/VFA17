import React from 'react'
import ReactDOM from 'react-dom'

class Choice0 extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.answer = ''

	}

	/**
     * @method
	 * @name componentDidMount
     */
	componentDidMount() {

		this.gossipField1Node = ReactDOM.findDOMNode(this.refs.gossipField1)
		this.gossipField2Node = ReactDOM.findDOMNode(this.refs.gossipField2)

		this.gossipFieldsNodes = document.querySelectorAll('.gossip__field')

	}

	/**
     * @method
	 * @name handleSubmit
     */
	handleSubmit() {

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
	 * @name clickHandler
     */
	clickHandler() {

		let transitionTimeline = new TimelineLite()
		transitionTimeline
			.to('.choice__interaction-intro', 1, {display: 'none', opacity: 0})
			.to('.choice__interaction-main', 1, {display: 'block', opacity: 1})

	}

	/**
     * @method
	 * @name selectField
	 * @param {object} e - event
     */
	selectField(e) {

		const event = e || window.e

		const matchingField = event.target.parentNode.parentNode
		const matchingList = event.target.parentNode.nextElementSibling

		matchingField.classList.add('is-active')

		TweenMax.to(matchingList, 0.3, {
			'display': 'block'
		})

	}

	/**
     * @method
	 * @name selectOption
	 * @param {object} e - event
     */
	selectOption(e) {

		const event = e || window.e

		const optionText = event.target.textContent
		const optionValue = event.target.getAttribute('data-value')
		const matchingList = event.target.parentNode
		const matchingField = matchingList.previousElementSibling.children

		matchingField[0].textContent = optionText

		for (let i = this.gossipFieldsNodes.length - 1; i >= 0; i--) {
			this.gossipFieldsNodes[i].classList.remove('is-active')
		}

		if (optionValue) {
			this.answer = optionValue
		}

		if (this.gossipField1Node.textContent != '' && this.gossipField2Node.textContent != '') {
			TweenMax.to('.choice__interaction-validate', 0.3, {
				display: 'block',
				opacity: 1
			})
		}

		TweenMax.to(matchingList, 0, {
			'display': 'none'
		})

	}

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
				<div className="choice__interaction-intro">
					<p>Fais ton choix !</p>
					<button onClick={this.clickHandler.bind(this)}>
						Ok !
					</button>
				</div>
				<div className="choice__interaction-main">
					<div className="gossip">
						<div className="gossip__text">J'ai entendu dire que</div>
						<div className="gossip__field">
							<div><span ref="gossipField1" onClick={this.selectField.bind(this)} className="gossip__field__label"></span></div>
							<ul className="gossip__field__list">
								<li onClick={this.selectOption.bind(this)} data-value="agriculture" className="gossip__field__list-item">les viandes de monsieur viandé</li>
								<li onClick={this.selectOption.bind(this)} data-value="elevage" className="gossip__field__list-item">les légumes de monsieur plantard</li>
								<li onClick={this.selectOption.bind(this)} data-value="elevage" className="gossip__field__list-item">les légumes de monsieur plantard</li>
								<li onClick={this.selectOption.bind(this)} data-value="elevage" className="gossip__field__list-item">les légumes de monsieur plantard</li>
							</ul>
						</div>
						<div className="gossip__text">provoquent</div>
						<div className="gossip__field">
							<div><span ref="gossipField2" onClick={this.selectField.bind(this)} className="gossip__field__label"></span></div>
							<ul className="gossip__field__list">
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">le choléra</li>
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">la cardamone</li>
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">la cardamone</li>
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">la cardamone</li>
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">la cardamone</li>
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">la cardamone</li>
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">la cardamone</li>
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">la cardamone</li>
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">la cardamone</li>
							</ul>
						</div>
					</div>
					<button onClick={this.handleSubmit.bind(this)} className="choice__interaction-validate" type="button">Valider</button>
				</div>
			</div>
		)

		// // return (
		// 	<select className="gossip__field">
		// 					<option value="Les légumes de la famille plantard">Les légumes de la famille plantard</option>
		// 					<option value="La viande de la famille viandée">La viande de la famille viandée</option>
		// 				</select>
			// <div className="gossip">
					// 	<div className="gossip__field">
					// 		<span onClick={this.selectField.bind(this)} className="gossip__field__label"></span>
					// 		<ul className="gossip__field__list">
					// 			<li onClick={this.selectOption.bind(this)} data-value="agriculture" className="gossip__field__list-item">Les viandes de monsieur viandé</li>
					// 			<li onClick={this.selectOption.bind(this)} data-value="elevage" className="gossip__field__list-item">Les légumes de monsieur plantard</li>
					// 		</ul>
					// 	</div>
					// 	<div className="gossip__field">
					// 		<span onClick={this.selectField.bind(this)} className="gossip__field__label"></span>
					// 		<ul className="gossip__field__list">
					// 			<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">provoquent le choléra</li>
					// 			<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">irritent en dessous des ongls</li>
					// 		</ul>
					// 	</div>
					// </div>
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
