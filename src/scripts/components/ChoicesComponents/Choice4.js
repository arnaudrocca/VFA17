import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'lodash'
import { hashHistory } from 'react-router'
import ChoiceIntro from '../ChoiceIntro'
import ChoiceValidate from '../ChoiceValidate'
import IconHold from '../iconsComponents/icon-hold'
import { map } from '../../utils/math'

class Choice4 extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.state = {
			circlePerimeter: 0,
			offset: 0
		}

        this.answer = ''
		this.end = false
		this.handSpeed = .05
        this.userHandPosition = 0
        this.holdTime = 3
        this.holdDuration = 0
        this.holdIsVisible = false

        this.spacebarTimeline = new TimelineLite({paused: true})
        this.mayorTimeline = new TimelineMax({repeat: -1})
        this.timelineEnd = new TimelineLite({
        	paused: true,
    		onComplete: () => {
    			this.props.choiceDone()
    			hashHistory.push('/experiment')
    		}
    	})

        this.update = this.update.bind(this)

        this.spacebarDownHandler = this.spacebarDownHandler.bind(this)

	}

    /**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		window.addEventListener('keydown', debounce(this.spacebarDownHandler,150))

		this.holdNode = ReactDOM.findDOMNode(this.refs.hold)
		this.holdLabelNode = ReactDOM.findDOMNode(this.refs.holdLabel)
		this.userHandImgNode = ReactDOM.findDOMNode(this.refs.userHandImg)
		this.mayorHandImgNode = ReactDOM.findDOMNode(this.refs.mayorHandImg)
		this.spacebarIconNode = ReactDOM.findDOMNode(this.refs.spacebarIcon)
		this.circleNode = document.querySelector('.hold-circle')

		this.circlePerimeter = this.circleNode.getAttribute('r') * Math.PI * 2

		this.spacebarTimeline
			.to(this.spacebarIconNode, 0.6, {background: 'rgba(255,255,255,0.2)', ease: Power1.easeOut})
			.to(this.spacebarIconNode, 0.6, {background: 'transparent', ease: Power1.easeOut},'-=.5')

		this.mayorTimeline
			.to('.terminator__image--mayor-over, .terminator__image--mayor-under', .3, {
				rotation: '2deg'
			})
			.to('.terminator__image--mayor-over, .terminator__image--mayor-under', .3, {
				rotation: 0
			})

		this.timelineEnd.to('.choice', .3, {
    		opacity: 0
		})

        this.setState({
			circlePerimeter: this.circlePerimeter,
			offset: this.circlePerimeter
		})

	}

	/**
	 * @method
	 * @name componentWillUnmount
	 */
	componentWillUnmount() {

		TweenMax.ticker.removeEventListener('tick', this.update)
        window.removeEventListener('keydown', this.spacebarDownHandler)

	}

	/**
	 * @method
	 * @name clickHandler
	 */
	clickHandler() {

		setTimeout(() => {
			this.DELTA_TIME = 0
			this.LAST_TIME = Date.now()
			TweenMax.ticker.addEventListener('tick', this.update)
			window.addEventListener('keydown', debounce(this.spacebarDownHandler, 100))
		}, 1000)

	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {

		this.DELTA_TIME = Date.now() - this.LAST_TIME
		this.LAST_TIME = Date.now()

        this.userHandPosition += this.DELTA_TIME * this.handSpeed

        if (this.userHandPosition <= -50) {
			if (this.userHandPosition <= -100) {
	        	this.userHandPosition = -100
	        }

        	if (!this.holdIsVisible) {
        		this.holdIsVisible = true
        		this.holdLabelNode.textContent = 'Garder'
        		TweenMax.to(this.holdNode, .3, {
        			display: 'block',
        			scale: 1
        		})
        	}

			this.holdDuration += this.DELTA_TIME / 1000

	        if (this.holdDuration <= this.holdTime) {
	        	 TweenMax.set(this.circleNode, {
					strokeDashoffset: map(this.holdDuration, 0, this.holdTime, this.circlePerimeter, 0)
				})
	        }
	    }
		else if (this.userHandPosition >= 65) {
			if (this.userHandPosition >= 140) {
				this.userHandPosition = 140
			}

        	if (!this.holdIsVisible) {
        		this.mayorTimeline.pause()
        		TweenMax.to('.terminator__image--mayor-over, .terminator__image--mayor-under', .3 , {
					rotation: 0
				})
        		this.holdIsVisible = true
        		this.holdLabelNode.textContent = 'Rendre'
        		TweenMax.to(this.holdNode, .3, {
        			display: 'block',
        			scale: 1
        		})
        	}

        	this.holdDuration += this.DELTA_TIME / 1000

            if (this.holdDuration <= this.holdTime) {
				TweenMax.set(this.circleNode, {
					strokeDashoffset: map(this.holdDuration, 0, this.holdTime, this.circlePerimeter, 0)
				})
            } else {
            	window.isEnding = true
            	this.timelineEnd.play()
	        }
        }
		else if (this.holdIsVisible) {
    		this.holdDuration = 0
    		this.holdLabelNode.textContent = ''
    		this.mayorTimeline.play()
    		TweenMax.to(this.holdNode, .3, {
    			display: 'none',
    			scale: 0,
    			onComplete: () => {
    				TweenMax.set(this.circleNode, {
						strokeDashoffset: this.circlePerimeter
					})
    			}
    		})
        	this.holdIsVisible = false
        }

        TweenMax.set(this.userHandImgNode, {x: this.userHandPosition})

	}

	/**
	 * @method
	 * @name spacebarDownHandler
	 * @description Triggered when the spacebar is pressed
	 * @param {object} e - event
	 */
    spacebarDownHandler(e) {

        const event = e || window.e
		const key = event.keyCode || event.which

        if (key == 32) {

        	this.spacebarTimeline.restart()
            this.userHandPosition -= 30

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
                            <div className="terminator__image terminator__image--user" ref="userHandImg">
                                <img height="180" src="assets/images/interactions/hand-user.svg"/>
                            </div>
                            <div className="terminator__image terminator__image--mayor-under" ref="mayorHandImg">
                                <img height="100" src="assets/images/interactions/hand-mayor.svg"/>
                            </div>
                            <div  className="terminator__image terminator__image--mayor-over">
                                <img height="100" src="assets/images/interactions/hand-mayor-over.svg"/>
                            </div>
                        </div>
                        <div className="terminator__hold" ref="hold">
                        	<IconHold classes="terminator__hold__icon" offset={this.state.offset} circlePerimeter={this.state.circlePerimeter} width="100%" />
                        	<span className="terminator__hold__label" ref="holdLabel"></span>
                        </div>
                        <div className="terminator__spacebar" ref="spacebarIcon">Appuie sur espace</div>
					</div>
				</div>
			</div>
		)

	}

}

export default Choice4
