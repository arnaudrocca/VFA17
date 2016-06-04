import React from 'react'
import ReactDOM from 'react-dom'
import Hotpoint from './Hotpoint'

class Hotpoints extends React.Component {

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
     */
	mouseEnterHandler() {

		if (window.enableAudio) {
            this.audioButton.currentTime = 0
            this.audioButton.play()
        }

	}

	/**
     * @method
	 * @name getContent
     */
    getContent() {

        this.hotpoints = this.props.hotpoints.map((hotpoint, index) => {
            return (
                <Hotpoint key={index} onClick={this.props.onClick} onMouseEnter={this.mouseEnterHandler.bind(this)} hotpoint={this.props.hotpoints[index]} />
            )
        })

    }

	/**
     * @method
	 * @name render
     */
	render() {

        this.getContent()

		return (
			<div className="hotpoints">
                {this.hotpoints}
				<audio ref="audioButton" src="assets/audio/button.wav" preload="auto"></audio>
            </div>
		)

	}

}

export default Hotpoints
