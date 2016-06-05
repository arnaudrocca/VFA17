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

	/**
     * @method
	 * @name hideOptionsLists
     */
	hideOptionsLists() {

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
			TweenMax.to('.btn__main--hidden' , 0.3, {opacity: 1, display: 'block'})
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
			<div className="choice__interaction-container" onClick={this.hideOptionsLists.bind(this)}>
				<ChoiceIntro title={this.props.choiceData.introTitle} text={this.props.choiceData.introText}/>
				<div className="choice__interaction-main">
					<div className="gossip">
						<div className="gossip__text">J'ai entendu dire que</div>
						<div className="gossip__field" onClick={this.stopPropagation.bind(this)}>
							<div><span className="gossip__field__label" ref="gossipField1" onClick={this.selectField.bind(this)}></span></div>
							<ul className="gossip__field__list">
								<li className="gossip__field__list-item" onClick={this.selectOption.bind(this)} data-value="agriculture">
									les porcs de la famille Viandé
								</li>
								<li className="gossip__field__list-item" onClick={this.selectOption.bind(this)} data-value="elevage">
									les courgettes de la famille Plantard
								</li>
								<li className="gossip__field__list-item" onClick={this.selectOption.bind(this)} data-value="agriculture">
									les moutons de la famille Viandé
								</li>
								<li className="gossip__field__list-item" onClick={this.selectOption.bind(this)} data-value="elevage">
									les poires de la famille Plantard
								</li>
							</ul>
						</div>
						<div className="gossip__text">provoquent</div>
						<div className="gossip__field" onClick={this.stopPropagation.bind(this)}>
							<div><span className="gossip__field__label" ref="gossipField2" onClick={this.selectField.bind(this)}></span></div>
							<ul className="gossip__field__list">
								<li className="gossip__field__list-item" onClick={this.selectOption.bind(this)}>des nausées.</li>
								<li className="gossip__field__list-item" onClick={this.selectOption.bind(this)}>la myoclonie phrénoglottique.</li>
								<li className="gossip__field__list-item" onClick={this.selectOption.bind(this)}>la perte des 5 sens.</li>
								<li className="gossip__field__list-item" onClick={this.selectOption.bind(this)}>la perte de l'être aimé.</li>
							</ul>
						</div>
						<ChoiceValidate handleSubmit={this.handleSubmit.bind(this)} label="Valider" labelSecondary="Colporter" classes="btn__main btn__main--hidden btn__main--0"/>
					</div>
				</div>
			</div>
		)

	}

}

export default Choice0
