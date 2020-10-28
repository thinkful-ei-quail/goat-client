import React, {Component} from 'react';
import './RewardListForm.css';
import RewardContext from '../../contexts/RewardContext';
import RedemptionPopUp from '../RedemptionPopUp/RedemptionPopUp';
 
export default class RewardListForm extends Component{
  
  static contextType = RewardContext;

  state = {completingReward: null};

  completeReward = () => {
    const {completingReward} = this.state;
    this.context.deleteReward(completingReward)
    .then(() => {
      this.context.setError('');
      this.cancelPopUp();
    })
  };

  cancelPopUp = () => {
    this.setState({completingReward: null});
  }

  renderCompletePopUp = () => {
    const {completingReward} = this.state;
    return <RedemptionPopUp 
            question={`Redeem ${completingReward.title}?`}
            points={-completingReward.points}
            yesFunction={this.completeReward}
            noFunction={this.cancelPopUp}/>
  }

  setCompletingReward = (completingReward) => {
    this.setState({completingReward});
  }

  renderRewards = () => {
    return (
      <div>
      <section className="rewards-list-section">
      <ul className="rewards-list">
      {this.context.rewards && this.context.rewards.map(reward => (
        <li className="rewards-list-options" key={reward.id}>
          <div>Reward: {reward.title}</div>
          <div>{reward.description}</div>
          <div>Points needed to redeem: {reward.points}</div>
          <div>{reward.redeemed}</div>
          <button onClick={() => this.setCompletingReward(reward)}>Redeem Reward</button>
        </li>
      ))}
      </ul> 
      </section>
      <button onClick={() => this.props.create()}>Create New Reward</button>
    </div>
    );
  }

  render(){
    const {completingReward} = this.state;
    return(
      <div>
        {!completingReward && this.renderRewards()}
        {completingReward && this.renderCompletePopUp()}
      </div>
    )
  }
}
