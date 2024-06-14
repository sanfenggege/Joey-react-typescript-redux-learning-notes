import React from "react";

// 1. proxy props HOC:
export function proxyPropsHOC(WrappedComponent) {
  return class enhance extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

// 2. Inheritance Inversion HOC:
export function inheritanceInversionHOC(WrappedComponent) {
  return class enhance extends WrappedComponent {
    componentDidMount() {
      super.componentDidMount && super.componentDidMount();
    }

    componentWillUnmount() {
      super.componentWillUnmount && super.componentWillUnmount();
    }

    render() {
      return super.render();
    }
  }
}