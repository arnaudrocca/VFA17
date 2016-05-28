import React from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'

const mapStateToProps = (state) => {

	return {
		mapState: state.map,
		score: state.score
	}

}

const MapContainer = connect(
	mapStateToProps
)(Map)

export default MapContainer
