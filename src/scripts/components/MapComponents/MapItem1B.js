import React from 'react'

class MapItem1B extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<div className="mapItemContainer">
				<img src="assets/images/mapItems/mapItem1B.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
			</div>
		)

	}

}

export default MapItem1B
