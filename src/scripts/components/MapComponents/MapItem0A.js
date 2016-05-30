import React from 'react'

class MapItem0A extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<div className="mapItemContainer">
				<img src="assets/images/mapItems/mapItem0A.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
				{/*<svg className="mapItem mapItem-animate">
					<circle cx="45" cy="45" r="40" stroke="black" stroke-width="5" fill="purple" />
				</svg>*/}
			</div>
		)

	}

}

export default MapItem0A
