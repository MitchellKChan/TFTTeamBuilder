import React from "react";
import Board from "./Board";
import Items from "./Items";
import Traits from "./Traits";
import Units from "./Units";


function App() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-2 traits">
                    <div className="">
                        <Traits />
                    </div>
                </div>
                <div className="col-xl-10">
                    <div className="row pb-4">
                        <div className="col-lg-9 board">
                            <div className=""><Board /></div>
                        </div>
                        <div className="col-lg-3 equipped-items">
                            {/* <div className="">Equipped Items</div> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-9 units">
                            <div>Units</div>
                            <div className=""><Units /></div>
                        </div>
                        <div className="col-xl-3 items">
                            <div>Items</div>
                            <div className=""><Items /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
