import React, { Suspense } from "react";
import "./App.less";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { store } from "./redux/ConfigureStore";
import Router from "./Router";
import { Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function App() {
    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <Suspense
                    fallback={
                        <div
                            style={{
                                height: "100vh",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                            }}
                        >
                            <Spin indicator={<FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />} tip="loading..." />
                        </div>
                    }
                >
                    <Router />
                </Suspense>
            </I18nextProvider>
        </Provider>
    );
}

export default App;
