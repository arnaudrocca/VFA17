import React from 'react'
import IconDrag from './svg/icon-drag'

class DragRemaining extends React.Component {

	constructor() {

		super();
		this.state = {
			circlePerimeter : 0,
		}
		
	}

	componentDidMount() {

		let totalChoices = this.props.remaining

		let circle = document.querySelector('.js-remaining')

		this.setState({
			circlePerimeter : circle.getAttribute('r') * Math.PI *  2
		}) 
	}

	getContent() {
		let circlePerimeterFragment = this.state.circlePerimeter / 5
		this.offset = (5 + this.props.remaining) * circlePerimeterFragment
	}

	render() {

		this.getContent();

		return (
			<div>
				<span className="wireframe__timeline-connector"></span>
				<IconDrag classes="wireframe__drag" offset={this.offset} circlePerimeter={this.state.circlePerimeter} width="70"/>
			</div>
		)

	}

}

export default DragRemaining
