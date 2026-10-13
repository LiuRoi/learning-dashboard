# 提示词工程与结构化输出<no value>

tool_calls 本身就是最可靠的结构化输出：与其在 prompt 里求模型「请输出 JSON」，不如用 schema 约束。需要非工具类结构化输出时才轮到 JSON Mode。

{{< checklist >}}
