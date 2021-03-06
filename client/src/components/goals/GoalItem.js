import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteGoal, addLike, removeLike } from '../../actions/goalActions';
import Moment from 'react-moment';

class GoalItem extends Component {
  onDeleteClick = id => {
    this.props.deleteGoal(id);
  }

  onLikeClick = id => {
    this.props.addLike(id);
  }

  onUnlikeClick = id => {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  
  render() {
    const {
      goal,
      auth,
      showActions
    } = this.props;
    let goalMetrics;
    let profilePhoto;
    let photoClassName;

    if (goal.photoOrientation) {
      if (goal.photoOrientation === '2') photoClassName = "profile-photo profile-goal mirror";
      if (goal.photoOrientation === '3') photoClassName = "profile-photo profile-goal rotate-180";
      if (goal.photoOrientation === '4') photoClassName = "profile-photo profile-goal rotate-180-mirror";
      if (goal.photoOrientation === '5') photoClassName = "profile-photo profile-goal rotate-270-mirror";
      if (goal.photoOrientation === '6') photoClassName = "profile-photo profile-goal rotate-90";
      if (goal.photoOrientation === '7') photoClassName = "profile-photo profile-goal rotate-90-mirror";
      if (goal.photoOrientation === '8') photoClassName = "profile-photo profile-goal rotate-270";
    } else photoClassName = "profile-photo profile-goal";

    goal.profilePhoto ? profilePhoto = goal.profilePhoto : profilePhoto = goal.avatar;
    
    if (goal.category === 'Strength') {
      goalMetrics = (
        <div>
          <h6 className="card-subtitle">Target</h6>
          <p className="lead">{goal.weightTarget ? `${goal.weightTarget} lbs.` : null} {goal.repTarget ? `${goal.repTargetreps} reps` : null}</p>
        </div>
      );
    } else if (goal.category === 'Conditioning') {
      goalMetrics = (
        <div>
          <h6 className="card-subtitle">Target</h6>
          <p className="lead">{goal.minutes ? goal.minutes : '00'}:{goal.seconds ? goal.seconds : '00'}</p>
        </div>
      );
    } else if (goal.category === 'Habit') {
      goalMetrics = (
        <div>
          <h6 className="card-subtitle">Target</h6>
          {goal.days ? <p className="lead">{goal.days} Days</p> : null}
        </div>
      )
    }

    return (
      <div className="card card-body bg-light mb-3" style={{width: '70%', margin: 'auto'}}>
        <img src={profilePhoto} alt="profile-img" className={photoClassName} />
        <div style={{ marginBottom: '30px' }} />
        <h5 className="text-center card-title">{goal.name}</h5>
        <div className="card-body">
          <h5 className="card-title">{goal.title}</h5>
          <br/>
          <h6 className="card-subtitle">{goal.category}</h6>
          <br/>
          {goal.from ? <Moment format="LL">{goal.from}</Moment> : null} -{' '}
          {goal.to ? <Moment format="LL">{goal.to}</Moment> : null}
          <div style={{ marginBottom: '40px' }} />
          {goalMetrics}
          {showActions ?
              (
              <span>
              <button onClick={() => this.onLikeClick(goal._id)} type="button" className="btn btn-light mr-1">
              <i className={classnames('fas fa-thumbs-up', {
                'text-info': this.findUserLike(goal.likes)
              })} />
              <span className="badge badge-light">{goal.likes.length}</span>
            </button>
            <button onClick={() => this.onUnlikeClick(goal._id)} type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down"></i>
            </button>
            <Link to={`/goal/${goal._id}`} className="btn btn-primary mr-1">
              View
            </Link>
            {goal.user === auth.user.id ? (
              <button onClick={() => this.onDeleteClick(goal._id)} type="button" className="btn btn-danger mr-1">
                <i className="fas fa-times" />
              </button>
            ) : null}
            </span>
            ) : null}
        </div>
      </div>
    );
  }
}

GoalItem.defaultProps = {
  showActions: true
}

GoalItem.propTypes = {
  deleteGoal: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  goal: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { deleteGoal, addLike, removeLike })(GoalItem);
