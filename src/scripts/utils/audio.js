class Audio {

    /**
	 * @constructor
	 */
    constructor() {

        const Constructor = window.AudioContext || window.webkitAudioContext
        this.audioContext = new Constructor()
        this.analyser = this.audioContext.createAnalyser()
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)

    }

    /**
	 * @method
	 * @name loadSound
	 * @description Load the sound
	 */
    loadSound(soundPath) {

        this.soundPath = soundPath

        const request = new XMLHttpRequest()
        request.open('GET', this.soundPath, true)
        request.responseType = 'arraybuffer'

        // Decode asynchronously
        request.onload = () => {

            this.audioContext.decodeAudioData(request.response, (buffer) => {

                // SUCCESS CALLBACK

                // Create sound from buffer
                this.audioBuffer = buffer
                this.audioSource = this.audioContext.createBufferSource()
                this.audioSource.buffer = this.audioBuffer

                // Connect the audio source to context's output
                this.audioSource.connect(this.analyser)
                this.analyser.connect(this.audioContext.destination)

                // Audio source params
                this.audioSource.crossOrigin = 'anonymous'
                this.audioSource.loop = true

                // Play the sound
                this.audioSource.start(this.audioContext.currentTime)

            }, (error) => {

                // ERROR CALLBACK
                console.info(`The following error occured : \n${error}`)

            })

        }

        request.send()

    }

    /**
	 * @method
	 * @name readSound
	 * @description Read the sound from the microphone
	 */
    readSound() {

        if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) {

            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

            navigator.getUserMedia({

                'audio': true,
                'video': false

            }, (stream) => {

                // SUCCESS CALLBACK
                this.userMedia = 'success'

                this.audioStream = stream
                this.audioSource = this.audioContext.createMediaStreamSource(this.audioStream)

                this.analyser.fftSize = 4096
                this.audioSource.connect(this.analyser)

            }, (error) => {

                // ERROR CALLBACK
                this.userMedia = 'error'
                console.info(`The following error occured : \n${error}`)

            })

        } else {

            this.userMedia = 'error'
            console.info("getUserMedia not supported.")

        }

    }

    /**
     * @method
     * @name stopAudioStream
     */
    stopAudioStream() {

        const audioStreamTracks = this.audioStream.getAudioTracks()

        for (let audioTrack of audioStreamTracks) {
            audioTrack.stop()
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
