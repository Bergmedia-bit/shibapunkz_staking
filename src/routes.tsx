

import { Route, Routes  } from "react-router-dom";

import Staking from "./Components/Staking/staking";


const Main = () => {

    return (
            <Routes >
                <Route path="/" element={<Staking />} />
            
                <Route path="/staking" element={<Staking />} />
            </Routes >
    )
}
export default Main;