import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "轻松布局",
    description: (
      <>使用特定的 RSX 格式来轻松布局您的UI页面。它比 HTML 更加简洁易读。</>
    ),
  },
  {
    title: "组件封装",
    description: (
      <>通过封装组件管理其内部的状态信息，并将多个组件组合成复杂的UI程序。</>
    ),
  },
  {
    title: "多平台支持",
    description: (
      <>组件和 Hooks 可以被同时用于 WEB、桌面、移动设备、服务器等平台应用！</>
    ),
  },
  {
    title: "并发与异步",
    description: <>对异步、数据传输和可暂停的协程的一流支持。</>,
  },
  {
    title: "静态类型",
    description: <>全局的静态类型支持，使得调试更加容易！</>
  },
  {
    title: "编译检查",
    description: <>基于 Rust 强大的编译检查，将各类错误杜绝在外。</>
  }
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
