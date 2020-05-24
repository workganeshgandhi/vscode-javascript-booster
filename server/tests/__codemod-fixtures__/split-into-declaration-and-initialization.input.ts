/*$ { fixture: 'should-split-simple-case' } $*/

// @ts-nocheck

let a = 'foo'; /*# { pos: 3 } #*/

/*$ { fixture: 'should-split-const' } $*/

const a = 'foo'; /*# { pos: 3 } #*/

/*$ { fixture: 'should-split-when-no-initializer' } $*/

let a = 'foo', b; /*# { pos: 3 } #*/

/*$ { fixture: 'should-split-when-many-initializers' } $*/

let a = 'foo', b = 'bar'; /*# { pos: 3 } #*/

/*$ { fixture: 'should-preserve-type' } $*/

let a: Foo = 'foo', b: Bar = 'bar'; /*# { pos: 12 } #*/
