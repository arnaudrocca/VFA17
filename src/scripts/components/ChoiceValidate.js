import React from 'react'
import ReactDOM from 'react-dom'

class ChoiceValidate extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

	}

	/**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		this.audioButton = ReactDOM.findDOMNode(this.refs.audioButton)

	}

	/**
	 * @method
	 * @name mouseEnterHandler
	 * @description Play button sound
	 */
	mouseEnterHandler() {

		if (window.enableAudio) {
            this.audioButton.currentTime = 0
            this.audioButton.play()
        }

	}

	/**
	 * @method
	 * @name render
	 */
	render() {

		return (
			<button className={this.props.classes} onClick={this.props.handleSubmit} onMouseEnter={this.mouseEnterHandler.bind(this)} type="button">
				<span className="btn__main__label-container">
					<span className="btn__main__label" data-labelSecondary={this.props.labelSecondary}>{this.props.label}</span></span>
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
				<audio ref="audioButton" src="assets/audio/button.wav" preload="auto"></audio>
			</button>
		)

	}

}

export default ChoiceValidate
