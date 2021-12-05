import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../../pages/collection/collectionPage.component";

const ShopPage = () => {
  const { path } = useRouteMatch();
  return (
    <div className="shop-page">
      <Switch>
        <Route exact path={path}>
          <CollectionOverview />
        </Route>
        <Route exact path={`${path}/:collectionId`}>
          <CollectionPage />
        </Route>
      </Switch>
    </div>
  );
};

export default ShopPage;
