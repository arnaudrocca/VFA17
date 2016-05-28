import React from 'react'
import ReactDOM from 'react-dom'

class About extends React.Component {

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

        this.aboutNode = ReactDOM.findDOMNode(this.refs.about)

    }

    /**
	 * @method
	 * @name clickHandler
	 */
    clickHandler() {

        const aboutToggled = getComputedStyle(this.aboutNode)['opacity']

        if (aboutToggled == false) {
            TweenMax.fromTo(this.aboutNode, .3, {scale: .9}, {opacity: 1, scale: 1, display: 'flex'})
        } else {
            TweenMax.fromTo(this.aboutNode, .3, {scale: 1}, {opacity: 0, scale: 1.1, display: 'none'})
        }

    }

	/**
	 * @method
	 * @name render
	 */
	render() {

		return (
			<div className="about" ref="about">
                <div className="about__container">
                    <div className="about__content">
                        <p>Infos</p>
                    </div>
                    <span className="about__container__close" onClick={this.clickHandler.bind(this)}></span>
                </div>
            </div>
		)

	}

}

export default About
