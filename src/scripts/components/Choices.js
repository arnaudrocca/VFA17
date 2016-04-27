import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

class Choices extends React.Component {

	constructor() {

		super();

	}

	getContent() {

		this.choiceId = this.props.params.id;
		const currentChoice = this.props.choiceState.find((choice) => {
			return choice.id == this.choiceId;
		});
		this.choiceVersion = currentChoice.version;

		if (currentChoice.answer != 'undefined') {
			this.choiceIsDone = true;
		} else {
			this.choiceIsDone = false;
		}

	}

	render() {

		this.getContent();

		const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
			choiceId: this.choiceId,
			choiceVersion: this.choiceVersion,
			choiceIsDone : this.choiceIsDone,
			onSubmit: this.props.onSubmit
		}));

		return (
			<div className="choices">
				{childrenWithProps}
				<div className="choices-nav">
					<Link to={`/experiment/choice/${this.choiceId}`}>Contexte Choix {this.choiceId}</Link><br/>
					<Link to={`/experiment/choice/${this.choiceId}/interaction`}>Interaction Choix {this.choiceId}</Link>
				</div>
			</div>
		)

	}

}

export default Choices
