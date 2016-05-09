import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import MapComponent from './MapComponent'
import hotpointsContainer from '../containers/hotpointsContainer'

class Map extends React.Component {

	constructor() {

		super();

	}

	componentDidMount() {

		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;

		this.mapContainer = ReactDOM.findDOMNode(this.refs.mapContainer);
		this.map = ReactDOM.findDOMNode(this.refs.map);

		this.scale = this.initScale = .6;
		this.scaleStep = .1;
		this.scaleMin = .5;
		this.scaleMax = 4;

		this.mapContainer.style.transform = `scale3d(${this.scale}, ${this.scale}, 1)`;

        Draggable.create('.map', {
            type: 'x, y',
            edgeResistance: .8,
            bounds: {
                minX: -this.windowWidth / 3,
                maxX: this.windowWidth / 3,
                minY: -this.windowHeight / 3,
                maxY: this.windowHeight / 3,
            },
			zIndex: 1,
			zIndexBoost: false
        });

	}

	componentWillUpdate() {

		this.scale = this.initScale;
		this.mapContainer.style.transform = `scale3d(${this.scale}, ${this.scale}, 1)`;
		this.map.style.transform = 'translate3d(0px, 0px, 0px)';

	}

	scaleHandler(e) {

        const event = e || document.event;

		if (event.deltaY < 0 && this.scale < this.scaleMax) {
			this.scale += this.scaleStep * this.scale;
		}
        else if (event.deltaY > 0 && this.scale > this.scaleMin) {
			this.scale -= this.scaleStep * this.scale;
		}
        else {
            return;
        }

		const originX = 100 * event.clientX / this.windowWidth;
		const originY = 100 * event.clientY / this.windowHeight;

		this.mapContainer.style.transform = `scale3d(${this.scale}, ${this.scale}, 1)`;
        this.mapContainer.style.transformOrigin = `${originX}% ${originY}% 1`;

	}

	render() {

		let mapItems = this.props.mapState.map((item, index) => {
			let key = item.id + item.version;
			return (
				<MapComponent key={key} id={item.id} version={item.version} />
			)
		});

		return (
			<div className="mapContainer" ref="mapContainer" onWheel={this.scaleHandler.bind(this)}>
				<div className="map" ref="map">
					<svg x="0px" y="0px" viewBox="0 0 1024 768" enable-background="new 0 0 1024 768">
						<g>
							<polygon fill="#444444" points="510.9,155.7 20.6,442.8 510.9,724 1003.1,439.8"/>
						</g>
					</svg>
					<ReactCSSTransitionGroup className="mapItems" transitionName="mapItems" component="div"
						transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={600} transitionLeaveTimeout={600}>
						{mapItems}
					</ReactCSSTransitionGroup>
					<hotpointsContainer />
				</div>
			</div>
		)
	}

}

export default Map
