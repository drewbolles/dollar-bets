import React, { Component } from 'react';
import uuid from 'uuid/v4';
import GroupMember from '../GroupMember';
import Button from '../Button';
import './Group.css';

class Group extends Component {
  state = {
    memberName: '',
    members: [],
    active: true,
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState(prevState => ({
      memberName: '',
      members: [
        ...prevState.members,
        { name: this.state.memberName, id: uuid() },
      ],
    }));
    this.memberName.focus();
  };

  handleMemberRemove = id => {
    this.setState(prevState => ({
      members: prevState.members.filter(member => member.id !== id),
    }));
  };

  handleEventEnd = () => {
    this.setState({ active: false });
  };

  handleActiveToggle = () => {
    this.setState(prevState => ({ active: !prevState.active }));
  };

  componentDidMount() {
    this.memberName.focus();
  }

  render() {
    const { group, removeHandler } = this.props;
    const { memberName, members, active } = this.state;
    return (
      <div className="group">
        <header className="group-header">
          <h2 className="group-name">
            {group.name}
            {group.event && ' / '}
            <small>{group.event}</small>
          </h2>
        </header>
        <div className="group-content">
          <form
            className="form form--inline add-member-form"
            onSubmit={this.handleSubmit}
          >
            <h3 className="form-title">Add Group Member</h3>
            <div className="form-content">
              <div className="form-item">
                <label htmlFor="memberName">Name</label>
                <input
                  type="text"
                  id="memberName"
                  required
                  value={memberName}
                  onChange={this.handleChange}
                  ref={memberName => {
                    this.memberName = memberName;
                  }}
                />
              </div>
              <div className="form-item form-item--actions">
                <Button>Add Member</Button>
              </div>
            </div>
          </form>
          {members.length > 0 && (
            <div className="group-members">
              {members.map((member, index) => (
                <GroupMember
                  key={member.id}
                  member={member}
                  active={active}
                  removeHandler={this.handleMemberRemove}
                />
              ))}
            </div>
          )}
        </div>
        <footer className="group-footer">
          <Button
            alt
            onClick={() => {
              removeHandler(group.id);
            }}
          >
            Close Group
          </Button>
          <Button onClick={this.handleActiveToggle}>
            {active ? 'End Event' : 'Start Event'}
          </Button>
        </footer>
      </div>
    );
  }
}

export default Group;
