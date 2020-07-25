import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from '../Home/Home';
import Landing from '../Landing/Landing';

function App() {
	return (
		<Fragment>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/result" component={Landing} />
					{/* <Route component={Home} /> */}
				</Switch>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
