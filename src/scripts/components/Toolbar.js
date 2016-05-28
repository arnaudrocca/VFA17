import React from 'react'
import ReactDOM from 'react-dom'
import IconSound from './iconsComponents/icon-sound'
import IconScreen from './iconsComponents/icon-screen'

class Toolbar extends React.Component {

    /**
     * @constructor
     */
    constructor() {

        super()

        this.fullScreenToggled = false
        this.audioEnable = true

        this.spacebarDownHandler = this.spacebarDownHandler.bind(this)

    }

    /**
     * @method
     * @name componentDidMount
     */
    componentDidMount() {

        this.audioButton = ReactDOM.findDOMNode(this.refs.audioButton)
        this.audioPlayer = ReactDOM.findDOMNode(this.refs.audioPlayer)

        window.addEventListener('keydown', this.spacebarDownHandler)

    }

    /**
     * @method
     * @name componentWillUnmount
     */
    componentWillUnmount() {

        window.removeEventListener('keydown', this.spacebarDownHandler)

    }

    /**
     * @method
     * @name spacebarDownHandler
     * @param {object} e - event
     */
    spacebarDownHandler(e) {

        const event = e || window.e
        const key = event.keyCode || event.which

        if (key == 32) {
            event.stopPropagation()
            event.preventDefault()
            return false
        }

    }

    /**
     * @method
     * @name mouseEnterHandler
     */
    mouseEnterHandler() {

        if (this.audioEnable) {
            this.audioPlayer.currentTime = 0
            this.audioPlayer.play()
        }

    }

    /**
     * @method
     * @name toggleAudio
     */
    toggleAudio() {

        if (this.audioEnable) {
            this.audioEnable = false
            TweenMax.to(this.audioButton, .3, {opacity: .5})
        } else {
            this.audioEnable = true
            TweenMax.to(this.audioButton, .3, {opacity: 1})
        }

    }

    /**
     * @method
     * @name toggleFullScreen
     */
    toggleFullScreen() {

        if (!this.fullScreenToggled) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
            }
            else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            }
            else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen()
            }
            this.fullScreenToggled = true
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            }
            this.fullScreenToggled = false
        }

    }

    /**
     * @method
     * @name render
     */
    render() {

        return (
            <div className="toolbar">
                <button className="toolbar__btn" onMouseEnter={this.mouseEnterHandler.bind(this)}>
                    <span>Infos</span>
                </button>
                <button className="toolbar__btn" ref="audioButton" onClick={this.toggleAudio.bind(this)} onMouseEnter={this.mouseEnterHandler.bind(this)}>
                    <span><IconSound width="18" color="#fff"/></span>
                </button>
                <button className="toolbar__btn" onClick={this.toggleFullScreen.bind(this)} onMouseEnter={this.mouseEnterHandler.bind(this)}>
                    <span><IconScreen width="22" color="#fff"/></span>
                </button>
                <audio ref="audioPlayer" src="assets/audio/button.mp3" preload="auto"></audio>
            </div>
        )

    }

}

export default Toolbar
