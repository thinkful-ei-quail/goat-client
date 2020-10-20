import React, { Component } from 'react';
import GoalService from '../services/goalsAPIservice';

const GoalContext = React.createContext({
  goals: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  loadGoals: () => {},
  addGoal: () => {},
  modifyGoal: () => {}
});

export default GoalContext;

export class GoalProvider extends Component {
  constructor(props) {
    super(props);
    const state = {goals: [], error: null};
    this.state = state;
  };

  setError = (error) => {
    console.log(error);
    this.setState({error});
  };

  clearError = () => {
    this.setState({error: null});
  };

  loadGoals = () => {
    // load goals into context.
    GoalService.getGoal()
      .then(goals => {
        this.setState({goals});
      })
      .catch(res => this.setError(res));
  };

  addGoal = (goal) => {
    // Add new goal to context after succesful submition to server.
    this.setState({goals: this.state.goals.concat(goal)});
  };

  modifyGoal = (id, option) => {
    // Modify goal, specifically for completeing or archiving goals.
    if (option === 'complete') {
      // TODO Change goal with id to complete, server call with goal to complete.
    } else if (option === 'archive') {
      // TODO Change goal with id to archived, server call with goal to archive.
    } else {
      this.setError({error: 'Incorrect option for modify goal'});
    }
  };

  render() {
    const value = {
      goals: this.state.goals,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      loadGoals: this.loadGoals,
      addGoal: this.addGoal,
      modifyGoal: this.modifyGoal
    }

    return (
      <GoalContext.Provider value={value}>
        {this.props.children}
      </GoalContext.Provider>
    )
  }
}