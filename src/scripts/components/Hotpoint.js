import React from 'react'
import hotpointsData from '../data/hotpoints.json'

class Hotpoint extends React.Component {

	constructor() {

		super()

		this.radius = 5

	}

	getContent() {

		this.data = hotpointsData.find((hotpointData) => {
			return hotpointData.id == this.props.hotpoint.id
		})

		if (this.props.hotpoint.answers.length > 0) {
			this.hotpoint = <span></span>
			this.position = {
				left: this.data.x,
				top: this.data.y
			}
		} else {
			this.hotpoint = ''
			this.position = {}
		}

	}

	clickHandler() {

		let dialog = ''

		for (let i in this.props.hotpoint.answers) {
			dialog += this.data.text
		}

		this.props.onClick(dialog)

	}

	render() {

		this.getContent()

		return (
			<div className="hotpoint" onClick={this.clickHandler.bind(this)} style={this.position}>
				{this.hotpoint}
            </div>
		)

	}

}

export default Hotpoint
