import React from "react";

// Class components get component instances through ref:
function HOC(component) {
  return class WrappedComponent extends component {
    constructor() {
      super();
      this.node = null;  // when got component ref, can add some logic
    }

    render() {
      return <component {...this.props} ref={node => this.node = node} />
    }
  }
}

export default HOC;