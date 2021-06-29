import React, {Suspense} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import Store from './components/Store';
import Landing from './pages/Landing';

// import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


// const FallbackLoader = () => {
//     return (
//         <Loader type="Rings" color="#00BFFF"
//             height={80}
//             width={80}/>
//     );
// }

const App = () => {
    // setTimeout(() => {
    //     hideLoader();
    //     hideOverlay();
    // }, 1000)
    return (
        <Suspense fallback="Loading...">
            <Router>
                {/* <Store> */}
                    <div className="App">
                        <Switch>
                            <Route exact path="/"
                                component={Landing}/>
                        </Switch>
                    </div>
                {/* </Store> */}
            </Router>
        </Suspense>
    );
}
export default App;
