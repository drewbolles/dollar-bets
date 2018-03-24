import React, { Component } from 'react';
import uuid from 'uuid/v4';
import localforage from 'localforage';
import Container from '../Container';
import Group from '../Group';
import Button from '../Button';
import Icon from '../Icon';
import { events } from '../../utils/events';
import './App.css';

class App extends Component {
  state = {
    groupName: '',
    groupEvent: '',
    groups: [],
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState(
      prevState => ({
        groupName: '',
        groupEvent: '',
        groups: [
          ...prevState.groups,
          {
            name: this.state.groupName,
            event: this.state.groupEvent,
            id: uuid(),
          },
        ],
      }),
      () => {
        this.handleGroupSave();
      },
    );
  };

  handleGroupRemove = id => {
    this.setState(
      prevState => ({
        groups: prevState.groups.filter(group => group.id !== id),
      }),
      () => {
        this.handleGroupSave();
      },
    );
  };

  handleGroupSave = () => {
    localforage.setItem('DOLLAR-BET-GROUPS', this.state.groups);
  };

  componentDidMount() {
    localforage.getItem('DOLLAR-BET-GROUPS').then(groups => {
      if (groups) {
        this.setState({
          groups,
        });
      }
    });
  }

  render() {
    const { groupName, groupEvent, groups } = this.state;
    return (
      <div className="app">
        <header className="app-header">
          <Container>
            <div className="app-header-row">
              <h1 className="app-title">Dollar Bets</h1>
              <nav className="app-nav">
                <button
                  className="app-nav-item"
                  aria-label="Add a new group"
                  title="Add a new group"
                >
                  <Icon icon="add" /> Add Group
                </button>
              </nav>
            </div>
          </Container>
        </header>
        <div className="app-content">
          <Container>
            <form
              className="form form--inline add-group-form"
              onSubmit={this.handleSubmit}
            >
              <h2 className="form-title">Add a Group</h2>
              <div className="form-content">
                <div className="form-item">
                  <label htmlFor="groupName">Name*</label>
                  <input
                    id="groupName"
                    type="text"
                    placeholder="ex: March Madness"
                    required
                    value={groupName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="groupEvent">Event</label>
                  <select
                    id="groupEvent"
                    value={groupEvent}
                    onChange={this.handleChange}
                  >
                    <option value="">-- Select Event --</option>
                    {events.map((event, index) => (
                      <option value={event.name} key={index}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-item form-item--actions">
                  <Button>Add Group</Button>
                </div>
              </div>
            </form>
            {groups.length > 0 ? (
              <div className="groups">
                {groups.map((group, index) => (
                  <Group
                    group={group}
                    key={group.id}
                    removeHandler={this.handleGroupRemove}
                  />
                ))}
              </div>
            ) : (
              <div className="intro">
                <p>
                  Welcome to Dollar Bets, a simple tracker for your friendly
                  dollar bets. Start by creating a group, add any members that
                  are partaking in the bets, and start tracking.
                </p>
              </div>
            )}
          </Container>
        </div>
        <footer className="app-footer">
          <Container>&copy; Dollar Bets. All Rights Reserved.</Container>
        </footer>
      </div>
    );
  }
}

export default App;
