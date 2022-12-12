import { Skeleton } from 'antd';
import { BusinessCardWrapper } from '../BusinessCard';

import styles from './BusinessCardSkeleton.module.scss';

const BusinessCardSkeleton = () => {
  return (
    <BusinessCardWrapper>
      <div className={styles.skeletonWrapper}>
        <div className={styles.skeletonHeader} />

        <Skeleton.Avatar active shape="square" size={120} className={styles.skeletonQrCode} />
        <Skeleton.Button active size="small" className={styles.skeletonTitle} style={{ width: 250 }} />
        <Skeleton.Button active size="small" className={styles.skeletonSubtitle} style={{ width: 150 }} />

        <Skeleton.Button active size="small" className={styles.skeletonStatus} shape="round" style={{ width: 70 }} />

        <div className={styles.skeletonDivider} />

        <Skeleton.Button active size="small" className={styles.skeletonSubtitle} style={{ width: 180 }} />

        <div className={styles.skeletonDivider} />

        <Skeleton.Button active shape="round" block className={styles.skeletonButton} />
      </div>
    </BusinessCardWrapper>
  );
};

export default BusinessCardSkeleton;
