import React from "react";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link"
import { map } from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import { breakpointUpLg, breakpointUpMd, breakpointUpSm } from "../../utils/breakpoint"

export default function ListWatches(props){
    const { watches } = props;
    const {width} = useWindowSize();

    const getColumnRender = () => {
        switch (true) {
            case width > breakpointUpLg:
                return 5;
            case width > breakpointUpMd:
                return 3;
            case width > breakpointUpSm:
                return 2;
                default: return 1;
        }
    }
    
    return (
        <div className="list-watches">
            <Grid>
                <Grid.Row columns={getColumnRender()}>
                    {map(watches, (watch) => (
                     <Watch watch={watch}/>
                    ))}
                </Grid.Row>
            </Grid>
            
        </div>
    )
}

function Watch(props){
    const {watch} = props;

    return(
        <Grid.Column className="list-watches__watch">
            <Link href={`/${watch.url}`}>
                <a>
                    <div className="list-watches__watch-poster">
                        <Image src={watch.poster.url} alt={watch.title}/>
                        <div className="list-watches__watch-poster-info">
                            {watch.discount ? (
                                <span className="discount">-{watch.discount}%</span>
                            ) : (
                                <span/>
                            )}
                            <span className="price">{watch.price}$</span>
                        </div>
                    </div>
                    <h2>{watch.title}</h2>
                </a>
            </Link>
        </Grid.Column>
    )
}