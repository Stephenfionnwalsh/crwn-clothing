import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import { withRouter } from "react-router-dom";

import CollectionItem from "../../components/collection-item/collection-item.component";
import "./collectionPage.styles.scss";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 classNAme="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem ley={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default withRouter(connect(mapStateToProps)(CollectionPage));
