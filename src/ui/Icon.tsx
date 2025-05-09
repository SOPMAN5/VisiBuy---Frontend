import React, { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }}/>
export type IconNameProps = keyof typeof dynamicIconImports
export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconNameProps;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props}  />
    </Suspense>
  );
}

export default React.memo(Icon)