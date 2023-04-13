import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { size } from "lodash";
import classNames from "classnames";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { isFavoriteApi, addFavoriteApi, deleteFavoriteApi } from "../../../api/favorite";

export default function HeaderWatch(props){
    const { watch } = props;
    const { poster, title } = watch; 
    
    return (
        <Grid className="header-watch">
            <Grid.Column mobile={16} tablet={6} computer={5}>
                <Image src={poster.url} alt={title} fluid />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={11}>
                <Info watch={watch}/>
            </Grid.Column>
        </Grid>
    )
}

function Info(props){
    const { watch } = props;
    const { title, sumary, price, discount, url } = watch;
    const [isFavorites, setIsFavorites] = useState(false);
    const [reloadFavorite, setReloadFavorite] = useState(false);
    const { auth, logout } = useAuth();
    const { addProductCart } = useCart();
    

    useEffect(() => {
        (async () => {
            if(auth){
            const response = await isFavoriteApi(auth.idUser, watch.id, logout);
            if(size(response) > 0) setIsFavorites(true);
            else setIsFavorites(false);
            }
        })();
        setReloadFavorite(false);
    }, [watch, reloadFavorite]);

    const addFavorite = async () => {
        if(auth){
            await addFavoriteApi(auth.idUser, watch.id, logout);
            setReloadFavorite(true);
        }
    }

    const deleteFavorite = async () => {
        if(auth){
            await deleteFavoriteApi(auth.idUser, watch.id, logout);
            setReloadFavorite(true);
        }
    }
    
    return(
        <>
        <div className="header-watch__title">
            {title}
            <Icon name={isFavorites ? "heart" : "heart outline"} onClick={isFavorites ? deleteFavorite : addFavorite} className={classNames({
                like: isFavorites,
            })} link/>
        </div>
        <div className="header-watch__delivery">Entrega en 24/48 horas</div>
        <div className="header-watch__sumary" dangerouslySetInnerHTML={{__html: sumary}}/>
        <div className="header-watch__buy">
            <div className="header-watch__buy-price">
                <p>Precio de venta al público: {price}$</p>
                <div className="header-watch__buy-price-actions">
                    <p>-{discount}%</p>
                    <p>{(price - Math.floor(price*discount) / 100).toFixed(2)}$</p>
                </div>
            </div>
            <Button className="header-watch__buy-btn" onClick={() => addProductCart(url)}>Añadir al carrito</Button>
        </div>
        </>
    )
}