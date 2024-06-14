import React from "react";

// 正向属性代理：
function HOC(WrappedComponent) {
  return class advance extends React.Component {
    state = {
      name: "test hoc"
    };
    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }
}

export default HOC;


// 优点：
// ① 属性代理可以和业务组件低耦合，零耦合，对于条件渲染和 props 属性增强，
// 只负责控制子组件渲染和传递额外的 props 就可以了，所以无须知道，业务组件做了些什么。
// 所以正向属性代理，更适合做一些开源项目的 HOC ，目前开源的 HOC 基本都是通过这个模式实现的。
// ② 同样适用于类组件和函数组件。
// ③ 可以完全隔离业务组件的渲染，因为属性代理说白了是一个新的组件，相比反向继承，可以完全控制业务组件是否渲染。
// ④ 可以嵌套使用，多个 HOC 是可以嵌套使用的，而且一般不会限制包装 HOC 的先后顺序。

// 缺点：
// ① 一般无法直接获取原始组件的状态，如果想要获取，需要 ref 获取组件实例。
// ② 无法直接继承静态属性。如果需要继承需要手动处理，或者引入第三方库。
// ③ 因为本质上是产生了一个新组件，所以需要配合 forwardRef 来转发 ref。