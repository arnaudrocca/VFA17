import React from 'react'

const IconDrag = ({width, classes, circlePerimeter, offset}) => (

	<svg className={classes} x="0px" y="0px" viewBox="-269 360 73 73" width={width}>
		<path opacity="0.5" fill="#2D2E3A" enable-background="new" d="M-232.5,361.5c-19.3,0-35,15.7-35,35s15.7,35,35,35
			s35-15.7,35-35S-213.2,361.5-232.5,361.5z M-232.5,419.5c-12.7,0-23-10.3-23-23s10.3-23,23-23s23,10.3,23,23
			S-219.8,419.5-232.5,419.5z"/>
		<path opacity="0.35" fill="#FFFFFF" enable-background="new" d="M-232.5,361.5c-19.3,0-35,15.7-35,35
			s15.7,35,35,35s35-15.7,35-35S-213.2,361.5-232.5,361.5z"/>
		<circle className="js-remaining wireframe__drag__gauge" strokeDashoffset={offset} strokeDasharray={circlePerimeter} fill="none" stroke="#FF5951" strokeWidth="10" strokeMiterlimit="10" cx="-232.5" cy="396.5" r="28.2"/>
		<circle fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" cx="-232.5" cy="396.5" r="35"/>
		<circle fill="#FFFFFF" cx="-232.5" cy="396.5" r="23"/>
		<line fill="none" stroke="#FFFFFF" strokeMiterlimit="10" x1="-232.5" y1="361.5" x2="-232.5" y2="375.1"/>
		<line fill="none" stroke="#FFFFFF" strokeMiterlimit="10" x1="-265.9" y1="385.9" x2="-252.7" y2="389.9"/>
		<line fill="none" stroke="#FFFFFF" strokeMiterlimit="10" x1="-199.1" y1="385.9" x2="-212.2" y2="389.9"/>
		<line fill="none" stroke="#FFFFFF" strokeMiterlimit="10" x1="-252.9" y1="424.9" x2="-245.2" y2="414"/>
		<line fill="none" stroke="#FFFFFF" strokeMiterlimit="10" x1="-212.1" y1="424.9" x2="-219.9" y2="413.8"/>
	</svg>

)

export default IconDrag
