import React from 'react'

class ChoiceIntro extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

	}

	/**
     * @method
	 * @name clickHandler
     */
	clickHandler() {

		let transitionTimeline = new TimelineLite()

		transitionTimeline
			.to('.choice__interaction-intro', .6, {display: 'none', opacity: 0})
			.to('.choice__interaction-main', .6, {display: 'block', opacity: 1})

		if (typeof this.props.clickHandler === 'function') {
			this.props.clickHandler()
		}

	}

	/**
     * @method
	 * @name render
     */
	render() {

		return (
			<div className="choice__interaction-intro">
				<h2 className="choice__interaction-intro__title">{this.props.title}</h2>
				<p className="choice__interaction-intro__text">
					{this.props.text}
				</p>
				<button onClick={this.clickHandler.bind(this)} className="choice__main-btn" type="button">
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
		)

	}

}

export default ChoiceIntro
