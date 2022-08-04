---
id: special-attributes
title: 特殊属性
---

在 Dioxus RSX 中，我们有一些特殊属性，需要注意一下。

## 原生 HTML

如果我们希望在 RSX 中嵌入一段 HTML 代码，我们可以用到 `dangerous_inner_html` 这一属性。

比如说我们希望将一个 HTML 文件引入到某个 div 之中，我们可以这样做：
```rust
fn BlogPost(cx: Scope) -> Element {
    let content = include_str!("../post.html");
    cx.render(rsx!{
        div {
            class: "body",
            dangerous_inner_html: "{content}",
        }
    })
}
```
:::caution
一定要谨慎使用 `dangerous_inner_html` 属性！

它无法防止注入攻击（XSS），所以请确保你传入的 HTML 是绝对安全的。 
:::

## Bool 属性

大部分属性都是 `K = V` 的结构，但是 HTML 中也有一些特殊的属性，它们的值为 `Boolean` 类型。 

比如最常用的 hidden 属性，它会隐藏标签的显示。比如这样的代码：

```rsx
rsx! {
    div {
        hidden: "false",
        "hello"
    }
}
```

它的 hidden 为 false 所以这个元素依然会被显示。

> 在 RSX 中除了 `false` 这一字符串以外的所有内容在 Bool 属性内都属于 `true` 值。

以下是我整理出的 Bool 属性列表（只有它们支持 Boolean 设置）：

- allowfullscreen
- allowpaymentrequest
- async
- autofocus
- autoplay
- checked
- controls
- default
- defer
- disabled
- formnovalidate
- hidden
- ismap
- itemscope
- loop
- multiple
- muted
- nomodule
- novalidate
- open
- playsinline
- readonly
- required
- reversed
- selected
- truespeed

除此之外的其他属性都不会处理 `true & false` 值。

## 事件属性

Dioxus 支持在各种事件触发事作出反应：

```rust
rsx! {
    input {
        oninput: |evt| { println!("新的内容被输入了：{:?}", evt) },
    }
    button {
        onclick: |evt| { println!("按钮被点击了：{:?}", evt) },
        "点我试试看！"
    }
}
```

传入一个 回调函数，并可接受一个事件信息参数。

目前支持 JS 能处理的全部事件，具体有哪些就不在这里一一例举了。

## 拦截默认事件

`prevent_default` 可以拦截 JS 对默认事件的处理。（可用于拦截表单提交等）

```rust
rsx! {
    input {
        oninput: move |_| {},
        prevent_default: "oninput",

        onclick: move |_| {},
        prevent_default: "onclick",
    }
}
```