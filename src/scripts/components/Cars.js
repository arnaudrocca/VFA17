import React from 'react'

class Cars extends React.Component {

	/**
     * @constructor
     */
	constructor() {

		super()

	}

	/**
     * @method
	 * @name render
     */
	render() {

		return (
			<div>
                <div className="mapItem__container--car mapItem__container--car-police">
                    <img className="mapItem mapItem--car mapItem--car-police" src="assets/images/mapElements/cars/car-police.svg"/>
                </div>
                <div className="mapItem__container--car mapItem__container--car-red">
                    <img className="mapItem mapItem--car mapItem--car-red" src="assets/images/mapElements/cars/car-red.svg"/>
                </div>
                <div className="mapItem__container--car mapItem__container--car-yellow-left">
                    <img className="mapItem mapItem--car mapItem--car-yellow-left" src="assets/images/mapElements/cars/car-yellow-left.svg"/>
                </div>
                <div className="mapItem__container--car mapItem__container--car-yellow-down">
                    <img className="mapItem mapItem--car mapItem--car-yellow-down" src="assets/images/mapElements/cars/car-yellow-down.svg"/>
                </div>
                <div className="mapItem__container--car mapItem__container--car-truck">
                    <img className="mapItem mapItem--car mapItem--car-truck" src="assets/images/mapElements/cars/truck.svg"/>
                </div>
			</div>
		)

	}

}

export default Cars
