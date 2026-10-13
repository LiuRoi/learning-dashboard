# 多 Agent 协作与编排<no value>

多 Agent 的本质是多个 while 循环共享消息总线。协作引入的新问题：失败如何跨 Agent 传递、上下文如何在接力时裁剪、总轮次如何熔断。

{{< checklist >}}
