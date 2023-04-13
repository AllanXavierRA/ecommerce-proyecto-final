import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, forEach } from "lodash";
import BasicLaout from "../layouts/BasicLayout";
import { getFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import ListWatches  from "../components/ListWatches";

export default function wishlist(){
    const [watches, setWatches] = useState(null);
    const {auth, logout} = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getFavoriteApi(auth.idUser, logout);
            if(size(response)>0){
                const watchesList = [];
                forEach(response, (data) => {
                    watchesList.push(data.watch);
                });
                setWatches(watchesList);
            }else{
                setWatches([]);
            }
        })()
    }, [])
    return (
        <BasicLaout className="wishlist">
            <div className="wishlist__block">
                <div className="title">Lista de favoritos</div>
                <div className="data">
                {!watches && <Loader active>Cargando relojes</Loader>}
            {watches && size(watches) === 0 && (
                <div>
                    <h3>No tienes relojes en favoritos</h3>
                </div>
            )}
            {size(watches) > 0 &&  <ListWatches watches={watches}/>}
                </div>
            </div>
        </BasicLaout>
    )
}