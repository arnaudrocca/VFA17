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

<<<<<<< HEAD
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
		// </select
		

	}

}

export default Choice0
