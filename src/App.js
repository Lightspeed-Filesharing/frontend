import React, {Suspense} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Store from './states/store';

const Landing = React.lazy(() => import ("./pages/Landing.js"));
const Download = React.lazy(() => import ("./pages/Download.js"));

const App = () => {
    return (
        <Suspense fallback="Loading...">
            <Router>
                <Store>
                    <div className="App">
                        <Switch>
                            <Route exact path="/"
                                component={Landing} />
                            <Route path="/:uuid"
                                component={Download} />
                        </Switch>
                    </div>
                </Store>
            </Router>
        </Suspense>
    );
}
export default App;
