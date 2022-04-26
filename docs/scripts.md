---
id: scripts
title: 脚本交互
---

在 **Dioxus** 中，我们可能有需要在程序中运行一些 Javascript 代码。

那么本章节我们将介绍在不同的平台下使用不同的解决方案来完成这一需求。

## useEval 支持

在 [#318](https://github.com/DioxusLabs/dioxus/pull/318) 中添加了这一方法，
它允许开发者获取一个 eval 函数用于单向的执行 Javascript 脚本代码。

```rust
fn MyApp(cx: Scope) -> Element {
    
    let eval = use_eval(&cx);

    // 它不会返回任何值，因此它仅仅可作为单向执行。
    eval("console.log('from use_eval')");

    cx.render(rsx! {
        div { "Hello MyApp" }
    })
}
```

## JsSys 支持

在 `Web` 平台应用下，你可以使用 [JsSys](https://docs.rs/js-sys/0.3.57/js_sys/) 完成本功能。

:::info
Web 平台使用 WASM 进行编译，目前 Rust 在这方面的支持做的还蛮不错；与 JS 交互也相对简单。
:::

一个简单的例子：

```rust
// 这个用法和上面的差不多，use_eval 也是通过 js_sys 进行封装的。
// 想了解 use_eval 的实现方法请自行查阅源代码。
js_sys::eval("console.log('xxx')");
```

## Desktop 程序

在 Desktop 应用中实现这一功能还比较麻烦（除了使用官方的 `use_eval` 之外）

我们也一直在寻找支持返回值的实现方法：[mrxiaozhuox/golde](https://github.com/mrxiaozhuox/golde)

在 **Golde** 中，通过使用 JS 在运行代码后更新某个组件的内容，并且在 Dioxus 这边对组件实现双向绑定。
可以完成一个简单的可交互的 JS 执行器，可惜当前版本似乎不再可用了（仅仅是因为没来得及更新）