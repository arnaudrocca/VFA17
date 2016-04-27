import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import MapComponent from './MapComponent'
import HotpointsContainer from '../containers/HotpointsContainer'

class Map extends React.Component {

	constructor() {

		super();

	}

	componentDidMount() {

		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;

		this.mapContainer = ReactDOM.findDOMNode(this.refs.mapContainer);
		this.map = ReactDOM.findDOMNode(this.refs.map);

		this.scale = 1;
		this.scaleStep = .15;
		this.scaleMin = .75;
		this.scaleMax = 4;

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

		this.scale = 1;
		this.mapContainer.style.transform = `scale(1)`;
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

		this.mapContainer.style.transform = `scale(${this.scale})`;
        this.mapContainer.style.transformOrigin = `${originX}% ${originY}%`;

	}

	render() {

		let mapItems = this.props.mapState.map((item, index) => {
			let key = item.id + item.version;
			return (
				<MapComponent key={key} id={item.id} version={item.version} />
			)
		});

		return (
			<div className="mapContainer" ref="mapContainer">
				<svg className="map" ref="map" x="0px" y="0px" viewBox="0 0 1024 768" enable-background="new 0 0 1024 768"
                onWheel={this.scaleHandler.bind(this)}>
					<g>
						<polygon fill="#444444" points="510.9,155.7 20.6,442.8 510.9,724 1003.1,439.8"/>
					</g>
					<ReactCSSTransitionGroup className="mapItems" transitionName="mapItems"  component="g"
						transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={600} transitionLeaveTimeout={600}>
						{mapItems}
					</ReactCSSTransitionGroup>
					<HotpointsContainer />
				</svg>
			</div>
		)
	}

}

export default Map
