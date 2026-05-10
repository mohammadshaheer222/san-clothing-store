import { Container } from './container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
  minHeight?: string;
  container?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  bg?: string;
  py?: number | string;
}

export const Section = ({
  children,
  className = '',
  id,
  fullHeight = false,
  minHeight = '',
  container = true,
  containerSize = 'lg',
  bg = 'transparent',
  py = 0,
}: SectionProps) => {
  const heightClass = fullHeight ? 'h-[calc(100dvh-112px)] mob-land:h-[calc(80vh-112px)] min-h-[500px]' : minHeight;
  const pyClass = typeof py === 'number' ? `py-${py}` : '';

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${heightClass} ${bg} ${pyClass} ${className}`}
    >
      {container ? (
        <Container size={containerSize} className="h-full">
          {children}
        </Container>
      ) : children}
    </section>
  );
};
