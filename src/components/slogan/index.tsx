/*
 * @LastEditors: Necfol
 * @Date: 2024-06-02 11:39:15
 * @LastEditTime: 2024-06-02 17:57:04
 * @FilePath: /blocklet-project/src/components/slogan/index.tsx
 */
import logo from '../../logo.svg';

interface IProps {
  slogan?: string;
  detail?: string;
}
function Slogan(props: IProps) {
  return (
    <div className="my-10 mr-4 flex flex-col justify-center items-center">
      <img src={logo} className="w-14" alt="logo" />
      <h2 className="text-2xl font-semibold dark:text-white">
        {props.slogan || 'Redefine Software Architect and Ecosystem'}
      </h2>
      <p className="mt-5">{props.detail || 'A total solution for building decentralized applications.'}</p>
    </div>
  );
}

export default Slogan;
