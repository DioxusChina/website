---
id: intro
title: 项目介绍
---

:::tip
本教程由开发组成员 [YuKun Liu](https://github.com/mrxiaozhuox) 撰写，并非完全照搬翻译官方文档。
:::

Dioxus 是一款用于构建跨平台用户界面的框架。这本指南将带领你学习并使用它。

在开始之前，先贴上一份 `Hello World` 代码：


```rust
fn App(cx: Scope) -> Element {
    let count = use_state(&cx, || 0);

    cx.render(rsx!(
        h1 { "High-Five counter: {count}" }
        button { onclick: move |_| count += 1, "Up high!" }
        button { onclick: move |_| count -= 1, "Down low!" }
    ))
};
```

## 功能亮点

- 参照 React 设计，使得相关开发人员过渡简单。
- 强大状态管理系统以及易用的 `Hooks` 设计。
- 桌面应用原生支持，提供部分常用 API 可调用。
- 简洁的 `RSX` 界面声明格式，比 HTML 更加易读。

## 多平台支持

Dioxus 支持多平台开发，这意味着你的大部分代码可以在任意平台下被构建使用。

目前为止，我们所支持的平台有：

- 网页应用（使用 WASM 构建）
- 桌面应用（使用 Wry 构建）
- 移动应用（使用 Wry 构建）
- 终端应用（使用 Rink 构建）