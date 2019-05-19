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
    const { goal, auth, showActions } = this.props;
    let goalMetrics;

    if (goal.category === 'Strength') {
      goalMetrics = (
        <div>
          {goal.weightTarget ? <p className="lead">Weight Target - {goal.weightTarget}</p> : null}
          {goal.repTarget ? <p className="lead">Rep Target - {goal.repTarget}</p> : null}
        </div>
      );
    } else if (goal.category === 'Conditioning') {
      goalMetrics = (
        <div>
          {goal.minutes ? <p className="lead">Minutes - {goal.minutes}</p> : null}
          {goal.seconds ? <p className="lead">Seconds - {goal.seconds}</p> : null}
        </div>
      );
    } else if (goal.category === 'Habit') {
      goalMetrics = goal.days ? <p className="lead">Days - {goal.days}</p> : null
    }

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={goal.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{goal.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{goal.title}</p>
            <p className="lead">{goal.category}</p>
            <Moment format="MM/DD/YYYY">{goal.from}</Moment> -{' '}
            <Moment format="MM/DD/YYYY">{goal.to}</Moment>
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
            <Link to={`/goal/${goal._id}`} className="btn btn-info mr-1">
              Comments
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
  auth: state.auth
});

export default connect(mapStateToProps, { deleteGoal, addLike, removeLike })(GoalItem);