import React from 'react'
import ReactDOM from 'react-dom'

class About extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.aboutTimeline = new TimelineLite()

	}

    /**
	 * @method
	 * @name componentDidMount
	 */
    componentDidMount() {

        this.aboutNode = ReactDOM.findDOMNode(this.refs.about)
        this.aboutContainerNode = ReactDOM.findDOMNode(this.refs.aboutContainer)
		this.homeVideoMain = document.querySelector('.home__video--main')

    }

    /**
	 * @method
	 * @name clickHandler
	 * @description Close the about pop-in
	 */
    clickHandler() {

		window.cityAudio.setFilter(false)

        this.aboutTimeline
            .fromTo(this.aboutContainerNode, .3, {scale: 1}, {scale: .9})
			.to(this.aboutNode, .3, {opacity: 0, display: 'none'}, '-=.3')

        if (this.homeVideoMain && getComputedStyle(this.homeVideoMain)['display'] != 'none') {
	        this.homeVideoMain.play()
	    }

    }

	/**
	 * @method
	 * @name render
	 */
	render() {

		return (
			<div className="about" ref="about">
                <div className="about__container" ref="aboutContainer">
                    <div className="about__content">
                        <p>Infos</p>
                    </div>
                    <span className="about__close" onClick={this.clickHandler.bind(this)}></span>
                </div>
            </div>
		)

	}

}

export default About
