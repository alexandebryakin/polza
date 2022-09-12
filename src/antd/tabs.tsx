import React from 'react';
import { TabPaneProps, Tabs as AntTabs, TabsProps } from 'antd';
import css from 'classnames';

import styles from './antd.module.scss';

export function Tabs(props: TabsProps) {
  return <AntTabs {...props} className={css(props.className, styles.tabs)} />;
}

// function TabPane(props: TabPaneProps) {
//   return (
//     <AntTabs.TabPane {...props} className={css(props.className, styles.pane)} />
//   );
// }

// Tabs.TabPane = TabPane;
Tabs.TabPane = AntTabs.TabPane;
