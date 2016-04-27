import React from 'react'
import * as MapComponents from './MapComponents'

class MapComponent extends React.Component {

	constructor() {

		super();

	}

	getContent() {

		this.componentName = 'MapItem' + this.props.id + this.props.version;

		for (let mapComponent in MapComponents) {
			if (mapComponent == this.componentName) {
				this.component = MapComponents[mapComponent];
				break;
			}
		}

	}

	render() {

		this.getContent();

		return (
			<this.component id={this.props.id} key={this.componentName} />
		)

	}

}

export default MapComponent
