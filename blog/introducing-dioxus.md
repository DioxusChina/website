---
slug: introducing-dioxus
title: Dioxus v0.1 版本介绍
authors: [jkelleyrtp]
tags: [DioxusLabs]
date: 2022-03-26
---

经过几个月的工作，我们非常激动地发布了 `Dioxus` 的第一个版本！

Dioxus 是一个使用 Rust 构建可交互 UI 界面的（新）库。它可以被移植到 WEB、桌面、服务器、移动等平台。

Dioxus 的设计目标：

- 方便入门：类似于 `React` 的开发思想与 API 设计。
- 健壮性：通过将错误转移到类型系统中来避免运行时错误。
- 效率提升：开发效率和应用程序性能都得到了大大的提升。
- 拓展性：可重用的钩子和组件可以在每个平台上工作。

Dioxus 是为那些已经熟悉 React 范例的开发者而设计的。我们的目标是能让开发者从 TypeScript/React 平稳过渡，而不需要学习太多其他的新概念。

为了让你了解 Dioxus 是什么样子，这里有一个简单的计数器应用程序：

```rust
use dioxus::prelude::*;

fn main() {
    dioxus::desktop::launch(app)
}

fn app(cx: Scope) -> Element {
    let mut count = use_state(&cx, || 0);

    cx.render(rsx! {
        h1 { "Count: {count}" }
        button { onclick: move |_| count += 1, "+" }
        button { onclick: move |_| count -= 1, "-" }
    })
}
```

在我们的应用程序中，我们可以与系统 API 进行本地交互，运行多线程代码，并支持常规原生 Rust 应用程序可执行的任何操作。
运行 `cargo build -release` 将编译一个可移植的二进制文件。
然后我们可以使用 `cargo-bundle` 将我们的二进制文件捆绑到原生的 `.app/.exe/.deb` 文件中。

Dioxus 支持许多与 React 相同的功能，包括: