import React from 'react'
import ReactDOM from 'react-dom'
import ChoiceIntro from '../ChoiceIntro'
import ChoiceValidate from '../ChoiceValidate'

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
			if (matchingField != this.gossipFieldsNodes[i]) {
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
			TweenMax.to('.choice__main-btn--validate', 0.3, {display: 'block', opacity: 1})
		}

	}

	/**
     * @method
	 * @name stopPropagation
	 * @param {object} e - event
     */
	stopPropagation(e) {

		const event = e || window.e
		event.stopPropagation()

	}

	/**
     * @method
	 * @name handleSubmit
     */
	handleSubmit() {

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
								<li onClick={this.selectOption.bind(this)} data-value="agriculture" className="gossip__field__list-item">
									les porcs de Monsieur Viandé
								</li>
								<li onClick={this.selectOption.bind(this)} data-value="elevage" className="gossip__field__list-item">
									les courgettes de Monsieur Plantard
								</li>
								<li onClick={this.selectOption.bind(this)} data-value="agriculture" className="gossip__field__list-item">
									les moutons de Monsieur Viandé
								</li>
								<li onClick={this.selectOption.bind(this)} data-value="elevage" className="gossip__field__list-item">
									les poires de Monsieur Plantard
								</li>
							</ul>
						</div>
						<div className="gossip__text">provoquent</div>
						<div onClick={this.stopPropagation.bind(this)} className="gossip__field">
							<div><span ref="gossipField2" onClick={this.selectField.bind(this)} className="gossip__field__label"></span></div>
							<ul className="gossip__field__list">
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">des nausées.</li>
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">la myoclonie phrénoglottique.</li>
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">la perte des 5 sens.</li>
								<li onClick={this.selectOption.bind(this)} className="gossip__field__list-item">la perte de l'être aimé.</li>
							</ul>
						</div>
						<ChoiceValidate handleSubmit={this.handleSubmit.bind(this)} class="choice__main-btn choice__main-btn--validate choice__main-btn--0"/>
					</div>
				</div>
			</div>
		)

	}

}

export default Choice0
