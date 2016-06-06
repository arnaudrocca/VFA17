import { CONSTANTS } from '../constants/index'
import { hashHistory } from 'react-router'
import answersData from '../data/answers.json'
import choicesData from '../data/choices.json'

const choiceUpdate = (choiceId, choice, nextChoiceVersion) => {

    return {
        type: CONSTANTS.CHOICE_UPDATE,
        choiceId,
        choice,
        nextChoiceVersion
    }

}

export const choicesDoneIncrement = () => {

    return {
        type: CONSTANTS.CHOICESDONE_INCREMENT
    }

}

const menuUpdate = (choiceId, period) => {

    return {
        type: CONSTANTS.MENU_UPDATE,
        choiceId,
        period
    }

}

const mapUpdate = (itemId, itemVersion) => {

    return {
        type: CONSTANTS.MAP_UPDATE,
        itemId,
        itemVersion
    }

}

const scoreUpdate = (score) => {

    return {
        type: CONSTANTS.SCORE_UPDATE,
        score
    }

}

export const mayorTalks = (dialog,mood) => {

    return {
        type: CONSTANTS.MAYOR_TALKS,
        dialog,
        mood
    }

}

const hotpointUpdate = (mapId, answer) => {

    return {
        type: CONSTANTS.HOTPOINT_UPDATE,
        mapId,
        answer
    }

}

export const choiceMade = (choiceId, answer) => {

    return (dispatch, getState) => {
        const consequences = answersData.find((choice) => {
            return choice.name == answer
        })

        const choiceDone = choicesData.find((choice) => {
            return choice.id == choiceId
        })

        hashHistory.push('/experiment')

        dispatch(choiceUpdate(choiceId, answer, consequences.nextChoiceVersion))
        dispatch(menuUpdate(choiceId, choiceDone.period))

        setTimeout(() => {
            dispatch(choicesDoneIncrement())
            dispatch(scoreUpdate(consequences.score))

            for (let i in consequences.mapIds) {
                dispatch(mapUpdate(consequences.mapIds[i], consequences.mapVersions[i]))
                dispatch(hotpointUpdate(consequences.mapIds[i], answer))
            }

            setTimeout(() => {
                dispatch(mayorTalks(consequences.dialog, consequences.mood))
            }, 3500)
        }, 1000)

        console.log(getState(), 'NEW STATE')
    }

}
