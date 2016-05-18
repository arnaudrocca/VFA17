import React from 'react'
import ReactDOM from 'react-dom'

class Choice0 extends React.Component {

	constructor() {

		super()

		this.currentFieldIndex = 1

	}

	componentDidMount() {

		this.gossipFieldLabelNode = ReactDOM.findDOMNode(this.refs.gossipFieldLabel)
		this.gossipFieldListNode= ReactDOM.findDOMNode(this.refs.gossiFieldList)

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

	selectField () {

		TweenMax.to(this.gossipFieldListNode, 0.3, {
			'display': 'block'
		})

	}

	render() {

		// <select className="gossip__field">
		// 	<option value="Les légumes de la famille plantard">Les légumes de la famille plantard</option>
		// 	<option value="La viande de la famille viandée">La viande de la famille viandée</option>
		// </select>

		return (
		
			<div className="choice__interaction-container">
				<div className="choice__interaction-intro">
					<p>Reliez les points !</p>
					<button onClick={this.clickHandler.bind(this)}>
						Ok !
					</button>
				</div>
				<div className="choice__interaction-main choice__interaction-main--1">
					<div className="gossip">
						<div className="gossip__field">
							<span ref="gossipFieldLabel" className="gossip__field__label" onClick={this.selectField.bind(this)}>Les légumes de la famille plantard</span>
							<ul ref="gossiFieldList" className="gossip__field__list">
								<li className="gossip__field__list-item" data-index="1">Les légumes de la famille plantard</li>
								<li className="gossip__field__list-item" data-index="2">La viande de la famille viandée</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

		)

	}

}

export default Choice0
