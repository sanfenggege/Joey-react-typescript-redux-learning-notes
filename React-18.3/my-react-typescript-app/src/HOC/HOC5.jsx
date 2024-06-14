import React from "react";

const Loading = () => {
  return <div>Loading...</div>
}

const DynamicHOC = (loadRouter) => {
  return class Context extends React.Component {
    state = { Component: null };

    componentDidMount() {
      if (this.state.Component) return;
      loadRouter()
        .then(module => module.default)
        .then(Component => this.setState({ Component }));
    }

    render() {
      const { Component } = this.props;
      return Component ? <Component {...this.props} /> : <Loading />
    }
  }
}

export default DynamicHOC;

// How to use this HOC: const Index = DynamicHOC(()=>import('../pages/index'))