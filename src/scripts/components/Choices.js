import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory, Link } from 'react-router'
import * as ChoicesComponents from './ChoicesComponents'

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

		const componentName = 'Choice' + this.choiceId + this.choiceVersion;

		for (let choiceComponent in ChoicesComponents) {
			if (choiceComponent == componentName) {
				this.component = ChoicesComponents[choiceComponent];
				break;
			}
		}
				
	}

	returnToMap(){
		hashHistory.push('/experiment')
	}

	render() {

		this.getContent()

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
			 		<this.component id={this.choiceId} submitHandler={this.props.onSubmit}/>
			 	</div>
			</div>
		)

	}

}

export default Choices
