import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

import {RoutePaths} from 'src/globalTypes';

import {Layout} from './components';
import {DetailsPage} from './pages/DetailsPage';
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
                    path={`${RoutePaths.DETAILS}/:id`}
                    element={<DetailsPage />}
                />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default App;
