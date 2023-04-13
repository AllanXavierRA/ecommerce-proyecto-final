import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../../layouts/BasicLayout";
import { getWatchesPlatformApi, getTotalWatchesPlatformApi } from "../../api/watch";
import ListWatches from "../../components/ListWatches";
import Pagination from "../../components/Pagination";

const limitPerPage = 10;

export default function Platform(){
    const { query } =useRouter();
    const [watches, setWatches] = useState(null);
    const [totalWatches, setTotalWatches] = useState(null);

    const getStartItem = () => {
        const currentPages = parseInt(query.page);
        if(!query.page || currentPages === 1) return 0;
        else return currentPages * limitPerPage - limitPerPage;
    }

    useEffect(() => {
        (async () => {
            if(query.platform){
                const response = await getWatchesPlatformApi(query.platform, limitPerPage, getStartItem());
                setWatches(response);
            }
        })();
    }, [query])

    useEffect(() => {
        (async () => {
            const response = await getTotalWatchesPlatformApi(query.platform);
            setTotalWatches(response);
        })()
    }, [query])
   
    return (
        <BasicLayout className="platform">
            {!watches && <Loader active>Cargando relojes</Loader>}
            {watches && size(watches) === 0 && (
                <div>
                    <h3>No hay relojes</h3>
                </div>
            )}
            {size(watches) > 0 &&  <ListWatches watches={watches}/>}

            {totalWatches ? <Pagination totalWatches={totalWatches} page={query.page ? parseInt(query.page) : 1} limitPerPage={limitPerPage}/> : null}
        </BasicLayout>
    )
}