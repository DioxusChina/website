---
id: desktop-window
title: 窗口控制
---

:::info
如果您正在使用 **Dioxus** 开发 Desktop 桌面程序，那请认真阅读本章节。
:::

> 目前 Dioxus 仅支持单窗口模式（当前指 **0.2.X** 版本）

## 启动参数

在 Main 函数中使用 `launch_cfg` 方法可以完成一次初始化 window 配置，你可以在这里配置 *窗口标题、程序图标、窗口大小、是否可拖动、是否可调整大小、最大/最小窗口大小* 等各类信息。

相关 API 请查阅：[Wry WindowBuilder API](https://docs.rs/wry/0.15.1/wry/application/window/struct.WindowBuilder.html)

```rust
fn main() {
    use dioxus::desktop::tao::dpi::LogicalSize;
    dioxus::desktop::launch_cfg(app, |cfg| {
        cfg.with_window(|w| {
            w.with_title("Calculator Demo")
                .with_resizable(false)
                .with_inner_size(LogicalSize::new(320.0, 530.0))
        })
    });
}
```

这种配置是在窗口刚刚创建时被应用的，你也无法在运行期间通过它更新相关数据。

## useWindow 方法

在程序运行过程中可以使用 `use_window` 方法获取一个 &[DesktopContext](https://docs.rs/dioxus-desktop/0.2.2/dioxus_desktop/struct.DesktopContext.html) 值，通过它便可以实时更新。

```rust
fn App(cx: Scope) -> Element {
    let win = dioxus::desktop::use_window(&cx);
    
    // 我们将窗口设置为无边框的，然后我们可以自己实现标题栏。
    win.set_decorations(false);

    cx.render(rsx! {
        div {
            class: "titlebar",
            // 当鼠标被按下后，开始监听窗口的拖拽
            // 通过这种方法可以实现自定义 TopBar 的页面拖拽
            onmousedown: |_| { win.drag(); },
            a {
                class: "minimize",
                // 使用 cancel_bubble 拦截默认事件处理，因为我们需要全局绑定 drag
                onmousedown: |e| { e.cancel_bubble(); },
                onclick: move |_| { win.set_minimized() },
                "最小化"
            }
            a {
                class: "close",
                onmousedown: |e| { e.cancel_bubble(); },
                onclick: move |_| { win.close() },
                "关闭"
            }
        }
    })
}
```