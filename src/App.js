import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Body from './components/Body';
import Cart from './components/Cart';
import RestaurantMenu from './components/RestaurantMenu';
import Error from './components/Error';
import { Provider } from 'react-redux';
import store from './utils/store';
import MainRestaurantList from './components/MainRestaurantList';
import SearchRestaurants from './components/SearchRestaurants';
import Help from './components/Help';
import LoginSingup from './components/LoginSingup';


const Help = lazy(() => import('./components/Help'))

const App = () => {
    return (
        <Provider store={store}>
            <Header />
            <Outlet />
            <Footer />
        </Provider>
    );
};
const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children:[
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/Sign In",
                element: <LoginSingup />
            },
            {
                path: "/offers",
                element: <MainRestaurantList />
            },
            {
                path: "/help",
                element: <Suspense><Help /></Suspense>
            },
            {
                path: "/search",
                element: <SearchRestaurants />,
            },
        ]

    }
])



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);