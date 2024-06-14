import React from "react";

// 反向继承：
class Index extends React.Component {
  render() {
    return <div>
      <ul>
        <li>react</li>
        <li>vue</li>
        <li>Angular</li>
      </ul>
    </div>
  }
}

function HOC(Component) {
  return class Advance extends Component {
    render() {
      const element = super.render();
      const otherProps = {
        name: 'Joey'
      };
      const appendElement = React.createElement('li', {}, `hello , world！ My name  is ${otherProps.name}`);
      const newChild = React.Children.map(element.props.children.props.children, (child, index) => {
        if (index === 2) return appendElement
        return child
      });
      return React.cloneElement(element, element.props, newChild);
    }
  }
}

export default HOC(Index);

// 优点：
// ① 方便获取组件内部状态，比如 state ，props ，生命周期，绑定的事件函数等。
// ② es6继承可以良好继承静态属性。所以无须对静态属性和方法进行额外的处理。

// 缺点：
// ① 函数组件无法使用。
// ② 和被包装的组件耦合度高，需要知道被包装的原始组件的内部状态，具体做了些什么？
// ③ 如果多个反向继承 HOC 嵌套在一起，当前状态会覆盖上一个状态。
// 这样带来的隐患是非常大的，比如说有多个 componentDidMount ，当前 componentDidMount 会覆盖上一个 componentDidMount 。
// 这样副作用串联起来，影响很大。
