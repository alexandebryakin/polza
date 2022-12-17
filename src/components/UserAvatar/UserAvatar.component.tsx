import { AvatarProps, Avatar } from 'antd';
import React from 'react';

// TAKEN FROM: https://boringavatars.com/
export const RANDOM_AVATAR_URL = 'https://source.boringavatars.com/beam/222';

const FallbackAvatarSVG = () => (
  <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <title>Elizabeth Cady</title>
    <mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
      <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
    </mask>
    <g mask="url(#mask__beam)">
      <rect width="36" height="36" fill="#edd75a"></rect>
      <rect
        x="0"
        y="0"
        width="36"
        height="36"
        transform="translate(7 7) rotate(333 18 18) scale(1)"
        fill="#0c8f8f"
        rx="6"
      ></rect>
      <g transform="translate(3.5 3.5) rotate(-3 18 18)">
        <path d="M13,19 a1,0.75 0 0,0 10,0" fill="#FFFFFF"></path>
        <rect x="11" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect>
        <rect x="23" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect>
      </g>
    </g>
  </svg>
);

const UserAvatar = (props: AvatarProps) => {
  const [useFallbackAvatar, setUseFallbackAvatar] = React.useState(false);

  return (
    <Avatar
      {...props}
      src={useFallbackAvatar ? RANDOM_AVATAR_URL : <FallbackAvatarSVG />} // TODO: replace with actual image
      onError={() => {
        setUseFallbackAvatar(true);
        return true;
      }}
    />
  );
};

export default UserAvatar;
