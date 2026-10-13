# Agent 基础：裸写 ReAct 主循环<no value>

用户消息 → LLM（无状态纯函数）→ 返回结构化 tool_calls → 代码执行工具 → 结果回喂，循环往复直到模型不再请求工具或触发 max_turns 熔断。所谓「记忆」就是 messages 数组本身；循环的退出条件是业务设计出来的，不是模型自带的。

{{< checklist >}}
