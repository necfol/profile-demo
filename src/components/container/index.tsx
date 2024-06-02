/*
 * @LastEditors: Necfol
 * @Date: 2024-06-02 10:43:40
 * @LastEditTime: 2024-06-02 23:09:45
 * @FilePath: /blocklet-project/src/components/container/index.tsx
 */
import { ReactNode } from 'react';
import { cx } from '../../utils/helper';

export default function Container(props: { className?: string; children: ReactNode }) {
  return (
    <div className={cx('container px-8 mx-auto xl:px-5 py-5 lg:py-8 max-w-screen-lg', props.className || '')}>
      {props.children}
    </div>
  );
}
