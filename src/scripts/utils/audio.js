class Audio {

    /**
	 * @constructor
	 */
    constructor(soundPath = '') {

        this.soundPath = soundPath

        const constructor = window.AudioContext || window.webkitAudioContext
        this.audioContext = new constructor()
        this.analyser = this.audioContext.createAnalyser()
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)

    }

    /**
	 * @method
	 * @name loadSound
	 * @description Load the sound
	 */
    loadSound() {

        const request = new XMLHttpRequest()
        request.open('GET', this.soundPath, true)
        request.responseType = 'arraybuffer'

        // Decode asynchronously
        request.onload = function() {

            // Success callback
            this.audioContext.decodeAudioData(request.response, function(buffer) {

                this.audioBuffer = buffer

                // Create sound from buffer
                this.audioSource = this.audioContext.createBufferSource()
                this.audioSource.buffer = this.audioBuffer

                // Connect the audio source to context's output
                this.audioSource.connect(this.analyser)
                this.analyser.connect(this.audioContext.destination)

                // Loop the sound
                this.audioSource.loop = true

            // Error callback
            }.bind(this), function(error) {

                console.error('The following error occured : ' + error)

            })

        }.bind(this)

        request.send()

    }

    /**
     * @method
     * @name play
     * @description Play the sound
     */
    play() {

        this.audioSource.crossOrigin = 'anonymous'
        this.audioSource.start(this.audioContext.currentTime)

    }

    /**
	 * @method
	 * @name readSound
	 * @description Read the sound from the microphone
	 */
    readSound() {

        if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) {

            navigator.getUserMedia = navigator.webkitGetUserMedia ||
                                    navigator.mozGetUserMedia ||
                                    navigator.mozGetUserMedia ||
                                    navigator.msGetUserMedia

            navigator.getUserMedia({
                'audio': true
            // Success callback
            }, this.createStream.bind(this), function(e) {
                console.log(e)
            // Error callback
            }, function(error) {
                console.error('The following error occured : ' + error)
            })

        } else {

            console.error("getUserMedia not supported.")

        }

    }

    /**
     * @method
     * @name createStream
     * @param {object} stream
     */
    createStream(stream) {

        this.audioSource = this.audioContext.createMediaStreamSource(stream)
        this.audioStream = stream

        this.analyser.fftSize = 4096
        this.audioSource.connect(this.analyser)

    }

    /**
     * @method
     * @name stopStream
     */
    stopStream() {

        const audioStreamAudioTracks = this.audioStream.getAudioTracks()

        for (let track of audioStreamAudioTracks) {
            track.stop()
        }

    }

    /**
	 * @method
	 * @name getAverage
     * @description Calculate the average amplitude
	 * @return {number} average
	 */
    getAverage() {

        this.analyser.getByteFrequencyData(this.frequencyData)

        let average = 0
        for (let frequency of this.frequencyData) {
            average += frequency
        }
        average = average / this.frequencyData.length

        return average

    }

}

export default Audio
