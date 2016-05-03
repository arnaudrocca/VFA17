class Audio {

    /**
	 * @constructor
	 */
    constructor(soundPath) {

        this.soundPath = soundPath;

        const constructor = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new constructor();
        this.analyser = this.audioCtx.createAnalyser();
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    }

    /**
	 * @method
	 * @name loadSound
	 * @description Load the sound
	 */
    loadSound() {

        let request = new XMLHttpRequest();
        request.open('GET', this.soundPath, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function() {

            this.audioCtx.decodeAudioData(request.response, function(buffer) {

                // Success callback
                this.audioBuffer = buffer;

                // Create sound from buffer
                this.audioSource = this.audioCtx.createBufferSource();
                this.audioSource.buffer = this.audioBuffer;

                // Connect the audio source to context's output
                this.audioSource.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);

                // Play the sound
                this.audioSource.crossOrigin = 'anonymous';
                this.audioSource.start(this.audioCtx.currentTime);

                // Loop the sound
                this.audioSource.loop = true;

            }.bind(this), function() {

                // Error callback

            });

        }.bind(this);

        request.send();

    }

    /**
	 * @method
	 * @name splitFrenquencyArray
	 * @description Split the frequency data
     * @param {array} frequencyData
     * @param {number} split - The length of the frequencyArray
     * @return {array} frequencyArray
	 */
    splitFrenquencyArray(frequencyData, split) {

        let length = frequencyData.length,
            frequencyArray = new Array(),
            i = 0;

        while (i < length) {
            let size = Math.ceil((length - i) / split--);
            frequencyArray.push(frequencyData.slice(i, i + size));
            i += size;
        }

        return frequencyArray;

    }

    /**
	 * @method
	 * @name getAudioData
     * @description Define how much information you want to get from the original frequency data
     * @param {number} split - The number of splitted array
	 * @return {array} audioData / {number} average
	 */
    getAudioData(split = 1) {

        this.analyser.getByteFrequencyData(this.frequencyData);

        if (split > 1) {

            // Split the frequency array
		    const frequencyArray = this.splitFrenquencyArray(this.frequencyData, split);

            let audioData = new Array();

            // Make average of frenquency array entries
            for (let i in frequencyArray) {
                const splittedArray = frequencyArray[i];
                let average = 0;

                for (let frequency of splittedArray) {
                    average += frequency;
                }
                audioData[i] = average / splittedArray.length;
            }

            return audioData;

        } else {

            // Calculate the average
            let average = 0;

            for (let frequency of this.frequencyData) {
                average += frequency;
            }
            average = average / this.frequencyData.length;

            return average;

        }

    }

}

export default Audio
