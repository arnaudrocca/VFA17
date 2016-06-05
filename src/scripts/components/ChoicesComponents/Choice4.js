import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'lodash'
import { hashHistory } from 'react-router'
import ChoiceIntro from '../ChoiceIntro'
import ChoiceValidate from '../ChoiceValidate'
import IconHold from '../iconsComponents/icon-hold'
import { utils } from '../../utils/utils'

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

        this.update = this.update.bind(this)
       
        this.spacebarDownHandler = this.spacebarDownHandler.bind(this)
		this.spacebarUpHandler = this.spacebarUpHandler.bind(this)

	}

    /**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		window.addEventListener('keydown', debounce(this.spacebarDownHandler,150))
		// window.addEventListener('keyup', this.spacebarUpHandler)

		this.holdNode = ReactDOM.findDOMNode(this.refs.hold)
		this.holdLabelNode = ReactDOM.findDOMNode(this.refs.holdLabel)
		this.userHandImgNode = ReactDOM.findDOMNode(this.refs.userHandImg)
		this.mayorHandImgNode = ReactDOM.findDOMNode(this.refs.mayorHandImg)
		this.spacebarIconNode = ReactDOM.findDOMNode(this.refs.spacebarIcon)
		this.circleNode = document.querySelector('.js-hold-circle')

		this.circlePerimeter = this.circleNode.getAttribute('r') * Math.PI * 2

		this.spacebarTimeline
			.to(this.spacebarIconNode, 0.3, {background: 'rgba(255,255,255,0.2)'})
			.to(this.spacebarIconNode, 0.3, {background: 'transparent'})

		this.mayorTimeline
			.to('.terminator__image--mayor-over, .terminator__image--mayor-under', .3, {
				rotation: '2deg'
			})
			.to('.terminator__image--mayor-over, .terminator__image--mayor-under', .3, {
				rotation: 0
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
		// window.removeEventListener('keyup', this.spacebarUpHandler)

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
					strokeDashoffset: utils.normalize(this.holdDuration, 0, this.holdTime, this.circlePerimeter, 0)
				})
	        }
	        // else {
	        // 	hashHistory.push('/experiment')
	        // }
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
					strokeDashoffset: utils.normalize(this.holdDuration, 0, this.holdTime, this.circlePerimeter, 0)
				})
            } else {
            	window.isEnding = true
	        	hashHistory.push('/end')
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

    spacebarDownHandler(e) {

        const event = e || window.e
		const key = event.keyCode || event.which

        if (key == 32) {
        	//console.log(this.spacebarTimeline)
        	this.spacebarTimeline.play()
        	//TweenMax.fromTo(this.spacebarIconNode, 0.3, {background: 'transparent'}, {background: 'rgba(255,255,255,0.2)'})
            this.userHandPosition -= 30   
        }

    }

     spacebarUpHandler(e) {

        const event = e || window.e
		const key = event.keyCode || event.which

        // if (key == 32) {
        //     TweenMax.fromTo(this.spacebarIconNode, 0.3, {background: 'rgba(255,255,255,0.2)'}, {background: 'transparent'})
        // }

    }

	/**
	 * @method
	 * @name render
	 */
	render() {

		// <img className="terminator__image__under" height="100" src="assets/images/interactions/hand-mayor.svg"/>

		return (
			<div className="choice__interaction-container">
				<ChoiceIntro clickHandler={this.clickHandler.bind(this)} title={this.props.choiceData.introTitle} text={this.props.choiceData.introText}/>
				<div className="choice__interaction-main">
					<div className="terminator">
                        <div className="terminator__container">
                            <div ref="userHandImg" className="terminator__image terminator__image--user">
                                <img height="180" src="assets/images/interactions/hand-user.svg"/>
                            </div>
                            <div ref="mayorHandImg" className="terminator__image terminator__image--mayor-under">     
                                <img height="100" src="assets/images/interactions/hand-mayor.svg"/>
                            </div>
                            <div  className="terminator__image terminator__image--mayor-over">
                                <img height="100" src="assets/images/interactions/hand-mayor-over.svg"/>
                            </div>
                        </div>
                        <div ref="hold" className="terminator__hold">
                        	<IconHold classes="terminator__hold__icon" offset={this.state.offset} circlePerimeter={this.state.circlePerimeter} width="100%" />
                        	<span ref="holdLabel" className="terminator__hold__label"></span>
                        </div>
                        <div ref="spacebarIcon" className="terminator__spacebar">Appuies sur espace</div>
					</div>
				</div>
			</div>
		)

	}

}

export default Choice4
