import React from 'react'

class MapItem6A extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<div className="mapItemContainer">
				<img src="assets/images/mapItems/mapItem6A.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
			</div>
		)

	}

}

export default MapItem6A
