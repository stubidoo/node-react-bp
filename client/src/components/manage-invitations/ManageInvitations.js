import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getInvites } from '../../actions/inviteActions';

class ManageInvitations extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }
  componentWillMount() {
    this.props.getInvites()
  }
  
  render() {
    const { invitations } = this.props.invitations;
    console.log(invitations)
    return (
      <div id="manage-invitations" className="container page">
        <div className="row">
          <div className="col-lg-12">
            <div className="table-heading">
              <h1>Table</h1>
            </div>
            <div className="table-main">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Guests</th>
                    <th scope="col">Attending</th>
                    <th scope="col">Last Emailed</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-light">
                    <th scope="row">Light</th>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>
                        <button type="button" className="btn btn-outline-primary">Primary</button>
                        <button type="button" className="btn btn-outline-primary">Primary</button>
                    </td>
                  </tr>
                </tbody>
              </table> 
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ManageInvitations.propTypes = {
  getInvites: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  invitations: state.invitations,
  errors: state.errors
});


export default connect(mapStateToProps, {getInvites})(withRouter(ManageInvitations));