import React from 'react'

class MapItem6B extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<div className="mapItemContainer">
				<img src="assets/images/mapItems/mapItem6B.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
				<div className="mapItem__turbine__container mapItem__turbine__container-0">
					<img className="mapItem mapItem__turbine mapItem__turbine-0" src="assets/images/mapElements/turbine.svg"/>
				</div>
				<div className="mapItem__turbine__container mapItem__turbine__container-1">
					<img className="mapItem mapItem__turbine mapItem__turbine-1" src="assets/images/mapElements/turbine.svg"/>
				</div>
				<div className="mapItem__turbine__container mapItem__turbine__container-2">
					<img className="mapItem mapItem__turbine mapItem__turbine-2" src="assets/images/mapElements/turbine.svg"/>
				</div>
				<div className="mapItem__turbine__container mapItem__turbine__container-3">
					<img className="mapItem mapItem__turbine mapItem__turbine-3" src="assets/images/mapElements/turbine.svg"/>
				</div>
			</div>
		)

	}

}

export default MapItem6B
