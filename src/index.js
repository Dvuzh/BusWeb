import React from 'react';
// alex: подправила импорты. вообще, хорошей практикой считается использование eslint с какими-нибудь правилами
// мы на проекте используем airbnb (https://www.npmjs.com/package/eslint-config-airbnb)
// он строгий, зато быстро научишься соблюдать указанные кодстайлы.
// p.s. некоторые правила можно отключить
// ах да, еще посмотри prettier (https://prettier.io/) -- позволяет автоматически раз и поправить форматирование 
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import SelectedTransport from './components/SelectedTransport';
import reducer from './store/reducers';
import * as serviceWorker from './serviceWorker';
import './index.css';
import axios from "axios";


// alex: вообще настройки для расширения в будущем необходимо на окружениях не использовать, для этого можно чекать переменную окружения, например
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

axios.defaults.baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3001' : 'http://bus.dextudio.com:3001' ;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    {/* alex: давай все таки вынесем из index роутинг, 
                    роутинг -- это внутрянка приложения, 
                    а здесь пусть будут подключения провайдеров, миддлеваров и прочей штуки.
                    поэтому я предлагаю вынести его хотя бы в App.js,
                    а то, что в App -- перенести в другой компонент, например, в MainPage
                    */}
                    <Route exact path="/" component={App}/>
                    <Route path="/route/:transportId" component={SelectedTransport}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

