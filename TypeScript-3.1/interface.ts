enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Square,
  radius: 100,
}

enum E {
  Foo,
  Bar,
}

function f(x: E) {
  if (x !== E.Foo || x !== E.Bar) {
    //             ~~~~~~~~~~~
    // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
  }
}

interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors


type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;

function foo(x: number) {
  if (x !== 1 || x !== 2) {
      //         ~~~~~~~
      // Operator '!==' cannot be applied to types '1' and '2'.
  }
}

// 问题7：
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

let animal: Animal = { name: "Animal" };
let dog: Dog = { name: "Dog", breed: "Labrador" };

animal = dog; // 对象类型是双变的，这是合法的
dog = animal; // 对象类型是双变的，这也是合法的

let x: string = "hello";
let y: string = x; // 这是合法的

let a: Animal = { name: "Animal" };
let b: Animal = a; // 这也是合法的

type Logger<T> = (arg: T) => void;
let logNumber: Logger<number> = (x: number) => console.log(x);
let logAny: Logger<any> = logNumber; // 函数参数是逆变的，这是合法的

let subtypes: string[] = ["hello", "world"];
let supertype: Object[] = subtypes; // 数组是协变的，这是合法的
