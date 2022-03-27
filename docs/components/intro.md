---
id: intro
title: 组件定义
---

在接下来的篇章中，我们会介绍 **组件** 的封装，那么什么是组件呢：

> 简单来说，组件就是将一种独特的功能封装为函数，根据不同的输入进行结果 元素 的输出。

通过组件的模块化开发，我们可以将封装的组件在项目中不断的复用。

比如说，我们在做一个文章列表：

```rust
rsx! {
    h1 { "DioxusChina 文章列表" }
    div {
        class: "list",
        div {
            class: "post",
            h2 { "文章1" }
            span { "这是文章1的内容" }
        }
        div {
            class: "post",
            h2 { "文章2" }
            span { "这是文章2的内容" }
        }
        div {
            class: "post",
            h2 { "文章3" }
            span { "这是文章3的内容" }
        }
        div {
            class: "post",
            h2 { "文章4" }
            span { "这是文章4的内容" }
        }
    }
}
```

我们可以发现 `div #post` 这部分一直在被复用，且它里面的结构几乎都是一样的。

那我们可以把它封装成一个组件，并只需要接受 `标题` 和 `内容` 两个参数进行了。

```rust
#[derive(Props)]
struct PostProps<'a> {
    title: &'a str,
    content: &'a str,
}

fn Post<'a>(cx: Scope<'a ,PostProps<'a>>) -> Element {
    // 通过 cx.props 就可以直接获取上级传递下来的内容了
    // 因为我们定义的是 &'a str 所以说它需要生命周期的声明。
    // 如果使用普通 String 则不需要生命周期相关声明
    let title = cx.props.title;
    let content = cx.props.content;

    cx.render(rsx! {
        div {
            class: "post",
            h2 { "{title}" },
            span { "{content}" }
        }
    })
}
```
看看使用方法：

```rust
fn App(cx: Scope) -> Element {
    cx.render(rsx! {
        h1 { "DioxusChina 文章列表" }
        div {
            class: "list",
            Post {
                title: "文章1",
                content: "这是文章1的内容",
            }
            Post {
                title: "文章2",
                content: "这是文章2的内容",
            }
            Post {
                title: "文章3",
                content: "这是文章3的内容",
            }
            Post {
                title: "文章4",
                content: "这是文章4的内容",
            }
        }
    })
}
```
这样就方便了许多，如果要更改 `Post` 的样式，只需要编辑组件函数进行了。