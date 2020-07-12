import React from 'react';

function FriendListItem(props) {
  const { friend } = this.props;
  return (
    <div className="friends-item">
      <div className="friends-name">{friend.name}</div>
    </div>
  );
}

export default FriendListItem;
