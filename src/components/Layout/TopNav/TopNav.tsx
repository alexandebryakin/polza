import Flex from '../../Flex';

import styles from './TopNav.module.scss';
import AccountDropdown from '../../AccountDropdown';

function TopNav() {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      className={styles.topNav}
    >
      <div>{/* <Search /> */}</div>

      <Flex align="center">
        <AccountDropdown className={styles.accountDropdown} />
      </Flex>
    </Flex>
  );
}

export default TopNav;
