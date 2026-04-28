'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import type PhenikaaShowcaseMap from './PhenikaaShowcaseMap';

export type { DemoEvent } from './PhenikaaShowcaseMap';

const Inner = dynamic(() => import('./PhenikaaShowcaseMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-dark-900 to-dark-950">
      <span className="text-sm text-slate-500">Đang tải bản đồ Phenikaa…</span>
    </div>
  ),
});

type Props = ComponentProps<typeof PhenikaaShowcaseMap>;

export default function PhenikaaShowcaseMapClient(props: Props) {
  return <Inner {...props} />;
}
