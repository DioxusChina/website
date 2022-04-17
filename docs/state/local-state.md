---
id: local-state
title: 内部状态
---

我们常常需要在一个组件内添加一些 `state` 完成工作，它仅在本组件内可用，并不会影响到外部的其他组件中。

接下来我们先尝试封装一个组件：

```rust
struct Todo {
    contents: String,
    is_hovered: bool,
    is_editing: bool,
}

let todos = use_ref(&cx, || vec![Todo::new()]);

cx.render(rsx!{
    ul {
        todos.read().iter().enumerate().map(|(id, todo)| rsx!{
            li {
                onhover: move |_| todos.write()[id].is_hovered = true,
                h1 { "{todo.contents}" }
            }
        })
    }
})
```

我们使用 `useRef` 保存了一个 `Vec<Todo>` 的复杂结构，并通过迭代器将数组内的结构渲染出来。

当 `li` 被点击时，我们将 `Todo` 结构中的 `closed` 进行更新：

```rust
todos.write()[0].is_hovered = true;
```

但是随着项目结构越来越复杂，我们会发现：**我们真的需要把 closed 保存到结构体里吗？**

所以说我们更新一下代码的结构，我们再封装一个 `Todo` 的组件：

```rust
#[inline_props]
fn Todo<'a>(cx: Scope, todo: &'a Todo) -> Element {
    let is_hovered = use_state(&cx, || false);

    cx.render(rsx!{
        li {
            h1 { "{todo.contents}" }
            onhover: move |_| is_hovered.set(true),
        }
    })
}
```
这样我就可以优化我们 `Todo` 结构体了（不再需要 closed 属性了）

:::tip
结构体保存的东西应该专注于 Todo 其本身的数据，而这些运行时短暂存在的状态则不应该混淆在其中。
:::