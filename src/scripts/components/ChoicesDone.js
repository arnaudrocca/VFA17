import React from 'react'
import IconDrag from './svg/icon-drag'

class ChoicesDone extends React.Component {

	constructor() {

		super()
		
		this.choicesNumber = 5
		this.state = {
			circlePerimeter : 0,
		}

	}

	componentDidMount() {

		let circle = document.querySelector('.js-remaining')

		this.setState({
			circlePerimeter : circle.getAttribute('r') * Math.PI *  2
		})
	}

	getContent() {
		let circlePerimeterFragment = this.state.circlePerimeter / this.choicesNumber
		this.offset = (this.props.choicesDone + this.choicesNumber) * circlePerimeterFragment
	}

	render() {

		this.getContent()

		return (
			<div>
				<span className="wireframe__timeline-connector"></span>
				<IconDrag classes="wireframe__drag" offset={this.offset} circlePerimeter={this.state.circlePerimeter} width="75"/>
			</div>
		)

	}

}

export default ChoicesDone
