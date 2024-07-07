import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { OrderConfirmModal, OrderForm } from "./components";

import "./styles/global.scss";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <OrderForm />
            <OrderConfirmModal />
        </Provider>
    );
};

export default App;
