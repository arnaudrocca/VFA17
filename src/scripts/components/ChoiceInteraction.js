import React from 'react'
import ReactDOM from 'react-dom'
import * as ChoicesComponents from './ChoicesComponents'

class ChoiceInteraction extends React.Component {

	constructor() {

		super();

	}

	getContent() {

		if (this.props.choiceIsDone) {
			return (
				<div>
					Interaction du choix {this.props.choiceId}{this.props.choiceVersion} (déjà fait)
				</div>
			)
		} else {
			const componentName = 'Choice' + this.props.choiceId + this.props.choiceVersion;

			for (let choiceComponent in ChoicesComponents) {
				if (choiceComponent == componentName) {
					this.component = ChoicesComponents[choiceComponent];
					break;
				}
			}

			return (
				<div>
					Interaction du choix {this.props.choiceId}{this.props.choiceVersion}
					<this.component id={this.props.choiceId} submitHandler={this.props.onSubmit}/>
				</div>
			)
		}

	}

	render() {

		const content = this.getContent();

		return (
			<div>
				{content}
			</div>
		)

	}

}

export default ChoiceInteraction
