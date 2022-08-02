---
id: properties
title: 组件属性
---

这一章我们将细致的讲解 `Props` 的使用。

## 声明 Props

接下来我们定义一个 Props，你需要声明一个结构体，并为它添加派生宏：

```rust
#[derive(Props, PartialEq)]
struct MyProps {
    name: String,
}
```

:::caution
请注意这里，如果 `Props` 内没有包含任何引用的话，你需要添加 `PartialEq` 的特征。
:::

或者直接包含引用：

```rust
#[derive(Props)]
struct MyProps<'a> {
    name: &'a str
}
```

---

## 绑定到组件

正常的 组件函数 不包含 Props 内容，大概是这样：

```rust
fn App(cx: Scope<()>) -> Element {/* ... */}
// 也等于这样
fn App(cx: Scope) -> Element {/* ... */}
```

那我们把 `MyProps` 绑定到其中：

```rust
fn App(cx: Scope<MyProps>) -> Element {/* ... */}
// 如果包含生命周期 引用
fn App<'a>(cx: Scope<'a, MyProps<'a>>) -> Element {/* ... */}
```

访问属性也非常简单：
```rust
fn App(cx: Scope<MyProps>) -> Element {
    let name: String = cx.props.name;
    cx.render(rsx! {
        h1 { "{name}" }
    })
}
```

## 可选 Props

在一些情况下，某一个 Props 内容并非必须的（Required），我们可以这样将其设置为可选的：

```rust
#[derive(Props, PartialEq)]
struct MyProps {
    name: String,

    #[props(optional)]
    description: Option<String>

}
```

可选 Props ：数据类型必须包含 Default 特征，在没有被赋值的时候，会为默认值。

`optional` 修饰符包含了两个独立的修饰符 `default` 和 `strip_option` 。

- **default** - 当内容没有填写时，赋予它默认值。
- **strip_option** - 自动包装 `Some` 数据。
- **optional** - 同时包含了 `default` 和 `strip_option` 修饰符。
- **into** - 在调用时自动调用 `into()` 函数。

## Inline 宏

我们提供了 `inline_props` 宏，它允许你在函数参数中设置 `Props` 。

我们上面的 Demo 可以直接简写为：

```rust
#[inline_props]
fn App(cx: Scope, name: String) -> Element {
    cx.render(rsx! {
        h1 { "{name}" }
    })
}  
```
:::caution
任何库作者不应该在项目中使用 `Inline` 宏，因为它无法实现 `可选` 功能，同时你无法为组件编写文档。
:::