import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import MapComponent from './MapComponent'
import HotpointsContainer from '../containers/HotpointsContainer'

class Map extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.scale = this.initScale = .6
		this.scaleMin = .6
		this.scaleMax = 2
		this.scaleStep = .1

	}

	/**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		console.log(this.props.score)

		this.windowWidth = window.innerWidth
		this.windowHeight = window.innerHeight

		this.mapContainer = ReactDOM.findDOMNode(this.refs.mapContainer)
		this.map = ReactDOM.findDOMNode(this.refs.map)

		TweenMax.set(this.mapContainer, {scale: this.scale})
		TweenMax.set(this.map, {'-webkit-filter': `grayscale(${50 - (this.props.score * 10)}%)`})

        Draggable.create(this.map, {
            type: 'x, y',
            edgeResistance: .8,
            bounds: {
                minX: -this.windowWidth / 3,
                maxX: this.windowWidth / 3,
                minY: -this.windowHeight / 3,
                maxY: this.windowHeight / 3
            },
			zIndex: 1,
			zIndexBoost: false
        })

	}

	/**
	 * @method
	 * @name componentWillUpdate
	 */
	componentWillUpdate() {

		this.scale = this.initScale
		TweenMax.set(this.mapContainer, {scale: this.scale, x: 0, y: 0})

	}

	/**
	 * @method
	 * @name componentDidUpdate
	 */
	componentDidUpdate() {

		TweenMax.set(this.map, {'-webkit-filter': `grayscale(${50 - (this.props.score * 10)}%)`})

		console.log(this.props.score,'hello2')

	}


	/**
	 * @method
	 * @name scaleHandler
	 * @param {object} e - event
	 */
	scaleHandler(e) {

        const event = e || document.event

		if (event.deltaY < 0 && this.scale < this.scaleMax) {
			this.scale += this.scaleStep * this.scale
		}
        else if (event.deltaY > 0 && this.scale > this.scaleMin) {
			this.scale -= this.scaleStep * this.scale
		}
        else {
            return
        }

		const originX = 100 * event.clientX / this.windowWidth
		const originY = 100 * event.clientY / this.windowHeight

		TweenMax.to(this.mapContainer, .6, {scale: this.scale, transformOrigin: `${originX}% ${originY}%`})

	}

	/**
	 * @method
	 * @name render
	 */
	render() {

		let mapItems = this.props.mapState.map((item, index) => {
			let key = item.id + item.version
			return (
				<MapComponent key={key} id={item.id} version={item.version} />
			)
		})

		return (
			<div className="mapContainer" ref="mapContainer" onWheel={this.scaleHandler.bind(this)}>
				<div className="map" ref="map">
					<svg x="0px" y="0px" viewBox="0 0 1024 768" enable-background="new 0 0 1024 768">
						<g>
							<polygon fill="#444444" points="510.9,155.7 20.6,442.8 510.9,724 1003.1,439.8"/>
						</g>
					</svg>
					<ReactCSSTransitionGroup className="mapItems" transitionName="mapItems" component="div"
						transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
						{mapItems}
					</ReactCSSTransitionGroup>
					<HotpointsContainer />
				</div>
			</div>
		)

	}

}

export default Map
