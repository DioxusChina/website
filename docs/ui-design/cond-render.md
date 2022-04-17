---
id: cond-render
title: 条件渲染
---

本章节我们将介绍一下条件渲染的实现：

> 条件渲染是指我们在不同的情况下使用不同的 RSX 结构代码。

## 模拟场景

在这里我们来模拟一个应用场景（一个简单的 在线/离线 的状态信息）

- 在线：显示应用内容
- 离线：显示登录页面

这里先定义一个 `Props` 用于在组件中存放数据（组件就是我们所编写的函数）

```rust
#[derive(Props, PartialEq)]
struct AppProps {
    // True  为在线
    // False 为离线
    account_state: bool
}
```

然后定义我们的组件：

```rust
// 这里我们就将上面所编写的 Props 绑入了组件中
fn App(cx: Scope<AppProps>) -> Element {
    if cx.props.account_state {
        cx.render(rsx! {
            Dashboard { }
        })
    } else {
        cx.render(rsx! {
            LoginPage { }
        })
    }
}
```

:::info
在这里简单的介绍一下 `Props`，你可以理解为它是由上层调用时所传递下来的内容数据。
```rust
// 比如说我们在上层调用 `App` 函数组件。
fn Root(cx: Scope) -> Element {
    cx.render(rsx! {
        App {
            account_state: false
        }
    })
}
```
:::

## RSX 存入变量

在上面的例子中我们根据不同的判断条件返回了不同的 Elemenet 结构，但是这往往会遇到一个问题：

如果大部分结构是相同的怎么办，判断仅仅改变了一点点内容（以及多重判断）：

```rsx
// 登录页面
rsx! {
    div {
        h1 { "标题" }
        p { "内容" }
    }
    div {
        p { "登录页面" }
    }
}

// 应用页面
rsx! {
    div {
        h1 { "标题" }
        p { "内容" }
    }
    div {
        p { "应用页面" }
    }
}
```

如果按照上面的方法编写，那么后期我们将极难维护它，要编辑一下样式都需要改很多地方。

那我们来找一个结局方案：

```rust
let page = if props.account_state {
    cx.render(rsx! { p { "应用页面" } })
} else {
    cx.render(rsx! { p { "登录页面" } })
};

cx.render(rsx! { 
    div {
        h1 { "标题" }
        p { "内容" }
    }
    div {
        page
    }
})
```

:::info
`cx.render(rsx!{})` 和 `rsx!{}` 都可以直接被嵌套到一个 RSX 之中。所以也可以这么写：

```rust
let page = match props.account_state {
    true => rsx!(p { "应用页面" }),
    false => rsx!(p { "登录页面" })
};

cx.render(rsx! { 
    div {
        h1 { "标题" }
        p { "内容" }
    }
    div {
        page
    }
})
```
:::

## 布尔映射

当你需要 **有条件的** 隐藏或显示一个内容时，更简单的方法是：

```rust
let show_title = true;
rsx!(
    div {
        show_title.and_then(|| rsx!{
            "这是文章标题"
        })
    }
)
```

## 空元素

`Element` 的本质就是 `Option<VNode>` 的别名，所以说你可以直接返回 `None` 值：

```rust
fn App(cx: Scope) -> Element {
    None
}
```