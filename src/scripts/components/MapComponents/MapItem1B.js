import React from 'react'

class MapItem2B extends React.Component {

	constructor() {

		super();

	}

	render() {

		return (
			<img src="assets/images/mapItems/mapItem1B.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
		)

	}

}

export default MapItem2B
