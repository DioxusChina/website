---
id: fermi
title: Fermi
---
Fermi 是在 Dioxus 应用程序中管理全局状态的理想 crate。

如果你正在构建的应用程序已经超过了几个组件，那么勾画和组织应用程序的状态将是值得的。Fermi 可以轻松地从依赖 `use_state` 的简单应用程序过渡到具有数十个组件的应用程序。

:::info
只需要在`dioxus上`添加`fermi`特性就可以引入`fermi`。

```toml
[dependencies]
dioxus = { version = "0.2.4", features = ["desktop", "fermi"] }
```

:::

## 和单个变量搭配使用

应用程序中的每个全局状态都由一个"atom"表示。

```rust
static TITLE: Atom<String> = |_| "Defualt Title".to_string();
```

然后可以将此`atom`与 `use_atom` 挂钩来代替 `use_state`。

```rust
static TITLE: Atom<String> = |_| "hello".to_string();
fn App(cx: Scope) -> Element {
    let title = use_atom_state(&cx, TITLE);
    cx.render(rsx! {
        h1{"{title}"},
        button{onclick:move |_| title.set("new title".to_string()),"change"},
    })
}
```

`Fermi`在两个组件中共享值是非常有用的。

```rust
static TITLE: Atom<String> = |_| "Defualt Title".to_string();

fn TitleBar(cx: Scope) -> Element {
    let title = use_atom_state(&cx, TITLE);

    rsx!{cx, button { onclick: move |_| title.set("titlebar title".to_string()) } }
}

fn TitleCard(cx: Scope) -> Element {
    let title = use_atom_state(&cx, TITLE);

    rsx!{cx, button { onclick: move |_| title.set("title card".to_string()) } }
}
```

## 和集合搭配使用

