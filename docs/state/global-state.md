---
id: global-state
title: 全局状态
---

在上一章节中，我们讨论到组件内部的状态声明，它仅仅可用于当前组件内。

但是如果我们需要将一个状态数据传播到子组件内，或是需要在整个程序中被使用该怎么办呢？

---

传递到子组件？通过 `Props` 传递不就好了嘛：

```rust
fn App(cx: Scope) -> Element {
    cx.render(rsx! {
        Box {
            text: "Hello Dioxus"
        }
    })
}

#[inline_props]
fn Box(cx: Scope, text: String) -> Element {
    cx.render(rsx! {
        div {
            class: "box",
            "{text}"
        }
    })
}
```
那么试想一个问题，如果有很多层的子组件嵌套，且每一层都需要某一个数据呢：
```rust
fn App(cx: Scope) -> Element {
    cx.render(rsx! {
        Box {
            text: "Hello Dioxus"
        }
    })
}

#[inline_props]
fn Box(cx: Scope, text: String) -> Element {
    cx.render(rsx! {
        div {
            class: "box",
            SubBox {
                text: "{text}"
            }
            SubBox {
                text: "{text}"
            }
            SubBox {
                text: "{text}"
            }
        }
    })
}

#[inline_props]
fn SubBox(cx: Scope, text: String) -> Element {
    cx.render(rsx! {
        div {
            class: "sub-box",
            "{text}"
        }
    })
}
```
在这样的情况下，我们封装组件还需要一层一层的接收这个 `props` 再向下传递嘛？是不是太复杂了点。

## UseContext

这里我们介绍 `Dioxus` 中另一组方法，它可以向下级子组件传递数据。

在 Dioxus 的设计中，我们使用 `newType` 检索相应的数据内容，所以说每一个 `Context` 都应该是独特的数据类型：

```rust
#[derive(Clone)]
struct Title(String);

fn app(cx: Scope) -> Element {
    // 这里使用 provide_context 向下级提供了一个 Title 类型的数据。
    cx.use_hook(|_| {
        cx.provide_context(Title("DioxusChina".into()));
    });
    // 渲染子组件
    cx.render(rsx!{
        Child {}
    })
}
```

接下来我们在子组件中接收它：

```rust
fn Child(cx: Scope) -> Element {
    // 你可以直接 consume_context 获取到相应类型的 Context
    let name = cx.consume_context::<Title>();
    // 但是这样会在每一次刷新时都被调用，所以说更好的做法是在 use_hook 中执行：
    let name = cx.use_hook(|_| cx.consume_context::<Title>());
}
```

所有提供的 `Context` 类型必须可被克隆，因为它会在每一次 `consume_context` 执行时被复制。

## Fermi

:::info
Fermi 先前是一款官方发布的 **独立** 全局状态包，但目前已经加入到 Dioxus 之中。
```
dioxus = { version = "0.2.3", features = ["fermi", ...] }
```
你需要通过 features 来引入它。
:::

我们使用 Fermi 中的 Atom 类型创建一个 static 的闭包值。

```rust
static NAME: Atom<&str> = |_| "DioxusChina";
```

接下来我们便可以在程序的任何地方 读/写 这一数据了：

```rust
fn NameCard(cx: Scope) -> Element {      
    let name = use_read(&cx, NAME);
    cx.render(rsx!{ h1 { "Hello, {name}"} })
}
// <h1>Hello, DioxusChina</h1>
```

写入数据则是使用 `use_set` 函数：


```rust
fn NameCard(cx: Scope) -> Element {      
    let set_name = use_set(&cx, NAME);
    cx.render(rsx!{
        button {
            onclick: move |_| set_name("Fermi"),
            "Set name to fermi"
        }
    })
}
```

这里只是简单的介绍了使用方法，具体的实现与其他功能将在后续涉及。