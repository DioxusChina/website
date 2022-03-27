---
id: hooks
title: Hooks 介绍
---

在前面我们已经介绍了 **页面渲染** 和 **组件封装** 部分，接下来就是最重要的 **应用交互** 了！

要做应用交互，那么自然离不开 Hooks 的使用，先贴上一份代码：

```rust
fn App(cx: Scope) -> Element {
    let mut count = use_state(&cx, || 0);

    cx.render(rsx! {
        div {
            p { "你总共点击按钮 {count} 次！" }
            button {
                onclick: move |_| count += 1,
                "快点我！"
            }
        }
    })
}
```

在上方代码中，我们用到了 `use_state` 这一函数，它传递了 `&cx` 以及一个初始化函数。

它所赋予的 count 类型为：`&UseState<i32>` （这取决于初始化函数的返回值）

并且我们在按钮被按下时对它的值进行了 **+1** 操作，并在 P 标签中渲染了它的值。

:::info
上述的 `use_state` 是所有 Hook 函数中最基础的存在，也是最常用的。
:::

## 运行原理

那么 **Hooks** 究竟与正常的变量有什么区别呢？这些事情我不能通过变量实现吗？

我们需要知道，在这种应用程序中，我们时常会对 `Render` 渲染进行刷新，
刷新时会做什么呢？自然会重新调用使用的组件函数，那么函数中的变量是不是就被覆盖掉了呢？
所以说我们需要通过 Hook 来保存数据内容，因为它会被保存在程序内部，便不会因为组件函数的重新调用而被刷掉。
它在运行期间会一直 **根据声明顺序** 保存在程序内部，当组件函数被刷新时，会将值补回。

那么问题来了：**什么时候页面会被刷新渲染呢？**

在 **Dioxus** 预定义的大部分 Hooks 中，都会在内容更新时刷新渲染。
这也是为什么上面那个使用 `use_state` 代码能在按钮按下后自动更新 P 标签的内容。
（在 `use_state` 源码内部使用了 `cx.schedule_update()` 函数）

## 基础 Hook 函数

上面已经说过 `use_state` 是 Dioxus 在 Hooks 包中封装的函数。那么最基本的 Hook 函数是什么呢？

```rust
let data: &mut i32 = cx.use_hook(|_| 10);
```

`Scope` 下的 `use_hook` 便是 Hook 最基本的样子，它仅包含保存内容的功能（这也是你可以自己封装 Hook 函数的原因）

## UseState

这里介绍一下我们最常用的 `UseState` 结构（指 `use_state` 返回的结构）

#### 覆盖当前

通过 `set` 函数将新的值写入：

```rust
let name = use_state(&cx, || String::from("YuKun Liu"));
name.set("DioxusChina".to_string());
```

#### 读取当前

通过 `get` 函数读取当前值：

```rust
let name = use_state(&cx, || String::from("YuKun Liu"));
assert!(name.get() == String::from("YuKun Liu"));
```

#### 编辑当前

通过 `modify` 传入一个编辑函数：

```rust
let num = use_state(&cx, || 0);
num.modify(|old| old += 1);
```