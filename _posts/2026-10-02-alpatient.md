---
layout: post
title: "AIPatient：基于多智能体Reasoning RAG的AI标准化病人系统"
description: "利用LLM驱动的6个智能体与知识图谱，构建可模拟真实患者的AI标准化病人系统，EHR问答准确率达94.15%"
keywords: AIPatient, LLM, RAG, 知识图谱, 医学教育, 智能体
categories: [论文]
tags: [综述, 论文]
---

作者做了个叫 **AIPatient** 的"AI 标准化病人"：把 MIMIC-III 真实出院小结用 LLM 做 NER 抽成知识图谱（Neo4j），再用 **6 个 LLM 智能体 + Reasoning RAG**（带推理与自检的检索增强生成）来回答医学生的提问，并能按 32 种人格设定改变说话风格。结果：EHR 问答准确率 **94.15%**、知识库 F1 = **0.89**、可读性约美国 6 年级水平、与真人标准化病人（H-SP）对比"不劣甚至在情感真实感上更好"。


为什么要实现AIPatient, 之前方案在有效性与可信度方面问题：
- 缺乏规模打、内容全面且类型多样的患者档案数据库
- 需要事实核查机制以最大程度减少幻觉并保证一致性
- 周期呈现不同人格仿方面的灵活性不足
- 缺乏完善的评估框架

AIPatient， 由大预言模型驱动的智能体构成的模拟患者系统。
融合了现金的智能体工作流--推理增强检索生成(Reasoning RAG)， 以及可靠的只是输入来源--AIPatient只是图谱(AIPatient KG)。

### Data
我们基于重症监护医学信息库（MIMIC）-III 数据库中的1500份抽样患者病历创建患者档案，该数据库包含去标识化的真实患者电子健康记录（补充表1）。此数据的使用已获得PhysioNet临床数据库的授权，允许持证人员访问。
基于主要诊断层进行分层抽样后，病历样本准确反映了 MIMIC-III 中主要诊断类别的多样性（补充图2）。在电子健康记录中，我们重点关注患者信息表、入院信息表、生命体征表中的结构化数据子集，以及出院小结中的非结构化数据。

### AIPatient 多智能体Reasoning RAG工作流

![AIPatient多智能体Reasoning RAG工作流](/images/papers/alpatient-workflow.png)

> ⚠️ 请将 Obsidian 中的 `Pasted image 20261002193353.png` 复制到 `images/papers/alpatient-workflow.png`
