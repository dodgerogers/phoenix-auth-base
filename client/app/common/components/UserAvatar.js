import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Label } from 'semantic-ui-react';
import ColorCodeGenerator from '../../lib/utils/ColorCodeGenerator';


function UserAvatar(props) {
  const username = props.user.get('name');
  const firstCharOfUsername = username[0];
  const colorCodeForUsername = ColorCodeGenerator.call(firstCharOfUsername) || '#000';

  return (
    <div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          height: '30px',
          width: '30px',
          borderRadius: '50%',
          color: '#fff',
          backgroundColor: colorCodeForUsername,
          marginRight: '5px',
        }}
      >
        {firstCharOfUsername.toUpperCase()}
      </div>
      {username}
    </div>
  );
}

UserAvatar.propTypes = {
  user: ImmutablePropTypes.contains({
    name: PropTypes.string.isRequired,
  }),
};

export default UserAvatar;
