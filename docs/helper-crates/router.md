---
id: router
title: Router
---

Dioxus Router 用于在不同界面之间进行跳转显示。如果你熟悉 React Router，那 Dioxus Router 你也能很快上手。

## 创建简单路由

:::info
引入 Router

```toml
[dependencies]
dioxus = { version = "0.2.4", features = ["desktop", "router"] }
```

:::

首先创建一个 homepage 界面。

```rust
fn homepage(cx: Scope) -> Element {
    cx.render(rsx! {
        p { "Welcome to Dioxus Blog!" }
    })
}
```

然后使用 `Router` 创建路由入口。

```rust
fn app(cx: Scope) -> Element {
    cx.render(rsx! {
        Router {
            p { "-- Welcome Dioxus --" }
            navbar{}
            Route { to: "/", self::homepage {}} // 把 homepage 组件挂载到路由上
            Route{ to:"/blog",self::blog{}}
            Route { to:"", self::not_found{}} // 用来返回匹配路由失败的情况 || Redirect{from:"",to:"/"}
        }
    })
}
```

如果要实现页面的跳转，你需要 `Link` 标签来实现。

```rust
fn navbar(cx: Scope) -> Element {
    cx.render(rsx! {
        ul {
            Link { to: "/", "Home"}
            br {}
            Link { to: "/blog", "Blog"}
        }
    })
}
```

:::info
跳转外链可以使用 `Link { to: "https://github.com", external: true, "GitHub"}`。
:::

## 参数路由

使用带有参数的路由只需要使用`:`加上参数即可：

```rust
Route { to: "/:post", self::blog_post {} } 
```

### 获取路由参数

首先使用`use_route()`来获取路由实例，

```rust
fn blog_post(cx: Scope) -> Element {
    let route = use_route(&cx);

    let blog_text = match route.segment("post") {
        Some(val) => format!("post content {}",val),
        None => "An unknown error occured".to_string(),
    };
    cx.render(rsx! {
        p { "{blog_text}" }
    })
}
```

## 嵌套路由

可以直接在`Route`中套娃以实现嵌套路由，这里实现的路由是`/blog/:post`。

```rust
fn app(cx: Scope) -> Element {
    cx.render(rsx! {
        Router {
            p { "-- Dioxus Blog --" }
            self::navbar {}
            Route { to: "/", self::homepage {}}
            Route { 
                to: "/blog",
                Route { to: "/:post", self::blog_post {} }
            }
            Route { to: "", self::not_found {}}
        }
    })
}
```

## 重定向

使用`Redirect`加 url 路径即可实现路由重定向。

```rust
fn not_found(cx: Scope) -> Element {
    cx.render(rsx! {
        Redirect{to:"/"} // 重定向到首页面
    })
}
```