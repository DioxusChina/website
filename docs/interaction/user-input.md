---
id: user-input
title: 输入交互
---

试想一个最简单的需求，我们希望获取一个 Input 框中的内容：

```rust
rsx! {
    input { value: "当前值" }
    button {
        onclick: |_| {},
        "获取输入内容"
    }
}
```

先完成第一步，我们将 `value` 的当前值用一个 `state` 保存：

```rust
let value = use_state(&cx, || "当前默认值".to_string());

cx.render(rsx! {
    input { value: "{value}" }
    button {
        onclick: move |_| println!("当前 Value 的值为：{value}"),
        "获取输入内容"
    }   
})
```
:::caution
请注意，这里的只是将 `value` 值单向绑定到输入框中，编辑输入框并不会同步更新它。
:::

接下来我们可以通过之前俺介绍到的事件处理来完成更新：

```rust
let value = use_state(&cx, || "当前默认值".to_string());

cx.render(rsx! {
    input {
        value: "{value}",
        oninput: |e| value.set(e.value.clone())
    }
    button {
        onclick: |_| println!("当前 Value 的值为：{value}"),
        "获取输入内容"
    }   
})
```

这里的 `oninput` 会在输入框被更新输入后调用，`e.value` 则是输入框当前的新值。
如此一来，我们便可以很轻易地实现所谓的 `双向绑定` 功能。这时 `value` State 中的值便始终同步于输入框了。

## Bind 参数

:::danger
这部分功能还未实现，目前仅仅是一个设计方案。
:::

我们计划添加 `bind` 参数，快速实现上方的功能。它会自动将 `oninput` 连接到 `UseState` 之中。

```rust
let name = use_state(&cx, || "Sam".to_string());

cx.render(rsx!{
    input { bind: name }
})
```
