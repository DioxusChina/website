---
id: hooks-func
title: Hooks 函数
---

在上一章中我们介绍了最常用的 Hook 函数：`use_state`

那么在这一章节中我们将介绍 `Dioxus-Hooks` 包中的所有函数。

## UseRef

我们之前介绍的 `UseState` 有一个特点：它的值必须可被 **克隆**，
这就导致了在部分情况下我们无法使用它。

在这时，我们就需要用到 `use_ref` 了，它本质上就是对 `Rc<Ref<T>>` 的封装。

看起来像这样：

```rust
let names = use_ref(&cx, || vec!["张三", "李四"]);
```

通过 `read` 方法读取内容：

```rust
cx.render(rsx!{
    ul {
        names.read().iter().map(|name| {
            rsx!{ "{name}" }
        })
    }
})
```

通过 `write` 方法写入：

```rust
names.write().push("王五");
```

正常情况下，当 `write` 被使用，程序都会刷新渲染，如果你不希望刷新渲染可以使用：

```rust
names.write_silent().push("赵六");
```

将 `UseRef` 加入到异步中使用：

```rust
cx.spawn({
    to_owned![names];
    async move {
        loop {
            wait_ms(100).await;
            names.write().push("Calvin");
        }
    }
})
```