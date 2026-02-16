type IconProps = {
  height: number;
  width: number;
  sprite: string;
  id: string;
  'data-cy': string;
};

const Icon = ({ sprite, id, width, height, 'data-cy': dataCy }: IconProps) => {
  const href = `${sprite}#${id}`;

  return (
    <svg data-cy={dataCy} width={width} height={height}>
      <use href={href} />
    </svg>
  );
};

export default Icon;
