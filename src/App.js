import React, {Suspense} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import Store from './components/Store';
import Landing from './pages/Landing';
import Store from './states/store';

const App = () => {
    // setTimeout(() => {
    //     hideLoader();
    //     hideOverlay();
    // }, 1000)
    return (
        <Suspense fallback="Loading...">
            <Router>
                <Store>
                    <div className="App">
                        <Switch>
                            <Route exact path="/"
                                component={Landing}/>
                        </Switch>
                    </div>
                </Store>
            </Router>
        </Suspense>
    );
}
export default App;
