import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './components/DefaultLayout/DefaultLayout';

function App() {
    return (
        <GlobalStyles>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            let Layout = DefaultLayout;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </GlobalStyles>
    );
}

export default App;
