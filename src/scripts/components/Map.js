import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { debounce } from 'lodash'
import { hashHistory } from 'react-router'
import MapComponent from './MapComponent'
import Cars from './Cars'
import HotpointsContainer from '../containers/HotpointsContainer'
import { utils } from '../utils/utils'

class Map extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

		this.scale = this.initScale = this.scaleMin = .7
		this.scaleMax = 3
		this.scaleStep = .1

        this.createDrag = this.createDrag.bind(this)

        this.endTimeline = new TimelineLite({
        	paused: true,
        	onComplete: () => {
				hashHistory.push('/end')
			}
        })

		this.mountTimeline = new TimelineLite()

	}

	/**
	 * @method
	 * @name componentDidMount
	 */
	componentDidMount() {

		this.windowWidth = window.innerWidth
		this.windowHeight = window.innerHeight

		this.mapContainer = ReactDOM.findDOMNode(this.refs.mapContainer)
		this.map = ReactDOM.findDOMNode(this.refs.map)
		this.mapItems = ReactDOM.findDOMNode(this.refs.mapItems)

		this.mountTimeline
        	.fromTo(this.mapContainer, 1, {opacity: 0, scale: 1}, {opacity: 1, scale: this.scale, transformOrigin: '50% 50', ease: Quart.easeOut})
			.to(this.mapItems, .5, {'-webkit-filter': `grayscale(${40 - (this.props.score * 15)}%)`}, '+=.5')

        this.createDrag()

		if (window.enableAudio) {
			window.cityAudio.setVolume(window.cityAudio.volumeMin)
		} else {
			window.cityAudio.volumeMask = window.cityAudio.volumeMin
			window.cityAudio.setVolume(0)
		}
		window.cityAudio.setFilter(false)

        window.addEventListener('resize', debounce(this.createDrag, 350))

        if (window.isEnding) {
        	 this.endTimeline
        	.to('.map__shadow', 3, {
        		y:' 100px'
        	})
        	.to('.map__base, .mapItems, .hotpoints', 3, {
        		y:' -100px'
        	}, '-=3')
        	.to('.experiment', .5, {
        		opacity: 0
        	})

	        setTimeout(() => {
	        	this.endTimeline.play()
	        }, 1000)
        }

	}

    /**
	 * @method
	 * @name componentWillUnmount
	 */
	componentWillUnmount() {

		window.cityAudio.volumeMask = 0
		window.cityAudio.setVolume(0)

		window.removeEventListener('resize', this.createDrag)

	}

	/**
	 * @method
	 * @name componentWillUpdate
	 */
	componentWillUpdate() {

		this.scale = this.initScale
		TweenMax.set(this.mapContainer, {scale: this.scale, transformOrign: '50% 50%'})
        TweenMax.set(this.map, {x: 0, y: 0})

	}

	/**
	 * @method
	 * @name componentDidUpdate
	 */
	componentDidUpdate() {

		TweenMax.set(this.mapItems, {'-webkit-filter': `grayscale(${40 - (this.props.score * 15)}%)`})

	}

	/**
	 * @method
	 * @name createDrag
	 * @description Create the drag using Draggable
	 */
	createDrag() {

		Draggable.create(this.map, {
			type: 'x, y',
			edgeResistance: .8,
			bounds: {
				minX: -this.windowWidth / 2,
				maxX: this.windowWidth / 2,
				minY: -this.windowHeight / 2,
				maxY: this.windowHeight / 2
			},
			zIndex: 1,
			zIndexBoost: false
		})

	}

	/**
	 * @method
	 * @name scaleHandler
	 * @description Triggered when the user scrolls on the map
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

        TweenMax.set(this.mapContainer, {scale: this.scale, transformOrigin: `${originX}% ${originY}%`})

		const volume = Math.round(utils.normalize(this.scale, this.scaleMin, this.scaleMax, window.cityAudio.volumeMin, 1) * 100) / 100
		if (window.enableAudio) {
			window.cityAudio.setVolume(volume)
		} else {
			window.cityAudio.volumeMask = volume
		}

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
					<img className="map__base" src="assets/images/mapItems/mapItemBase.svg"/>
					<img className="map__shadow" src="assets/images/mapItems/mapItemShadow.svg"/>
					<Cars />
					<ReactCSSTransitionGroup className="mapItems" ref="mapItems" transitionName="mapItems" component="div"
					transitionEnterTimeout={2500} transitionLeaveTimeout={2500}>
						{mapItems}
					</ReactCSSTransitionGroup>
					<HotpointsContainer />
				</div>
			</div>
		)

	}

}

export default Map
