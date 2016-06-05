import React from 'react'

class MapItem0A extends React.Component {

	constructor() {

		super()

	}

	render() {

		return (
			<div className="mapItemContainer">
				<img src="assets/images/mapItems/mapItem0A.svg" className="mapItem" id={`mapItem${this.props.id}`}/>
					<div className="mapItem__container-smoke mapItem__container-smoke-green">
						<span className="mapItem mapItem__smoke mapItem__smoke-0"></span>
					</div>
					<div className="mapItem__container-smoke mapItem__container-smoke-green">
						<span className="mapItem mapItem__smoke mapItem__smoke-1"></span>
					</div>
					<div className="mapItem__container-smoke mapItem__container-smoke-green">
						<span className="mapItem mapItem__smoke mapItem__smoke-2"></span>
					</div>
					<div className="mapItem__container-smoke mapItem__container-smoke-green">
						<span className="mapItem mapItem__smoke mapItem__smoke-3"></span>
					</div>
					<div className="mapItem__container-smoke mapItem__container-smoke-red">
						<span className="mapItem mapItem__smoke mapItem__smoke-4"></span>
					</div>
					<div className="mapItem__container-smoke mapItem__container-smoke-red">
						<span className="mapItem mapItem__smoke mapItem__smoke-5"></span>
					</div>
					<div className="mapItem__container-smoke mapItem__container-smoke-red">
						<span className="mapItem mapItem__smoke mapItem__smoke-6"></span>
					</div>
					<div className="mapItem__container-smoke mapItem__container-smoke-red">
						<span className="mapItem mapItem__smoke mapItem__smoke-7"></span>
					</div>
			</div>
		)

	}

}

export default MapItem0A
