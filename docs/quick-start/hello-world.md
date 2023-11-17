---
id: hello-world
title: 简单应用
---

在上一章中我们编写了一段简单的代码让 Dioxus 成功运行了起来：

```rust
#![allow(non_snake_case)]
// import the prelude to get access to the `rsx!` macro and the `Scope` and `Element` types
use dioxus::prelude::*;

fn main() {
    dioxus_desktop::launch(app);
}

fn app(cx: Scope) -> Element {
    cx.render(rsx! (
        div { "Hello, world!" }
    ))
}
```

接下来我们来解析一下这个代码，了解下它的大致用途。

---

### 代码解析

```rust
use dioxus::prelude::*;
```
我们通过 `use` 将一部分结构、函数等引入我们的程序，方便我们直接调用。
这里使用了 `dioxus::prelude::*` 即代表引入了所有 dioxus 预先定义好的常用内容。
这样写的好处是我们不需要编写一大堆 `use` 语句，而是一次性引入了所有常用功能。

```rust
fn app(cx: Scope) -> Element {
    cx.render(rsx! ( 
        div { "Hello, world!" }
    ))    
}
```
我们有一个 `app` 函数，它接受一个 `Scope` 类型的参数，并返回一个 `Element` 类型。
通过 `Scope` 内的 `render` 函数可以返回一个 `Element` 类型，在 `render` 内便可以使用 `rsx!` 宏编写 RSX 语法。

这里我们的 RSX 内生成了一个 `div` 元素（相同于 HTML 中的元素），它的内容为 "Hello, world!"，相同于：

```html
<div>Hello, world!</div>
```
RSX 会自动被转换为 HTML 结构，但是 RSX 更容易被表达和阅读。

```rust
fn main() {
    dioxus_desktop::launch(app);
}
```
在 `main` 函数中，我们通过 `lanuch` 函数运行整个程序，并传入根组件 `app`，也就是我们上面编写的那个函数。
注意，这里的主线程会被应用程序的事件循环所阻塞，直到触发整个程序的退出。