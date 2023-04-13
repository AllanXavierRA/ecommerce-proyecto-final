import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import { getLastWatchApi } from "../api/watch";
import ListWatches from "../components/ListWatches";

export default function Home() {
  const [watches, setWatches] = useState(null);
  

  useEffect(() => {
    (async () => {
      const response = await getLastWatchApi(50);
      if(size(response) > 0) setWatches(response);
      else setWatches([]);
    })()
  }, [])
  return (
      <BasicLayout className="home">
      {!watches && <Loader active>Cargando relojes</Loader>}
      {watches && size(watches) === 0 && (
        <div>
          <h3>No hay relojes</h3>
        </div>
      )}
      {size(watches)>0 && (
        <ListWatches watches={watches}/>
      )}
      </BasicLayout>
  )
}
