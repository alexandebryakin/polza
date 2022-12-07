import { useTranslation } from 'react-i18next';
import css from 'classnames';
import { Tooltip, Typography } from 'antd';
import CopyToClipboard from '../CopyToClipboard';

import styles from './CopyableContactList.module.scss';

interface ContactListProps {
  items: string[];
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  classNames?: {
    itemContainer?: string;
    item?: string;
  };
}

const CopyableContactList = ({ items, icon, onClick, classNames }: ContactListProps) => {
  const [t] = useTranslation('common');

  if (!items.length) return null;
  return (
    <div>
      {items.map((item, index) => {
        return (
          <div key={index} className={css(styles.contactList, classNames?.itemContainer)}>
            {icon}

            <Tooltip placement="right" title={t('generic.clickToCopy')}>
              <CopyToClipboard text={item} onClick={onClick} className={css(styles.item, classNames?.item)}>
                <Typography.Text ellipsis>{item}</Typography.Text>
              </CopyToClipboard>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};

export default CopyableContactList;
