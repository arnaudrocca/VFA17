import React from 'react'
import ReactDOM from 'react-dom'
import ChoiceIntro from '../ChoiceIntro'

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

	hideOptionsLists(e) {

		for (let i = this.gossipFieldsNodes.length - 1; i >= 0; i--) {
			this.gossipFieldsNodes[i].classList.remove('is-active')
		}

	}

	/**
     * @method
	 * @name selectField
	 * @param {object} e - event
     */
	selectField(e) {

		const event = e || window.e
		const matchingField = event.target.parentNode.parentNode

		for (let i = this.gossipFieldsNodes.length - 1; i >= 0; i--) {
			if(matchingField != this.gossipFieldsNodes[i]){
				this.gossipFieldsNodes[i].classList.remove('is-active')
			}
		}

		matchingField.classList.toggle('is-active')
	
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
			TweenMax.to('.choice__main-btn', 0.3, {
				display: 'block',
				opacity: 1
			})
		}

	}

	stopPropagation(e) {

		e.stopPropagation();

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
			<div onClick={this.hideOptionsLists.bind(this)} className="choice__interaction-container">
				<ChoiceIntro title={this.props.choiceData.introTitle} text={this.props.choiceData.introText}/>
				<div className="choice__interaction-main">
					<div className="gossip">
						<div className="gossip__text">J'ai entendu dire que</div>
						<div onClick={this.stopPropagation.bind(this)} className="gossip__field">
							<div><span ref="gossipField1" onClick={this.selectField.bind(this)} className="gossip__field__label"></span></div>
							<ul className="gossip__field__list">
								<li onClick={this.selectOption.bind(this)} data-value="agriculture" className="gossip__field__list-item">les viandes de monsieur viandé</li>
								<li onClick={this.selectOption.bind(this)} data-value="elevage" className="gossip__field__list-item">les légumes de monsieur plantard</li>
								<li onClick={this.selectOption.bind(this)} data-value="elevage" className="gossip__field__list-item">les légumes de monsieur plantard</li>
								<li onClick={this.selectOption.bind(this)} data-value="elevage" className="gossip__field__list-item">les légumes de monsieur plantard</li>
							</ul>
						</div>
						<div className="gossip__text">provoquent</div>
						<div onClick={this.stopPropagation.bind(this)} className="gossip__field">
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
						<button onClick={this.handleSubmit.bind(this)} className="choice__main-btn choice__main-btn--validate choice__main-btn--1" type="button">
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
			</div>
		)

	}

}

export default Choice0
