import React from 'react'

class ChoiceValidate extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

	}

	/**
	 * @method
	 * @name render
	 */
	render() {

		return (
			<button onClick={this.props.handleSubmit} className={this.props.classes} type="button">
				<span className="btn__main__label-container">
					<span data-labelSecondary={this.props.labelSecondary} className="btn__main__label">{this.props.label}</span></span>
				<svg x="0px" y="0px" viewBox="1 2 122 48">
					<g className="btn__main__border">
						<g>
							<path fill="#FFFFFF" d="M107.1,50H1V2h122v32.1L107.1,50z M3,48h103.3L121,33.3V4H3V48z"/>
						</g>
					</g>
					<g className="btn__main__fill">
						<polygon fill="#FF5951" points="105.7,46 5,46 5,6 119,6 119,32.7"/>
					</g>
				</svg>
			</button>
		)

	}

}

export default ChoiceValidate
