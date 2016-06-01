import React from 'react'

class MapItem6B extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<div className="mapItemContainer">
				<img src="assets/images/mapItems/mapItem6B.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
				<img className="mapItem mapItem--turbine mapItem--turbine-0" src="assets/images/mapAnimations/turbine.svg"/>
				<img className="mapItem mapItem--turbine mapItem--turbine-1" src="assets/images/mapAnimations/turbine.svg"/>
				<img className="mapItem mapItem--turbine mapItem--turbine-2" src="assets/images/mapAnimations/turbine.svg"/>
				<img className="mapItem mapItem--turbine mapItem--turbine-3" src="assets/images/mapAnimations/turbine.svg"/>
			</div>
		)

	}

}

export default MapItem6B
