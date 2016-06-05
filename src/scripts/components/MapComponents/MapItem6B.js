import React from 'react'

class MapItem6B extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<div className="mapItemContainer">
				<img src="assets/images/mapItems/mapItem6B.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
				<div className="mapItem__container-turbine mapItem__container-turbine-0">
					<img className="mapItem mapItem__turbine mapItem__turbine-0" src="assets/images/mapElements/turbine.svg"/>
				</div>
				<div className="mapItem__container-turbine mapItem__container-turbine-1">
					<img className="mapItem mapItem__turbine mapItem__turbine-1" src="assets/images/mapElements/turbine.svg"/>
				</div>
				<div className="mapItem__container-turbine mapItem__container-turbine-2">
					<img className="mapItem mapItem__turbine mapItem__turbine-2" src="assets/images/mapElements/turbine.svg"/>
				</div>
				<div className="mapItem__container-turbine mapItem__container-turbine-3">
					<img className="mapItem mapItem__turbine mapItem__turbine-3" src="assets/images/mapElements/turbine.svg"/>
				</div>
			</div>
		)

	}

}

export default MapItem6B
