import React, { Component } from 'react';
import Icon from '../Icon';
import './GroupMember.css';

class GroupMember extends Component {
  state = {
    name: this.props.member.name,
    editable: false,
  };

  toggleEdit = () => {
    this.setState(
      prevState => ({ editable: !prevState.editable }),
      () => {
        if (this.state.editable) {
          this.name.focus();
        }
      },
    );
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSave = () => {
    this.props.editHandler(this.props.member.id, this.state.name);
    this.setState(prevState => ({ editable: !prevState.editable }));
  };

  render() {
    const { member, active, removeHandler, scoreHandler } = this.props;

    const { editable, name } = this.state;

    return (
      <div className="group-member">
        <div className="group-member-actions">
          <button
            className="group-member-action group-member-remove"
            onClick={() => {
              removeHandler(member.id);
            }}
            title="Remove member from group"
          >
            <Icon icon="remove_circle" />
          </button>
          <button
            className="group-member-action group-member-edit"
            onClick={this.toggleEdit}
          >
            <Icon icon="edit" />
          </button>
        </div>
        {editable ? (
          <React.Fragment>
            <input
              type="text"
              id="name"
              value={name}
              onChange={this.handleChange}
              ref={name => {
                this.name = name;
              }}
            />
            <button onClick={this.handleSave}>Save</button>
          </React.Fragment>
        ) : (
          <h4 className="group-member-name">{member.name}</h4>
        )}
        <button
          className="group-member-action group-member-action--add"
          onClick={() => {
            scoreHandler(member.id);
          }}
          {...!active && { disabled: 'disabled ' }}
          title="Add a dollar"
        >
          <Icon icon="add" />
        </button>
        <button
          className="group-member-action group-member-action--minus"
          onClick={() => {
            scoreHandler(member.id, 'decrease');
          }}
          {...!active && { disabled: 'disabled ' }}
          title="Remove a dollar"
        >
          <Icon icon="remove" />
        </button>
        <div className="group-member-score">${member.score}</div>
      </div>
    );
  }
}

export default GroupMember;
