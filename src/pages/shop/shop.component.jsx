import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selectors";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionPage from "../../pages/collection/collectionPage.component";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";

const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match, isCollectionLoaded } = this.props;
    return (
      <div className="shop-page">
        <Switch>
          <Route
            exact
            path={match.path}
            component={CollectionsOverviewContainer}
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
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShopPage)
);
