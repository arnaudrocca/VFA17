import React from 'react'
import IconSound from './svg/icon-sound'
import IconScreen from './svg/icon-screen'

class Toolbar extends React.Component {

    constructor() {

        super()

    }

    toggleFullScreen() {

        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
            }
            else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen()
            }
            else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            }
        }

    }

    render() {

        return(
            <div className="toolbar">
                <button className="toolbar__btn">
                    <span>Infos</span>
                </button>
                <button className="toolbar__btn">
                    <span><IconSound width="18" color="#fff"/></span>
                </button>
                <button className="toolbar__btn" onClick={this.toggleFullScreen.bind(this)}>
                    <span><IconScreen width="22" color="#fff"/></span>
                </button>
            </div>
        )

    }

}

export default Toolbar
