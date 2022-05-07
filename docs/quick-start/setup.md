---
id: setup
title: 初始化
---

> 工欲善其事，必先利其器。

在本章中，我们来了解一下如何初始化一个最简单的 Dioxus 项目。

首先，我们先创建一个项目目录，并进入目录使用 `cargo` 来初始化一个 Rust 二进制项目：

```shell
cd myProject
cargo init --bin
```

通过编辑 `Cargo.toml` 加入 Dioxus 包依赖：

```toml
dioxus = { version = "0.2.3", features = ["desktop"] }
```

### Features 选项

在添加 Dioxus 到依赖时，我们需要选择对应的 Features 选项：

- `macro` - 宏支持（默认开启）
- `hooks` - Hooks 封装（默认开启）
- `html` - HTML 相关（默认开启）
- `web` - Web 应用程序支持
- `tui` - TUI 应用程序支持
- `desktop` - 桌面应用程序支持
- `router` - 路由相关功能支持
- `fermi` - 全局路由工具支持

其中 `web` `tui` `desktop` 决定了你的应用运行在什么平台之上。

我们这里使用了 `desktop` 选项，那么我们开发的将是一个桌面应用程序。

### 让项目跑起来！

接下来，我们尝试让应用程序运行起来，我们在 `main.rs` 写下：

```rust
use dioxus::prelude::*;

fn main() {
    dioxus::desktop::launch(App);
}

fn App(cx: Scope) -> Element {
    cx.render(rsx! (
        div { "Hello, world!" }
    ))
}
```

并使用 `cargo run` 就可以运行一个 `Hello World` 项目了！（代码解析将在下一篇章中）

:::caution
上面提到的 Web 平台需要 WASM 编译环境作为支持：

通过命令添加编译目标：`rustup target add wasm32-unknown-unknown`

如果没添加 wasm 的话，将无法完成 web 应用的编译。
:::