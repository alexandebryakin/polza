import Flex from '../../Flex';

import styles from './TopNav.module.scss';

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
        {/* <AccountDropdown /> */}
        TODO: AccountDropdown
      </Flex>
    </Flex>
  );
}

export default TopNav;
