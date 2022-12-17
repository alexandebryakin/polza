export interface FlexProps extends DivProps {
  direction?: React.CSSProperties['flexDirection'];
  justify?: React.CSSProperties['justifyContent'];
  grow?: React.CSSProperties['flexGrow'];
  align?: React.CSSProperties['alignItems'];
}
function Flex(props: FlexProps) {
  const {
    direction: flexDirection,
    justify: justifyContent,
    grow: flexGrow,
    align: alignItems,
    style,
    ...rest
  } = props;

  return (
    <div
      {...rest}
      style={{
        ...style,
        display: 'flex',
        flexDirection,
        justifyContent,
        flexGrow,
        alignItems,
      }}
    />
  );
}

export default Flex;
