import React from "react";

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));


// How to use:
// 你可以直接获取 DOM button 的 ref：
// const ref = React.createRef();
// <FancyButton ref={ref}>Click me!</FancyButton>;

// Note:
// 我们通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。
// 我们通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>。
// React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。
// 我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。
// 当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。

// 第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。
// 常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。
// Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。


function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;

      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }

  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}


function logProps2(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;

      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  // 在 DevTools 中为该组件提供一个更有用的显示名。
  // 例如 “ForwardRef(logProps(MyComponent))”
  const name = WrappedComponent.displayName || WrappedComponent.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}

// How to use logProps2:
const MyComponent = React.forwardRef((props, ref) => {
  // ... 组件逻辑  
  return <div ref={ref}>...</div>;
});

const LoggedMyComponent = logProps2(MyComponent);  
// Note:
// 此代码段没有显示处理ref的逻辑，但forwardedRef在LogProps的render方法中被传递给了WrappedComponent。
// 这样，你可以安全地在LoggedMyComponent上使用ref，并且它会被转发到MyComponent。
