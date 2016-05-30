import React from 'react'

class MapItem2A extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<div className="mapItemContainer">
				<img src="assets/images/mapItems/mapItem2A.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
			</div>
		)

	}

}

export default MapItem2A
