import React from 'react'

const IconHold = ({width, classes, offset, circlePerimeter}) => (

	<svg x="0px" y="0px" width={width} className={classes} viewBox="0 0 75 75">
		<path fill="#8C8C8C" d="M37.5,75C16.8,75,0,58.2,0,37.5S16.8,0,37.5,0S75,16.8,75,37.5S58.2,75,37.5,75z"/>
		<circle fill="#FFFFFF" cx="37.5" cy="37.5" r="32.5"/>
		<circle className="js-hold-circle" fill="none" stroke="#FF5951" strokeDashoffset={offset} strokeDasharray={circlePerimeter} strokeWidth="4" cx="37.5" cy="37.5" r="35"/>
	</svg>

)

export default IconHold
