import React from "react";

//1.  Props Proxy HOC（正向属性代理）:（函数组件、类组件都可以用）
// a basic HOC:
export function basicHOC(WrappedComponent) {
  return class enhance extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

const someStateOrInstanceMethod = {
  newState: 'test hoc',
  log: () => { console.log('log hoc'); }
}

class MyComponent extends React.Component {
  render() {
    return <div>{this.props.message}</div>
  }
}

// (1). add 、delete 、update props:
export function controlHOC(WrappedComponent) {
  return class enhance extends React.Component {
    render() {
      let newProps = {
        ...this.props,
        someStateOrInstanceMethod
      }
      return <WrappedComponent {...newProps} />
    }
  }
}

// How to use controlHOC:
// export default controlHOC(MyComponent);

// (2). Render hijacking:
export function loadingHOC(WrappedComponent) {
  return class Loading extends React.Component {
    render() {
      if (!this.props.data) {
        return <div>Loading...</div>
      }
      return <WrappedComponent {...this.props} />
    }
  }
}

// (3). delete and add props:
export function filterHOC(WrappedComponent) {
  return class filter extends React.Component {
    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be passed through:
      const { extraProp, ...passThroughProps } = this.props;

      // Inject props into the wrapped component. These are usually state values or instance methods:
      const injectedProp = someStateOrInstanceMethod;

      // Pass props to wrapped component:
      return (
        <WrappedComponent
          injectedProp={injectedProp}
          {...passThroughProps}
        />
      );
    }
  }
}

// (4). get ref:
// (a):
export function HOCFactory(WrappedComponent) {
  return class HOC extends React.Component {
    // 构造函数可以在这里初始化state或绑定事件处理器，但在这个例子中不是必需的  

    getWrappedInstance = () => {
      if (this.props.withRef) {
        return this.wrappedInstance;
      }
      return null; // 或者可以抛出一个错误，表明无法在没有withRef的情况下获取实例  
    }

    setWrappedInstance = (ref) => {
      this.wrappedInstance = ref;
    }

    render() {
      const props = {
        ...this.props,
        ref: this.props.withRef ? this.setWrappedInstance : undefined
      };

      // 移除props中的withRef，因为我们不希望将它传递给WrappedComponent  
      const { withRef, ...otherProps } = props;

      return <WrappedComponent {...otherProps} />;
    }
  }
}

// how to use HOCFactory:
// export default HOCFactory(MyComponent); 
// class ParentCompoent extends React.Component {
//   doSomethingWithMyComponent(){
//     let instance = this.refs.child.getWrappedInstance();
//     // ....
//   }

//   render(){
//     return <MyComponent ref="child" withRef />
//   }
// }

// (b):
export function HOCFactory2(WrappedComponent) {
  return class HOC extends React.Component {
    render() {
      let props = {
        ...this.props
      };

      if (typeof this.props.getInstance === "function") {
        props.ref = this.props.getInstance;
      }

      return <WrappedComponent {...props} />
    }
  }
}

// how to use HOCFactory2:
// export default HOCFactory2(MyComponent);
// class ParentCompoent extends React.Component {
//   getInstance = (ref)=>{
//     this.wrappedInstance = ref;
//   }

//   render(){
//     return <MyComponent getInstance={this.getInstance} />
//   }
// }


// 2. Inheritance Inversion HOC (反向继承)：仅在类组件中使用，函数组件不可被继承。
export function withLifecycleLogging(WrappedComponent) {
  return class extends WrappedComponent {
    componentDidMount() {
      console.log('Component has mounted!');
      super.componentDidMount && super.componentDidMount();
    }

    componentWillUnmount() {
      console.log('Component will unmount!');
      super.componentWillUnmount && super.componentWillUnmount();
    }

    render() {
      // 可以通过操作state和props来渲染额外的元素，但在这个例子中我们直接调用super.render()  
      return super.render();
    }
  };
}

// How to use:
// const LoggedComponent = withLifecycleLogging(MyComponent);

// Note:
// 注意，在使用反向继承时，需要谨慎处理对 super 的调用，以确保不会意外地覆盖或破坏原始组件的行为。
// 此外，由于反向继承是通过继承来实现的，因此它可能不适用于函数组件，因为函数组件没有实例方法，也无法被继承。