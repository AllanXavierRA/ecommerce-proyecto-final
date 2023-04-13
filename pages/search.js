import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { searchWatchesApi } from "../api/watch";
import ListWatches from "../components/ListWatches";

export default function search(){
    const [watches, setWatches] = useState(null);
    const { query } = useRouter();

    useEffect(() => {
        document.getElementById("search-watch").focus();
    },[])

    useEffect(() => {
        (async () => {
            if(size(query.query)>0){
                const response = await searchWatchesApi(query.query);
                if(size(response) > 0) setWatches(response);
                else setWatches([]);
            }else{
                setWatches([]);
            }
        })()
    }, [query])

    return (
        <BasicLayout className="search">
            {!watches && <Loader active>Buscando reloj</Loader>}
            {watches && size(watches) === 0 && (
                <div>
                    <h3>No se han encontrado relojes</h3>
                </div>
            )}
            {size(watches) > 0 && <ListWatches watches={watches}/>}
        </BasicLayout>
    )
}