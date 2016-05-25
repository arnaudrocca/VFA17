import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'lodash'
import ChoiceIntro from '../ChoiceIntro'
import ChoiceValidate from '../ChoiceValidate'

class Choice4 extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

        this.DELTA_TIME = 0
        this.LAST_TIME = Date.now()

        this.answer = ''
		this.end = false
        this.userHandPosition = 0

        this.update = this.update.bind(this)
        this.spacebarDownHandler = this.spacebarDownHandler.bind(this)

	}

    /**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

        this.userHandImgNode = ReactDOM.findDOMNode(this.refs.userHandImg)
        this.mayorHandImgNode = ReactDOM.findDOMNode(this.refs.mayorHandImg)

        window.addEventListener('keydown', debounce(this.spacebarDownHandler, 100))

	}

	/**
	 * @method
	 * @name componentWillUnmount
	 */
	componentWillUnmount() {

        window.removeEventListener('keydown', this.spacebarDownHandler)
        TweenMax.ticker.removeEventListener('tick', this.update)

	}

	/**
	 * @method
	 * @name clickHandler
	 */
	clickHandler() {

		TweenMax.ticker.addEventListener('tick', this.update)

	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {

        this.DELTA_TIME = Date.now() - this.LAST_TIME
        this.LAST_TIME = Date.now()

        this.userHandPosition += .1 * this.DELTA_TIME

        if (this.userHandPosition <= 0) {
            this.userHandPosition = 0
        }
        else if (this.userHandPosition >= 500) {
            this.userHandPosition = 500
        }

        TweenMax.set(this.userHandImgNode, {x: this.userHandPosition})

	}

    spacebarDownHandler(e) {

        const event = e || window.event

        if (event.keyCode == 32) {
            this.userHandPosition -= 100
        }

    }

	/**
	 * @method
	 * @name render
	 */
	render() {

		return (
			<div className="choice__interaction-container">
				<ChoiceIntro clickHandler={this.clickHandler.bind(this)} title={this.props.choiceData.introTitle} text={this.props.choiceData.introText}/>
				<div className="choice__interaction-main">
					<div className="terminator">
                        <div className="terminator__container">
                            <div ref="userHandImg" className="terminator__image terminator__image--user">
                                <img src="http://lorempicsum.com/simpsons/245/245/1"/>
                            </div>
                            <div ref="mayorHandImg" className="terminator__image terminator__image--mayor">
                                <img src="http://lorempicsum.com/simpsons/245/245/2"/>
                            </div>
                        </div>
                        <div className="terminator__spacebar">Appuie sur espace</div>
					</div>
				</div>
			</div>
		)

	}

}

export default Choice4
