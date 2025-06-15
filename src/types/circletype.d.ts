declare module "circletype" {
  export default class CircleType {
    constructor(el: HTMLElement);
    radius(r: number): this;
    dir(d: number): this;
    forceHeight(b: boolean): this;
  }
}
