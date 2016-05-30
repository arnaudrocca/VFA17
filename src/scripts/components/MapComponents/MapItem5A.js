import React from 'react'

class MapItem5A extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<div className="mapItemContainer">
				<img src="assets/images/mapItems/mapItem5A.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
			</div>
		)

	}

}

export default MapItem5A
