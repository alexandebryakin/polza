import { CheckCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CopyToClipboard.module.scss';

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const Copied = () => {
  const [t] = useTranslation('common');
  return (
    <span className={styles.copied}>
      {t('generic.copied')} <CheckCircleOutlined className={styles.copiedIcon} />
    </span>
  );
};

interface CopyToClipboardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string;
  duration?: number;
  CopiedComponent?: React.ReactNode;
}
const threeSeconds = 3000;
function CopyToClipboard({
  text,
  duration = threeSeconds,
  onClick,
  CopiedComponent,
  children,
  ...rest
}: CopyToClipboardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    copyToClipboard(text);
    typeof onClick === 'function' && onClick(e);

    setCopied(true);
    setTimeout(() => setCopied(false), duration);
  };

  const CopyComponent = CopiedComponent ? () => <>{CopiedComponent}</> : Copied;

  return (
    <span {...rest} onClick={handleClick}>
      {copied ? <CopyComponent /> : children}
    </span>
  );
}

export default CopyToClipboard;
