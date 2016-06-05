import React from 'react'

class MapItem6A extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<div className="mapItemContainer">
				<img src="assets/images/mapItems/mapItem6A.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
				<div className="mapItem__container-smoke mapItem__container-smoke-grey">
					<span className="mapItem mapItem__smoke mapItem__smoke-8"></span>
				</div>
				<div className="mapItem__container-smoke mapItem__container-smoke-grey">
					<span className="mapItem mapItem__smoke mapItem__smoke-9"></span>
				</div>
				<div className="mapItem__container-smoke mapItem__container-smoke-grey">
					<span className="mapItem mapItem__smoke mapItem__smoke-10"></span>
				</div>
				<div className="mapItem__container-smoke mapItem__container-smoke-grey">
					<span className="mapItem mapItem__smoke mapItem__smoke-11"></span>
				</div>
			</div>
		)

	}

}

export default MapItem6A
