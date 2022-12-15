import { Space } from 'antd';
import Flex from '../Flex';
import { FlexProps } from '../Flex/Flex';

interface DropdownOptionProps extends FlexProps {
  icon?: React.ReactNode;
}

const DropdownOption = ({ icon, children, ...props }: DropdownOptionProps) => {
  const prefixIcon = icon;

  return (
    <Flex align="center" {...props}>
      <Space>
        {prefixIcon}

        <span>{children}</span>
      </Space>
    </Flex>
  );
};

export default DropdownOption;
