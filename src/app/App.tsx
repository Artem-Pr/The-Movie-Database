import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

import {RoutePaths} from 'src/globalTypes';

import {Layout} from './components';
import {MainPage} from './pages/MainPage';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route
                path={RoutePaths.MAIN}
                element={<Layout />}
            >
                <Route
                    index
                    element={<MainPage />}
                />
                <Route
                    path={RoutePaths.DESCRIPTION}
                    element={(
                        <h1>Description</h1>
                    )}
                />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default App;
