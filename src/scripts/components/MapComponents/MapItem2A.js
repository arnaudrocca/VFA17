import React from 'react'

class MapItem3A extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<img src="assets/images/mapItems/mapItem2A.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
		)

	}

}

export default MapItem3A
