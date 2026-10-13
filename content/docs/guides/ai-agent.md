---
title: "AI Agent 开发指南"
slug: "ai-agent"
description: "沉淀 AI Agent 开发的可复用知识：核心概念、开发步骤、最小代码示例与常见问题排查清单。"
summary: ""
date: 2026-10-13T10:00:00+08:00
lastmod: 2026-10-13T10:00:00+08:00
draft: false
weight: 10
toc: true
params:
  math: false
  seo:
    title: ""
    description: ""
    canonical: ""
    robots: ""
---

本文是 Agent 开发的知识文档，定位是"可复用的操作手册"，配套阅读[博客文章《AI Agent 核心知识速览》](/blog/ai-agent-basics/)。

## 概念速查

| 概念 | 说明 |
| --- | --- |
| Tool | 模型可调用的函数，需声明名称、描述与参数 JSON Schema |
| Tool Call | 模型输出的调用意图，包含函数名与参数 |
| Loop | 执行工具 → 回填结果 → 再次推理的循环 |
| Trajectory | 一次任务中完整的「思考-行动-观察」轨迹，用于调试 |
| Max Turns | 循环上限，防止失控调用与费用爆炸 |

## 开发步骤

1. **定义工具**：写清 `description` 与参数 schema，模型对工具的理解 90% 来自描述；
2. **接入模型**：把系统提示词、历史消息、工具列表一起传给模型；
3. **分发调用**：拿到 `tool_calls` 后做参数校验，再真正执行；
4. **回填结果**：以 `tool` 角色写回上下文，携带对应的 `tool_call_id`；
5. **循环与终止**：无调用即结束，同时设置最大轮次与超时兜底；
6. **观测**：记录完整 Trajectory，出问题先看轨迹再改提示词。

## 最小示例

```python
def run_agent(goal: str, max_turns: int = 5) -> str:
    messages = [{"role": "user", "content": goal}]
    for _ in range(max_turns):
        msg = call_model(messages, tools=TOOLS)
        if not msg.tool_calls:
            return msg.content                      # 任务完成
        messages.append(msg)
        for call in msg.tool_calls:
            output = dispatch(call)                 # 校验 + 执行
            messages.append({
                "role": "tool",
                "tool_call_id": call.id,
                "content": str(output),
            })
    return "已达到最大轮次，任务未完成"
```

## 检查清单

- [ ] 工具描述里写清了"什么时候该用 / 不该用"；
- [ ] 所有工具调用都在代码层做了参数校验；
- [ ] 设置了 `max_turns` 与单步超时；
- [ ] 工具异常有降级返回值，不会让整个循环崩溃；
- [ ] 整条 Trajectory 有日志可回溯。

## 常见问题

**Q：模型反复调用同一个工具？**
A：通常是结果里缺少"已完成"的信号。在工具返回中明确状态，并在提示词里说明不要重复调用。

**Q：工具参数经常缺字段？**
A：把 `required` 列全，并在描述中给出取值示例；必要时在代码层做默认值填充。

**Q：循环停不下来？**
A：强制设置 `max_turns`，并在系统提示词中定义明确的结束条件。
