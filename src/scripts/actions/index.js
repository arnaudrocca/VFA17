import { CONSTANTS } from '../constants/index'
import { hashHistory } from 'react-router'
import answersData from '../data/answers.json'

const choiceUpdate = (choiceId, choice, nextChoiceVersion) => {

    return {
        type: CONSTANTS.CHOICE_UPDATE,
        choiceId,
        choice,
        nextChoiceVersion
    }

}

const choicesDoneIncrement = () => {

    return {
        type: CONSTANTS.CHOICESDONE_INCREMENT
    }

}

const menuUpdate = (choiceId) => {

    return {
        type: CONSTANTS.MENU_UPDATE,
        choiceId
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

export const mayorTalks = (dialog) => {

    return {
        type: CONSTANTS.MAYOR_TALKS,
        dialog
    }

}

const hotpointUpdate = (mapId, answer) => {

    return {
        type: CONSTANTS.HOTPOINT_UPDATE,
        mapId,
        answer
    }

}

export const choiceMade = (choiceId, answer, timeout) => {

    return (dispatch, getState) => {

        setTimeout(()=>{

            let consequences = answersData.find((choice) => {
                return choice.name == answer;
            });

            hashHistory.push('/experiment')

            setTimeout(()=>{
                dispatch(choiceUpdate(choiceId, answer, consequences.nextChoiceVersion));
                dispatch(choicesDoneIncrement());
                dispatch(menuUpdate(choiceId));

                for (let i of consequences.mapIds) {
                    dispatch(mapUpdate(consequences.mapIds[i], consequences.mapVersions[i]));
                    dispatch(hotpointUpdate(consequences.mapIds[i], answer));
                }

                dispatch(scoreUpdate(consequences.score));
                dispatch(mayorTalks(consequences.dialog));

                console.log(getState(),'NEW STATE');
            },1000)

        },timeout)
       
    }

}
