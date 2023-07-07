import React from "react";
import {MainPage} from "pages/MainPage/MainPage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "store";
import Wrapper from "components/Wrapper/Wrapper";

function App() {
    return (
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/search" element={<Wrapper childComponent={MainPage}/>}/>
                        <Route
                                path="*"
                                element={<Navigate to="/search" replace/>}
                        />
                    </Routes>
                </BrowserRouter>
            </Provider>
    );
}

export default App;
