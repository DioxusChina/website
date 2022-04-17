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

所有提供的 `Context` 类型必须可被 Clone