import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/manage-invitations');
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="page-header">
            <h1 id="containers">Heading</h1>
          </div>
          <div className="bs-component">
            <div className="jumbotron">
              <h1 className="display-3">Hello, world!</h1>
              <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              <hr className="my-4" />
              <p>It uses utility classNamees for typography and spacing to space content out within the larger container.</p>
              <p className="lead">
                <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps)(Landing);
