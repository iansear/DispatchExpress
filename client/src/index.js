import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import RegisterEmployee from './components/RegisterEmployee'
import CreateJob from './components/CreateJob'
import JobDetails from './components/JobDetails'
import Manifest from './components/Manifest'
import History from './components/History'
import JobDetailsCourier from './components/JobDetailsCourier'
import CourierDetails from './components/CourierDetails'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path = '/' component = {Home} />
                    <Route path = '/dashboard' component = {Dashboard} />
                    <Route path = '/manifest' component = {Manifest} />
                    <Route path = '/history' component = {History} />
                    <Route path = '/registeremployee' component = {RegisterEmployee} />
                    <Route path = '/courierdetails/:id' component = {CourierDetails} />
                    <Route path = '/createjob' component = {CreateJob} />
                    <Route path = '/jobdetails/:jobID' component = {JobDetails} />
                    <Route path = '/jobdetailscourier/:jobID' component = {JobDetailsCourier} />
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();