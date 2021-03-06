import { Button } from 'antd';
import { observer } from 'mobx-react';
import HeaderStyle from './index.module.less';
import { useStores } from '../../store';

interface HeaderBarProps {
  text: string;
}

// for test css.module and mobx'usage in functional component
function HeaderBar(props: HeaderBarProps) {
  const { counterStore } = useStores();
  const { counter, increment } = counterStore;
  return (
    <div className={HeaderStyle.headerBar}>
      <p className={HeaderStyle.textColor}>{props.text}</p>
      <Button type='primary'>Primary Button</Button>
      <h2>headBar counter:{counter}</h2>
      <button type='submit' onClick={() => increment()}>
        +1
      </button>
    </div>
  );
}

export default observer(HeaderBar);
