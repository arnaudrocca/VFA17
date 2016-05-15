import React from 'react'
import hotpointsData from '../data/hotpoints.json'

class Hotpoint extends React.Component {

	constructor() {

		super()

	}

	getContent() {

		if (this.props.hotpoint.answers.length > 0) {
			this.hotpoint = <circle className="hotpoint" cx={this.props.x} cy={this.props.y} r="5" fill="#AAA" />
		} else {
			this.hotpoint = ''
		}

	}

	clickHandler() {

		let dialog = ''

		for (let answer of this.props.hotpoint.answers) {
			const hotpointDatum = hotpointsData.find((hotpointData) => {
				return hotpointData.mapId == this.props.hotpoint.id && hotpointData.answer == answer
			})

			dialog += hotpointDatum.text
		}

		this.props.onClick(dialog)

	}

	render() {

		this.getContent()

		return (
			<g onClick={this.clickHandler.bind(this)}>
				{this.hotpoint}
            </g>
		)

	}

}

export default Hotpoint
