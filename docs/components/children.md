---
id: children
title: 子元素传递
---

有一种需求，我们希望将一些 `Child Element` 传递到组件中，类似于：

```rust
rsx! {
    MyComponent {
        title: "hello world",
        body: cx.render(rsx! {
            div { "content" }
        })
    }
}
```

组件的声明方式：

```rust
#[derive(Props)]
struct MyComponentProps<'a> {
    href: &'a str,
    body: Element<'a>
}

fn MyComponent(cx: Scope<MyComponentProps>) -> Element {
    cx.render(rsx!(
        a {
            href: "{cx.props.href}",
            &cx.props.body
        }
    ))
}
```

> 通过 `Element` 类型的 Props 我们可以传递一个新的 Element 到组件。

## Children 特殊项

上面的方法通过 `Props Element` 的传递方式并不方便，所以说我们提供了一个特殊项：`children`

```rust
#[derive(Props)]
struct MyComponentProps<'a> {
    href: &'a str,
    children: Element<'a>
}

fn MyComponent(cx: Scope<MyComponentProps>) -> Element {
    cx.render(rsx!(
        a {
            href: "{cx.props.href}",
            &cx.props.children
        }
    ))
}
```

通过特殊的 `children` 项，我们可以很方便的完成传递：

```rust
rsx! {
    MyComponent {
        title: "hello world",
        // 不需要使用 `body: cx.render(rsx!{})`
        div {
            "content"
        }
    }
}
```

## 传递元素属性

通过 `attributes` 项你可以传递属性到组件中：

```rust
#[derive(Props)]
struct MyComponentProps<'a> {
    attributes: Attributes<'a>
}

fn MyComponent(cx: Scope<MyComponentProps>) -> Element {
    cx.render(rsx!(
        a { 
            ..cx.props.attributes,
            "一个链接！"
        }
    ))
}
```

接下来可以这样调用：

```rust
rsx! {
    MyComponent {
        "class": "blue-button",
        "style": "background: red;"
    }
}
```

## 传递事件处理

向组件传递 `on` 事件处理器：

```rust
#[derive(Props)]
struct MyComponentProps<'a> {
    onclick: EventHandler<'a, MouseEvent>
}

fn MyComponent(cx: Scope<MyComponentProps>) -> Element {
    cx.render(rsx!(
        a { 
            onclick: move |evt| cx.props.onclick.call(evt),
            "链接"
        }
    ))
}
```

使用方法：

```rust
rsx!(
    MyComponent {
        onclick: move |_| log::info!("Clicked"),
    }
)
```

这样子当 a 标签被点击时，就会触发 `log::info!` 方法。