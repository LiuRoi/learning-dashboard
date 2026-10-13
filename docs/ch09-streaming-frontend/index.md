# 流式前端：SSE × Agent 闭环<no value>

DeepSeek 流式下思维链在 delta.reasoning_content，与 content 是两条通道，前端要分开渲染。AbortController 取消 pending 请求防止串流，与 max_turns 熔断是同一件事在两端的表达。

{{< checklist >}}
