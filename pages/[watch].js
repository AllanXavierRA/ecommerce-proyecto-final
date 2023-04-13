import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import { getWatchByUrlApi } from "../api/watch";
import HeaderWatch from "../components/Watch/HeaderWatch";
import TabsWatch from "../components/Watch/TabsWatch";

export default function Watch(){
    const[watch, setWatch] = useState(null);
    const { query } = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getWatchByUrlApi(query.watch);
            setWatch(response);
        })();
    }, [query]);
    
    if(!watch) return null;
    
    
    return (
        <BasicLayout className="watch">
            <HeaderWatch watch={watch}/>
            <TabsWatch watch={watch}/>
        </BasicLayout>
    );
}