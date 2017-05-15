/**
 * Created by Afaci on 08/05/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import injectTabEventPlugin from 'react-tap-event-plugin';
import App from './App.jsx';
import './styles.css';

injectTabEventPlugin();

const root = document.querySelector('#root');

ReactDOM.render(
    <App/>,
    root,
);
