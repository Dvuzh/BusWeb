import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './App';
import reducer from './store/reducers/rootReducer';
import * as serviceWorker from './serviceWorker';
import './index.css';
import axios from "axios";

// alex: вообще настройки для расширения в будущем необходимо на окружениях не использовать, для этого можно чекать переменную окружения, например
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

axios.defaults.baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3001' : 'http://bus.dextudio.com:3001';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>), document.getElementById('root'));

serviceWorker.unregister();