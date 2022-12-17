import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, AvatarProps } from 'antd';
import { DropdownProps } from 'antd/lib/dropdown';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { jwt } from '../../api/jwt';
import { useUserInfoContext } from '../../contexts/userInfo/userInfoContext';
import Dropdown from '../../lib/Dropdown';
import { routes } from '../../navigation/routes';
import UserAvatar from '../UserAvatar';

import styles from './AccountDropdown.module.scss';

const Toggler = () => {
  const { user } = useUserInfoContext();

  const email = user?.emails.find((e) => e.isPrimary)?.email || user?.emails[0]?.email;

  return (
    <div className={styles.toggler}>
      <span className={styles.email}>{email}</span>

      <UserAvatar size={30} className={styles.avatar} />
    </div>
  );
};

interface AccountDropdownProps {
  className: DropdownProps['className'];
}

function AccountDropdown({ className }: AccountDropdownProps) {
  const [t] = useTranslation('common');

  return (
    <Dropdown toggler={<Toggler />} className={className}>
      <Dropdown.Item icon={<UserOutlined />} to={routes.profile()._} label={t('nav.profile')} />
      <Dropdown.Item to={routes.signin()._} icon={<PoweroffOutlined />} label={t('nav.logout')} onClick={jwt.forget} />
    </Dropdown>
  );
}

export default AccountDropdown;
