import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { DropdownProps } from 'antd/lib/dropdown';
import { useTranslation } from 'react-i18next';
import { jwt } from '../../api/jwt';
import Dropdown from '../../lib/Dropdown';
import { ROUTES } from '../../navigation/routes';

import styles from './AccountDropdown.module.scss';

const Toggler = () => {
  const email = 'TODO-EMAIL@mail.com';

  return (
    <div className={styles.toggler}>
      <span className={styles.email}>{email}</span>

      <Avatar
        src="https://joeschmoe.io/api/v1/random" // TODO: replace with actual image
        size={30}
        className={styles.avatar}
      />
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
      <Dropdown.Item
        icon={<UserOutlined />}
        to={ROUTES.PROFILE}
        label={t('nav.profile')}
      />
      <Dropdown.Item
        to={ROUTES.AUTH.SIGNIN}
        icon={<PoweroffOutlined />}
        label={t('nav.logout')}
        onClick={jwt.forget}
      />
    </Dropdown>
  );
}

export default AccountDropdown;
