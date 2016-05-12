import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory, Link } from 'react-router'

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

	returnToMap(){
		hashHistory.push('/experiment')
	}

	render() {

		// {childrenWithProps}
		// 		<div className="choices-nav">
		// 			<Link to={`/experiment/choice/${this.choiceId}`}>Contexte Choix {this.choiceId}</Link><br/>
		// 			<Link to={`/experiment/choice/${this.choiceId}/interaction`}>Interaction Choix {this.choiceId}</Link>
		// 		</div>

		// this.getContent();

		// const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
			//160,40 120,30 145,0 160,0 0,0
		// 	choiceId: this.choiceId,
		// 	choiceVersion: this.choiceVersion,
		// 	choiceIsDone : this.choiceIsDone,
		// 	onSubmit: this.props.onSubmit
		// }));


		return (
			<div className="choice">
			 	<div className="choice__aside">
			 	<button className="choice__btn-return" type="button" onClick={this.returnToMap.bind(this)}>
				 	Retour à la ville
				 	<svg x="0px" y="0px" width="160" viewBox="0 0 160 40">
						<g>
							<polygon fill="transparent" points="145,40 0,40 0,0 160,0 160,30"/>
							<path fill="#495495" opacity="0.2" d="M158,2v26.9L144.4,38H2V2H158 M160,0H0v40h145l15-10V0L160,0z"/>
						</g>
					</svg>
			 	</button>
			 		<div className="choice__description">
			 			<span className ="choice__description__date">Année 150</span>
			 			<h1 className ="choice__description__title">La Guerre entre la famille plantard et viandé</h1>
			 			<p className ="choice__description__content">
			 				L’une est une famille d’éleveurs et l’autre d’agriculteurs. Leurs querelles ancestrales font qu’aujourd’hui la ville à du mal à se positionner sur le marché agricole et est relativement pauvre.
			 			</p>
			 		</div>
			 	</div>
			 	<div className="choice__interaction">
			 		<div className="choice__interaction-background"></div>
			 	</div>
			</div>
		)

	}

}

export default Choices
