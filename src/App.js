import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, {PureComponent} from "react";
import MainPage from "./components/MainPage";
import SelectedTransport from "./components/SelectedTransport";

class App extends PureComponent {


    render() {
        return (


            <BrowserRouter>
                <div>
                    <Switch>
                        {/* alex: давай все таки вынесем из index роутинг,
                    роутинг -- это внутрянка приложения,
                    а здесь пусть будут подключения провайдеров, миддлеваров и прочей штуки.
                    поэтому я предлагаю вынести его хотя бы в App.js,
                    а то, что в App -- перенести в другой компонент, например, в MainPage
                    */}
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/route/:transportId" component={SelectedTransport}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}



export default App;
