import React from 'react'
import hotpointsData from '../data/hotpoints.json'

class Hotpoint extends React.Component {

	constructor() {

		super()

	}

	getContent() {

		this.data = hotpointsData.find((hotpointData) => {
			return hotpointData.id == this.props.hotpoint.id
		})

		if (this.props.hotpoint.answers.length > 0) {
			this.hotpoint = <span></span>
			this.position = {
				left: `${this.data.x}%`,
				top: `${this.data.y}%`
			}
		} else {
			this.hotpoint = ''
			this.position = {}
		}

	}

	clickHandler() {

		let dialog = ''

		for (let answer of this.props.hotpoint.answers) {
			this.hotpointDatum = hotpointsData.find((hotpointData) => {
				return hotpointData.mapId == this.props.hotpoint.id && hotpointData.answer == answer
			})
		}

		dialog += this.hotpointDatum.text

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
