import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>OPS! There are something wrong!</h2>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

// how to use this component:
// <ErrorBoundary>
// <MyWidget />
// </ErrorBoundary>

// Note:
// 如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。
// 当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。