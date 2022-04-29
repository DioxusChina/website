---
id: custom-html
title: 自定义 HTML 框架
---

在默认情况下，我们在 Dioxus 中编写的一切组件、元素都是在 ID 为 **main** 的 DIV 下被渲染的。

如果我们希望在 Desktop 应用程序下自定义 Header 或是全局的 HTML 该怎么办呢？

通过 `with_custom_head` 可以定义一个自定义的 Head 信息。

```rust
dioxus::desktop::launch_cfg(app, |c| {
    c.with_custom_head("<style>body { background-color: red; }</style>".into())
});
```

或者通过 `with_custom_index` 方法设置整个 HTML 框架：

```rust
dioxus::desktop::launch_cfg(app, |c| {
    c.with_custom_index(
        r#"
<!DOCTYPE html>
<html>
  <head>
    <title>Dioxus app</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>body { background-color: blue; }</style>
  </head>
  <body>
    <div id="main"></div>
  </body>
</html>
    "#.into(),
    )
    });
```

:::info
程序依然将在 ID 为 `main` 的 DIV 中被生成。
:::