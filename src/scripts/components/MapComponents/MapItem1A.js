import React from 'react'

class MapItem1A extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<div className="mapItemContainer">
				<img src="assets/images/mapItems/mapItem1A.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
			</div>
		)

	}

}

export default MapItem1A
