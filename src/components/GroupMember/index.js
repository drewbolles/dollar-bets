import React, { Component } from 'react';
import Icon from '../Icon';
import './GroupMember.css';

class GroupMember extends Component {
  state = {
    score: 0,
  };

  handleIncrease = () => {
    this.setState(prevState => ({
      score: prevState.score + 1,
    }));
  };

  handleDecrease = () => {
    if (this.state.score < 1) {
      return;
    }
    this.setState(prevState => ({
      score: prevState.score - 1,
    }));
  };

  render() {
    const { member, active, removeHandler } = this.props;
    const { score } = this.state;
    return (
      <div className="group-member">
        <button
          className="group-member-remove"
          onClick={() => {
            removeHandler(member.id);
          }}
          title="Remove member from group"
        >
          <Icon icon="remove_circle" />
        </button>
        <h4 className="group-member-name">{member.name}</h4>
        <button
          className="group-member-action group-member-action--add"
          onClick={this.handleIncrease}
          {...!active && { disabled: 'disabled ' }}
          title="Add a dollar"
        >
          <Icon icon="add" />
        </button>
        <button
          className="group-member-action group-member-action--minus"
          onClick={this.handleDecrease}
          {...!active && { disabled: 'disabled ' }}
          title="Remove a dollar"
        >
          <Icon icon="remove" />
        </button>
        <div className="group-member-score">${score}</div>
      </div>
    );
  }
}

export default GroupMember;
