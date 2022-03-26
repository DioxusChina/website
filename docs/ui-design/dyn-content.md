---
id: dyn-content
title: 变量渲染
---

在前面的章节中，我们一直在介绍如何定义页面，但是并没有聊到 RSX 如何渲染变量内容。

在真实开发环境中，我们渲染的内容不是一成不变的：

```rust
fn App(cx: Scope) -> Element {
    let name: &str = "YuKun Liu";
    cx.render(rsx! {
        div { "Hello: {name}!" }
    })
}
```
结果为：
```
Hello: YuKun Liu!
```

### Display 特征

你能渲染的类型有很多，只要它实现了 `Display trait` 特征：

```rust
fn App(cx: Scope) -> Element {
    let name: &str = "YuKun Liu";
    let age: u8 = 18;
    let adult: bool = true;

    cx.render(rsx! {
        ul {
            li { "名称：{name}" }
            li { "年龄：{age}" }
            li { "成年状态：{adult}" }
        }
    })

}
```

### Debug 特征

如果数据类型并未实现 `Display` 特征，也可以通过 `Debug` 特征渲染，如下：


```rust
fn App(cx: Scope) -> Element {
    let v = vec![1, 2, 3, 4, 5];
    cx.render(rsx! {
        div {
            "数组：{v:?}"
        }
    })
}
```
结果如下：
```
数组：[1, 2, 3, 4, 5]
```