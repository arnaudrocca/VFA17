import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { debounce } from 'lodash'
import MapComponent from './MapComponent'
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
		this.volumeMin = window.cityAudio.volumeMin

        this.createDrag = this.createDrag.bind(this)

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

        TweenMax.set(this.mapContainer, {scale: this.scale, transformOrigin: '50% 50%'})
		TweenMax.to(this.mapItems, .3, {'-webkit-filter': `grayscale(${40 - (this.props.score * 15)}%)`})

        this.createDrag()

		window.cityAudio.setVolume(this.volumeMin)
		window.cityAudio.setFilter(false)

        window.addEventListener('resize', debounce(this.createDrag, 350))

	}

    /**
	 * @method
	 * @name componentWillUnmount
	 */
	componentWillUnmount() {

		window.cityAudio.setVolume(0)

		window.removeEventListener('resize', this.createDrag)

	}

    /**
	 * @method
	 * @name createDrag
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

		TweenMax.to(this.mapItems, .3, {'-webkit-filter': `grayscale(${40 - (this.props.score * 15)}%)`})

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

        TweenMax.set(this.mapContainer, {scale: this.scale, transformOrigin: `${originX}% ${originY}%`})

		const volume = Math.round(utils.normalize(this.scale, this.scaleMin, this.scaleMax, this.volumeMin, 1) * 100) / 100
		window.cityAudio.setVolume(volume)

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
