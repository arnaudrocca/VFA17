import React from 'react'
import ReactDOM from 'react-dom'
import choicesData from '../data/choices.json'

class ChoiceContext extends React.Component {

	constructor() {

		super()

	}

	getContent() {

		if (this.props.choiceIsDone) {
			return (
				<div>
					Contexte du choix {this.props.choiceId}{this.props.choiceVersion} (déjà fait)
				</div>
			)
		} else {
			const choice = choicesData.find((choice) => {
				return choice.id == this.props.choiceId
			})
			return (
				<div>
					<h2>{choice.title}</h2>
					<p>
						{choice.context}
					</p>
				</div>
			)
		}

	}

	render() {

		const content = this.getContent()

		return (
			<div>
				{content}
			</div>
		)

	}

}

export default ChoiceContext
