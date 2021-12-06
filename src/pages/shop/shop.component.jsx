import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../../pages/collection/collectionPage.component";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    collectionRef.get().then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Switch>
          <Route
            exact
            path={match.path}
            render={(props) => (
              <CollectionsOverviewWithSpinner
                isLoading={this.state.loading}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`${match.path}/:collectionId`}
            render={(props) => (
              <CollectionsPageWithSpinner
                isLoading={this.state.loading}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default withRouter(connect(null, mapDispatchToProps)(ShopPage));
