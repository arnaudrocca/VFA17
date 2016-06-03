import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
			this.hotpoint = <IconHotpoint classes="icon-hotpoint" key={this.props.hotpoint.answers}/>
			this.position = {
				left: `${this.data.x}%`,
				top: `${this.data.y}%`
			}
		} else {
			this.hotpoint = null
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

		return (
			<ReactCSSTransitionGroup className="hotpoint" transitionName="hotpoint" onClick={this.clickHandler.bind(this)} style={this.position} component="div" transitionEnterTimeout={3500} transitionLeaveTimeout={1300}>
				{this.hotpoint}
        	</ReactCSSTransitionGroup>
		)

	}

}

export default Hotpoint
