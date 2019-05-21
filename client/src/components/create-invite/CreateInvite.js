import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createInvite} from '../../actions/inviteActions';
import TextFieldGroup from '../common/TextFieldGroup';
import shortid from 'shortid';

class CreateInvite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      guestInput: '',
      invitees: [],
      thank_you_msg: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddGuest = this.onAddGuest.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onAddGuest(e) {
    e.preventDefault();
    const guests = [...this.state.invitees];
    guests.push({id: shortid.generate(), name: this.state.guestInput});
    
    this.setState({ invitees: guests }, () => {
      console.log(this.state.invitees);
    }); 

    this.setState({ guestInput: '' });
  }

  onRemove(e, guest) {
    e.preventDefault();
    console.log(guest)
    const guests = this.state.invitees.filter( i => i.id !== guest.id);
    this.setState({ invitees: guests }, () => {
      console.log(this.state.invitees);
    }); 
  }

  onSubmit(e) {
    e.preventDefault();

    const inviteData = {
      name: this.state.name,
      email: this.state.email,
      invitees: this.state.invitees
    }

    // console.log(inviteData)

    this.props.createInvite(inviteData, this.props.history);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { errors } = this.state;
    // const blah = (e, id) => {
    //   e.preventDefault();
    //   console.log
    // }
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h3>Create Invitation</h3>
              <hr /><br/>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                {/* <TextFieldGroup
                  placeholder="Invitees"
                  name="invitees"
                  type="invitees"
                  value={this.state.invitees}
                  onChange={this.onChange}
                  error={errors.invitees}
                /> */}
                <ul>
                  {this.state.invitees.map((guest) => {
                    return (<li key={guest.id}>{guest.name} <button onClick={(e) => this.onRemove(e, guest)}>x</button></li>)
                  })}
                </ul>
                <div>
                  <input onChange={this.onChange} value={this.state.guestInput} name="guestInput" type="text"/><button onClick={this.onAddGuest} >Add</button>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateInvite.propTypes = {
  invite: PropTypes.object,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  invite: state.invite,
  errors: state.errors
});

export default connect(mapStateToProps, { createInvite })(withRouter(CreateInvite));