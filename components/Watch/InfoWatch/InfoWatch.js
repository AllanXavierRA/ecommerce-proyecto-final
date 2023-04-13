import React from "react";
import ReactPlayer from "react-player/lazy";
import moment from "moment";
import "moment/locale/es"
import CarouselScreenshots from "../CarouselScreenshots";

export default function InfoWatch(props){
    const { watch } = props;    

    return (
        <div className="info-watch">
            <ReactPlayer className="info-watch__video" url={watch.video} controls={true}/> 
            <CarouselScreenshots title={watch.title} screenshots={watch.screenshots}/>
            <div className="info-watch__content">
                <div dangerouslySetInnerHTML={{__html: watch.sumary}}/>
                <div className="info-watch__content-date">
                <h4>Fecha de llegada:</h4>
                <p>{moment(watch.releaseDate).format("LL")}</p>
            </div>
            </div>
        </div>
    )
}