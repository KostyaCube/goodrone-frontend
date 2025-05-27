import { Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

export const tagRender = (props: CustomTagProps) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        margin: 3,
        fontSize: 16,
        fontWeight: 100,
        borderRadius: 16,
        padding: '2px 12px',
        background: '#44958f',
        color: '#FFF'
      }}
    >
      {label}
    </Tag>
  );
};
