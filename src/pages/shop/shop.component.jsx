import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selectors";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../../pages/collection/collectionPage.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionLoaded } = this.props;
    return (
      <div className="shop-page">
        <Switch>
          <Route
            exact
            path={match.path}
            render={(props) => (
              <CollectionsOverviewWithSpinner
                isLoading={!isCollectionLoaded}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`${match.path}/:collectionId`}
            render={(props) => (
              <CollectionsPageWithSpinner
                isLoading={!isCollectionLoaded}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShopPage)
);
