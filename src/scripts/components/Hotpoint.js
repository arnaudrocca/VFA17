import React from 'react'
import IconHotpoint from './iconsComponents/icon-hotpoint'
import hotpointsData from '../data/hotpoints.json'

class Hotpoint extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

	}

	/**
     * @method
	 * @name getContent
     */
	getContent() {

		this.data = hotpointsData.find((hotpointData) => {
			return hotpointData.mapId == this.props.hotpoint.id
		})

		if (this.props.hotpoint.answers.length > 0) {
			this.hotpoint = <IconHotpoint/>
			this.position = {
				left: `${this.data.x}%`,
				top: `${this.data.y}%`
			}
		} else {
			this.hotpoint = false
		}

	}

	/**
     * @method
	 * @name clickHandler
     */
	clickHandler() {

		this.hotpointDatum = hotpointsData.find((hotpointData) => {
			return hotpointData.mapId == this.props.hotpoint.id && hotpointData.answer == this.props.hotpoint.answers
		})

		this.props.onClick(this.hotpointDatum.dialog, this.hotpointDatum.mood)

	}

	/**
     * @method
	 * @name render
     */
	render() {

		this.getContent()

		if (this.hotpoint == false) {
			return null
		} else {
			return (
				<div className="hotpoint" onClick={this.clickHandler.bind(this)} style={this.position}>
					{this.hotpoint}
            	</div>
			)
		}

	}

}

export default Hotpoint
