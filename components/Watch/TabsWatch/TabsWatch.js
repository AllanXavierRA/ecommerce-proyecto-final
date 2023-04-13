import React from "react";
import { Tab } from "semantic-ui-react"
import InfoWatch from "../InfoWatch";

export default function TabsWatch(props){
    const { watch } = props;

    const panes = [
        {
            menuItem: "Información",
            render: () => (
                <Tab.Pane>
                    <InfoWatch watch={watch}/>
                </Tab.Pane>
            )
        },
    ]

    return(
        <Tab className="tabs-watch" panes={panes}/>
    )
}