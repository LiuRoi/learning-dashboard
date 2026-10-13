---
title: "AI Agent 核心知识速览"
slug: "ai-agent-basics"
description: "从定义、核心循环到工具调用与 ReAct，快速建立对 AI Agent 的整体认知，并附带可直接运行的最小案例。"
summary: "Agent = LLM + 工具 + 循环。本文梳理核心概念与最小可用案例，帮你快速入门。"
date: 2026-10-13T10:00:00+08:00
lastmod: 2026-10-13T10:00:00+08:00
draft: false
weight: 10
categories: ["AI"]
tags: ["Agent", "LLM", "Function Calling"]
contributors: []
pinned: true
homepage: false
params:
  seo:
    title: ""
    description: ""
    canonical: ""
    robots: ""
---

最近在整理 Agent 相关的知识，把最核心的部分浓缩成一篇，方便快速回顾。

## 一、什么是 Agent

一句话定义：**Agent = LLM + 工具 + 循环**。

- **LLM**：负责理解意图、规划步骤、生成动作；
- **工具（Tools）**：让模型能够查数据库、调接口、执行代码，突破"只会生成文字"的限制；
- **循环（Loop）**：执行 → 观察结果 → 再决定下一步，直到任务完成。

普通对话是一问一答，Agent 则是"目标 → 行动 → 反馈 → 再行动"的自主闭环。

## 二、核心循环

Agent 的运行可以抽象为四步：

1. **感知**：接收用户目标与环境反馈（工具返回结果）；
2. **规划**：拆解任务，决定下一步调用哪个工具、传什么参数；
3. **行动**：执行工具调用；
4. **观察**：把执行结果重新塞回上下文，进入下一轮循环。

循环的终止条件通常是：任务完成、达到最大轮次、或模型判断无法继续。

## 三、案例示范

### 案例 1：工具调用（Function Calling）

```python
import json

TOOLS = [{
    "name": "get_weather",
    "description": "查询指定城市的当前天气",
    "parameters": {
        "type": "object",
        "properties": {"city": {"type": "string"}},
        "required": ["city"],
    },
}]

def chat(messages):
    # 返回 tool_calls 时，执行函数并把结果回填，再调一次模型
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        tools=TOOLS,
    )
    msg = resp.choices[0].message
    if msg.tool_calls:
        call = msg.tool_calls[0]
        args = json.loads(call.function.arguments)
        result = get_weather(**args)            # 真正执行
        messages.append(msg)
        messages.append({                        # 把结果交给模型
            "role": "tool",
            "tool_call_id": call.id,
            "content": json.dumps(result, ensure_ascii=False),
        })
        return chat(messages)                    # 进入下一轮循环
    return msg.content
```

关键点：**工具结果必须以 `tool` 角色回填**，否则模型看不到执行结果，循环断裂。

### 案例 2：ReAct 模式

ReAct = Reasoning + Acting，让模型先输出思考再行动：

```
Thought: 用户问北京明天的天气，我需要先调用天气接口。
Action: get_weather(city="北京")
Observation: {"temp": "12°C", "weather": "晴"}
Thought: 已拿到结果，可以直接回答用户。
Answer: 北京明天晴，气温 12°C 左右。
```

它的价值在于：思考过程外显，便于调试与追责；出错时能从 `Observation` 直接纠正。

## 四、常见误区

- **误区一：Agent 越复杂越好** —— 能一次调用解决的，不要拆成三轮循环，延迟和成本都会叠加。
- **误区二：把规划全交给模型** —— 关键约束（权限、格式、轮次上限）应在代码层兜底。
- **误区三：忽略失败处理** —— 工具超时、参数非法是常态，要有重试与降级策略。

## 小结

抓住"工具 + 循环"这条主线，Agent 就不再神秘。下一篇我会把开发一个 Agent 的完整步骤整理成可复用的知识文档。
