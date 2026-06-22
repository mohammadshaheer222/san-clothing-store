import { Container } from './container';

interface SectionProps {
  bg?: string;
  id?: string;
  className?: string;
  minHeight?: string;
  container?: boolean;
  fullHeight?: boolean;
  py?: number | string;
  children: React.ReactNode;
  containerClassName?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Section = ({
  id,
  py = 0,
  children,
  minHeight = '',
  className = '',
  container = true,
  bg = 'transparent',
  fullHeight = false,
  containerSize = 'lg',
  containerClassName = ``
}: SectionProps) => {
  const heightClass = fullHeight ? 'h-[calc(100dvh-92px)] mob-land:h-[calc(100dvh-84px)] min-h-[500px]' : minHeight;
  const pyClass = typeof py === 'number' ? `py-${py}` : py;

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${heightClass} ${bg} ${pyClass} ${className}`}
    >
      {container ? (
        <Container size={containerSize} className={`h-full pt-10 ${containerClassName}`}>
          {children}
        </Container>
      ) : children}
    </section>
  );
};
