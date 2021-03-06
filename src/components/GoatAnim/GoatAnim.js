import React, {Component} from 'react';
import UserContext from '../../contexts/UserContext';
import './GoatAnim.css';

export default class GoatAnim extends Component {
  constructor() {
    super();
    this.state = {
      max: 1000,
      current: 300,
    };

    this.setCurrent = this.setCurrent.bind(this);
  }

  static contextType = UserContext;

  componentDidMount() {
    // pulls point data from context.
    const {points = 300, point_goal = 1000} = this.context;
    this.updatePoints(point_goal, points);
  }

  setCurrent = (amount) => {
    this.setState({current: amount});
  }

  updateMax = (value) => {
    this.setState({max: value});
  }

  updateCurrent = (value) => {
    this.setState({current: value});
  }

  updatePoints = (val1, val2) => {
    this.updateMax(val1);
    this.updateCurrent(val2);
  }

  renderSideBar = (max, currentPercent, maxPercent) => {
    if (this.context.user.id) {
      return (
        <div className='goatAnimBar'>
          <div id='cliff' className='cliff'><img className='cliffImage' src={require('./cliff.svg')} alt='Cliffside' /></div>
          <div id='left' className='cliffSection left' style={{'height': maxPercent + '%'}}><p>{max} Points left</p></div>
          <div className='goat'><img className='goatImage' src={require('./goathead.svg')} alt='Goat head' /></div>
          <div className='cliffSection current' style={{'height': currentPercent + '%'}}></div>
        </div>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }

  render() {
    let max = (this.state.max - this.state.current);
    let currentPercent = (this.state.current / this.state.max * 100);
    let maxPercent = (100 - currentPercent);
    return (
      <div className='sidebar'>
        {this.renderSideBar(max, currentPercent, maxPercent)}
      </div>
    )
  }
}