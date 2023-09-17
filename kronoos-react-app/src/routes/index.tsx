import {Route, Routes} from 'react-router-dom';
import Home from "../views/Home";

const routes = () => (
    <Routes>
        <Route path="/" element={<Home/>}/>
    </Routes>
)

export default routes;
