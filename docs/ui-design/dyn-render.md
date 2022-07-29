---
id: dyn-render
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

### 嵌入表达式

嵌入表达式时需要用到 `format_args!` 这个宏。由于 `rsx!` 宏的特殊性，只能用 `[]` 包裹 `format_args!` 宏来嵌入表达式。

```rust
rsx!( [format_args!("Hello {}", if enabled { "Jack" } else { "Bob" } )] )
```

除此之外，`&str` 可以被包裹在 `[]` 中。

```rust
rsx!( "Hello ",  [if enabled { "Jack" } else { "Bob" }] )
```

但是更寻常的方法是直接用变量在 `rsx!` 外绑定表达式。

```rust
let name = if enabled { "Jack" } else { "Bob" };
rsx! ( "hello {name}" )
```


### Element 嵌套

我们可以将一个 Element 类型嵌套到另一个 RSX 之中：

```rust
fn App(cx: Scope) -> Element {
    let sub_element = cx.render(rsx! {
        h1 { "标题" }
    });
    cx.render(rsx! {
        div {
            sub_element
        }
    })
}
```

:::info
`Element` 实质上就是 `Option<VNode>` 的别名，所以说它也可以返回一个 `None` 值。
:::

### 变量的刷新

目前我们无法通过变量的更新来刷新页面内容，但是使用 `Hooks` 可以做到，我们将在后面的章节讲解。

以目前的已学的内容：我们可以通过变量输出内容到页面，但是无法输入一些新的事件以及更新渲染。