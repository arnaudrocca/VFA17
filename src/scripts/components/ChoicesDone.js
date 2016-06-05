import React from 'react'
import IconDrag from './iconsComponents/icon-drag'

class ChoicesDone extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.choicesNumber = 5

		this.state = {
			circlePerimeter: 0
		}

	}

	/**
     * @method
	 * @name componentDidMount
     */
	componentDidMount() {

		const circle = document.querySelector('.wireframe__drag__gauge')

		this.setState({
			circlePerimeter: circle.getAttribute('r') * Math.PI * 2
		})

	}

	/**
     * @method
	 * @name getContent
     */
	getContent() {

		const circlePerimeterFragment = this.state.circlePerimeter / this.choicesNumber
		this.offset = (this.props.choicesDone + this.choicesNumber) * circlePerimeterFragment

	}

	/**
     * @method
	 * @name render
     */
	render() {

		this.getContent()

		return (
			<div>
				<span className="wireframe__timeline-connector"></span>
				<IconDrag classes="wireframe__drag" offset={this.offset} circlePerimeter={this.state.circlePerimeter} width="75" />
			</div>
		)

	}

}

export default ChoicesDone
