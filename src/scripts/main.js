import 'gsap'
import 'Draggable'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import mainReducer from './reducers/index'
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Video from './components/Video'
import Experiment from './components/Experiment'
import Choice from './containers/choiceContainer'
import ChoiceContext from './components/ChoiceContext'
import ChoiceInteraction from './components/ChoiceInteraction'

const store = createStore(
    mainReducer,
	applyMiddleware(
		thunkMiddleware
	)
)

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="video" component={Video}></Route>
                <Route path="experiment" component={Experiment}></Route>
                <Route name="choice" path="choice/:id" component={Choice}></Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)
