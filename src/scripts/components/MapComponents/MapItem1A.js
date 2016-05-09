import React from 'react'

class MapItem2A extends React.Component {

	constructor() {

		super();

	}

	render() {

		return (
			<img src="assets/images/mapItems/mapItem1A.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
		)

	}

}

export default MapItem2A
