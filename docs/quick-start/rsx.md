---
id: rsx
title: RSX格式
---

这一章我们讲解一下 `RSX!` 的基本使用方法。

我们先准备一个略微复杂的 HTML 结构，然后尝试用 RSX 表达它：

```html
<div style="text-align:center;">
    <h1>Hello Dioxus</h1>
    <a href="https://www.dioxus.cn">Dioxus 中文网</a>
    <p class="content">帮助您快速构建可靠的用户界面程序。</p>
</div>
```

这段 HTML 看起来还算复杂吧，那我们尝试转换一下它：
```rsx
rsx! {
    div {
        style: "text-align:center;",
        h1 { "Hello Dioxus" }
        a {
            href: "https://www.dioxus.cn/",
            "Dioxus 中文网"
        }
        p {
            class: "content",
            "帮助您快速构建可靠的用户界面程序。"
        }
    }
}
```

细品一下吧，你大概已经明白 RSX 怎么编写了吧！是不是看起来比 HTML 舒服多了。

:::info
先声明元素各类属性（如 `style` `id` `class` `href`）等，再声明子元素。    
可以使用 `[]`、`()`、`{}` 中的任意一种调用`rsx!`宏。    
参数后需要带逗号，而子元素则无所谓。
:::

### 自定义属性

在上面的例子中，我们使用到了 `style` `class` `href` 等常用属性，它们都被 Dioxus 定义在了内部。
但是如果我们需要用的某个属性并不是 HTML 规则中存在的，而是自定义的，如：

```html
<div dioxus-data="10">Hello World</div>
```

那我们在编写时则需要为它打上双引号：
```rsx
rsx! {
    div {
        "dioxus-data": "10",
        "Hello World"
    }
}
```
其实所有属性都可以被双引号包裹，但是为了代码提示工具能检查出异常，常用的可属性也可不加。