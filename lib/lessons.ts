export interface Lesson {
  id: string;
  module: string;
  title: string;
  description: string;
  content: string;
  hasChat: boolean;
  hasPlayground: boolean;
  type: 'lesson' | 'project';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  prerequisites: string[];
  tags: string[];
  quizId?: string;
  projectId?: string;
}

export const lessons: Lesson[] = [
  {
    id: "1-1",
    module: "第一章：什么是 Vibe Coding",
    title: "编程是什么",
    description: "不需要害怕，编程就是让电脑帮你做事",
    content: `
## 编程是什么？

想象一下，你有一个非常听话但有点笨的助手。他会严格按照你说的每一个字去做事，不会多也不会少。

**编程，就是学会用电脑能听懂的语言，告诉它帮你做什么。**

### 传统编程 vs Vibe Coding

| 传统编程 | Vibe Coding |
|---------|-------------|
| 你要学会复杂的语法规则 | 你用自然语言描述想法 |
| 一行一行手写代码 | AI 帮你生成代码 |
| 查资料、Debug 很久 | AI 帮你发现和修复问题 |
| 几个月才能做个小项目 | 几小时就能做出成果 |

### 核心思想

> "我不会写代码，但我能清楚地描述我想要什么。"

这就是 Vibe Coding 的精髓。你不需要成为专业的程序员，只需要学会**如何和 AI 沟通**。

### 你能做什么？

- 个人博客/网站
- 小游戏
- 数据分析工具
- 自动化脚本
- 手机 App
- 甚至复杂的软件

**下一课：AI 能帮我们做什么？**
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 8,
    prerequisites: [],
    tags: ['概念'],
  },
  {
    id: "1-2",
    module: "第一章：什么是 Vibe Coding",
    title: "AI 能帮我们做什么",
    description: "了解 AI 编程助手的能力边界",
    content: `
## AI 能帮我们做什么？

AI 就像一个**超级聪明的编程搭档**，但它不是万能的。

### AI 擅长的

1. **写代码** — 你描述功能，AI 生成代码
2. **解释代码** — 看不懂的代码让 AI 解释
3. **找 Bug** — 报错信息发给 AI，它帮你分析
4. **优化代码** — 让代码更快、更简洁
5. **翻译语言** — "把这段 Python 改成 JavaScript"

### AI 不擅长的

1. **知道你的真实需求** — 你必须说清楚想要什么
2. **做最终决定** — 你需要判断代码是否正确
3. **理解复杂业务逻辑** — 行业知识需要你提供
4. **保证 100% 正确** — AI 也会犯错，你要会检查

### 正确的心态

把 AI 当作：**一个能力很强但需要详细指导的实习生**。

- 你不会对一个实习生说"做个网站"就不管了
- 你会告诉他：做什么网站、给谁看、长什么样、有什么功能
- 你会检查他的工作，发现问题及时纠正

**这就是你和 AI 合作的方式。**
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 8,
    prerequisites: [],
    tags: ['概念'],
  },
  {
    id: "1-3",
    module: "第一章：什么是 Vibe Coding",
    title: "什么是 Vibe Coding",
    description: "进入心流状态，让创意自然流淌",
    content: `
## 什么是 Vibe Coding？

"Vibe" 是氛围、感觉的意思。Vibe Coding 就是：

> **你专注于描述想法，AI 负责实现，整个过程像聊天一样自然流畅。**

### 为什么叫 Vibe Coding？

因为最好的创作状态是"心流"（Flow）——你完全沉浸在创造中，不被技术细节打断。

传统编程经常被打断：
- 这个语法怎么写？→ 查资料 → 打断
- 这里报错了！→ Debug → 打断
- 这个功能怎么实现？→ 搜索 → 打断

Vibe Coding：
- 你想到了一个功能 → 告诉 AI → AI 写出来 → 你继续下一个想法

### Vibe Coding 的步骤

1. **想** — 脑中有画面："我想要一个..."
2. **说** — 描述给 AI："帮我做一个个人主页，左边是头像..."
3. **看** — AI 生成代码和预览
4. **改** — 不满意就说："颜色太亮了，换成深色"
5. **重复** — 直到满意

### 关键能力

Vibe Coding 考验的不是写代码能力，而是：

- **描述能力** — 能否清楚表达想法
- **判断能力** — 能否看出结果对不对
- **迭代能力** — 能否一步步优化

**恭喜你！第一章学完了。现在你已经知道 Vibe Coding 是什么了。**
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 8,
    prerequisites: [],
    tags: ['概念'],
  },
  {
    id: "2-1",
    module: "第二章：如何和 AI 对话",
    title: "描述你的需求",
    description: "好的描述 = 好的结果",
    content: `
## 描述你的需求

和 AI 对话就像点菜。你说得越清楚，得到的越接近你想要。

### 不好的描述 ❌

- "帮我做个网站"
- "写个游戏"
- "这个不对，改一下"

### 好的描述 ✅

- "帮我做一个个人介绍网页，顶部是我的名字'小明'，中间放一段 100 字的自我介绍，底部放邮箱和微信二维码"
- "写一个猜数字游戏，范围 1-100，玩家有 7 次机会，每次猜测后告诉玩家是大了还是小了"
- "请把标题的字号从 24px 改成 32px，颜色从黑色改成深蓝色 #1e40af"

### 描述的公式

\`\`\`
我要做 [什么]
给 [谁] 用的
需要包含 [具体功能1]、[具体功能2]
风格要 [描述风格]
\`\`\`

**例子：**

> 我要做一个番茄钟网页工具，给需要专注学习的学生用。需要包含：25 分钟倒计时、开始/暂停按钮、一个任务输入框显示当前在做什么、完成后播放提示音。风格要简洁清新，主色调用绿色。

### 练习

试着用上面的公式，描述你想要做的东西。
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 10,
    prerequisites: ['1-1', '1-2'],
    tags: ['概念'],
  },
  {
    id: "2-2",
    module: "第二章：如何和 AI 对话",
    title: "给出具体例子",
    description: "例子比抽象描述更有力",
    content: `
## 给出具体例子

如果你说不清楚，就**举例子**。

### 为什么例子很重要？

AI 很聪明，但它不是你肚子里的蛔虫。例子能消除歧义。

### 举个例子

❌ 抽象："页面要好看一点"
✅ 具体："参考苹果官网的风格，大量留白，大图配简短文字，导航栏固定在顶部半透明"

❌ 抽象："按钮要明显"
✅ 具体："按钮用圆角矩形，背景色 #3b82f6（蓝色），文字白色，鼠标放上去时颜色变深"

### 使用参考

你可以给 AI 参考：

1. **图片** — "做成类似这张图的样子"（上传截图）
2. **网址** — "布局参考 https://example.com"
3. **具体数据** — "这里显示的价格是 ¥199，不要写死，要可以改"
4. **代码片段** — "这段代码要改成用 for 循环而不是 while"

### 公式升级版

\`\`\`
我要做 [什么]
类似 [参考/例子]
需要 [功能列表]
注意 [特殊要求]
\`\`\`

**例子：**

> 我要做一个待办事项列表，类似微软 Todo 的界面。需要：输入框添加任务、点击完成打勾、删除任务、筛选全部/进行中/已完成。注意：已完成的事项要灰色显示并加删除线，界面要支持中文。
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 10,
    prerequisites: ['1-3'],
    tags: ['技巧'],
  },
  {
    id: "2-3",
    module: "第二章：如何和 AI 对话",
    title: "一步步来",
    description: "不要一次要求太多，分步实现",
    content: `
## 一步步来

新手常犯的错误：一次性让 AI 做太多。

### 为什么不要一次做太多？

1. AI 一次生成的代码太长，你看不过来
2. 出问题了你不知道是哪一部分
3. 改一个地方可能影响其他地方

### 正确的节奏

把大项目拆成小步骤：

\`\`\`
第一步：先做出最基础的版本
第二步：加上第一个功能
第三步：加上第二个功能
第四步：美化样式
第五步：测试和修复问题
\`\`\`

### 实战例子：做一个计算器

**不要这样说：**
> 帮我做一个科学计算器，支持加减乘除、括号、三角函数、历史记录、错误提示、键盘输入，界面要好看。

**要这样说：**

第一步：
> 先做一个最简单的计算器网页，只有两个输入框和一个"计算"按钮，点击后显示加法结果。

第二步：
> 很好，现在把加法改成支持加减乘除，用下拉菜单选择运算符。

第三步：
> 加上错误处理，如果用户输入的不是数字，提示"请输入数字"。

第四步：
> 美化界面，让计算器居中显示，按钮大一点，配色用蓝色系。

### 好处

- 每一步你都能看懂
- 出错了只回退一步
- 成就感一点一点来
- 随时可以暂停，已经做出的部分能用

**记住：慢就是快。**
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 12,
    prerequisites: ['2-1'],
    tags: ['技巧'],
  },
  {
    id: "3-1",
    module: "第三章：动手实践",
    title: "创建一个网页",
    description: "打开右侧 playground，开始你的第一次 vibe coding",
    content: `
## 动手：创建一个网页

理论知识够了，现在来真的！

### 任务

在右侧的 **Prompt Playground** 中，输入你的描述，让 AI 生成一个网页。

### 建议的题目（选一个）

1. **个人名片页**
   - 你的名字
   - 一句话介绍
   - 联系方式
   - 一张头像

2. **倒计时页面**
   - 显示距离某个日期还有多久
   - 自动更新
   - 简单好看

3. **颜色展示板**
   - 显示 6 个你喜欢的颜色
   - 每个颜色显示色值
   - 点击可以复制色值

### 怎么使用 Playground

1. 在输入框里描述你想要什么
2. 点击"生成"按钮
3. 等待 AI 返回代码
4. 代码会在下方显示
5. 你可以复制代码，粘贴到本地的 HTML 文件里打开看效果

### 小贴士

- 从最简单的开始
- 不满意就修改描述再试一次
- 每次只加一个新功能
- 如果生成的代码看不懂，可以问 AI："请解释这段代码"

### 下一步

生成代码后，看看效果如何。下一课我们学习怎么修改和优化。
`,
    hasChat: false,
    hasPlayground: true,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 10,
    prerequisites: ['2-2'],
    tags: ['技巧'],
  },
  {
    id: "3-2",
    module: "第三章：动手实践",
    title: "修改和优化",
    description: "迭代是 Vibe Coding 的核心",
    content: `
## 修改和优化

第一次生成的结果很少完美。没关系，改就行了！

### 迭代的艺术

Vibe Coding 的核心就是**快速迭代**：

1. 生成第一版
2. 看效果
3. 告诉 AI 哪里不对
4. 生成改进版
5. 重复直到满意

### 常见的修改指令

**改样式：**
- "背景色换成深蓝色"
- "字体太小了，改成 18px"
- "按钮圆角太大，改成 4px"
- "参考苹果官网的简洁风格"

**改功能：**
- "加一个搜索框"
- "点击按钮后弹出确认对话框"
- "这个列表要支持拖拽排序"
- "加上本地保存功能，刷新页面数据不丢"

**改结构：**
- "把左右布局改成上下布局"
- "导航栏固定在顶部"
- "内容区域最大宽度 800px，居中"

### 对话示例

**你：** 帮我做一个待办清单

**AI：** [生成代码]

**你：** 很好，但是完成的任务不要删除，用删除线划掉

**AI：** [修改代码]

**你：** 再加一个筛选功能，可以只看已完成或未完成

**AI：** [修改代码]

**你：** 颜色太鲜艳了，整体换成莫兰迪色系

**AI：** [修改代码]

### 注意

每次修改时，**把完整的上下文提供给 AI**：
- 如果对话很长，AI 可能已经忘了最初的代码
- 你可以说："基于刚才的代码，再修改..."
- 或者把当前代码粘贴回去，然后说："在这段代码基础上，增加..."

**去 Playground 练习吧！**
`,
    hasChat: false,
    hasPlayground: true,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 15,
    prerequisites: ['2-3'],
    tags: ['实践'],
  },
  {
    id: "3-3",
    module: "第三章：动手实践",
    title: "保存你的代码",
    description: "学会管理和备份你的作品",
    content: `
## 保存你的代码

代码在浏览器里，刷新就没了！要学会保存。

### 方法一：本地文件

1. 在电脑上新建一个文件夹，比如 "my-projects"
2. 在文件夹里新建文本文件，改后缀为 ".html"
3. 把 AI 生成的代码复制进去
4. 双击文件，浏览器就会打开

### 方法二：使用在线工具

- **CodePen** (codepen.io) — 在线写代码，立即看到效果
- **JSFiddle** (jsfiddle.net) — 适合快速测试
- **StackBlitz** (stackblitz.com) — 支持完整项目

### 方法三：使用 GitHub

这是专业开发者的方式：

1. 注册 GitHub 账号
2. 创建新仓库（Repository）
3. 上传你的代码文件
4. 开启 GitHub Pages，免费获得一个网站地址

**好处：**
- 代码永远不会丢失
- 可以分享给别人看
- 记录每次修改历史
- 展示给面试官看

### 小贴士

- 每次有重大进展就保存一次
- 文件命名要有意义，比如 "todo-app-v1.html"
- 写一个简单的 README 说明这是什么项目

**下一章：进阶技巧！**
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 12,
    prerequisites: ['3-1'],
    tags: ['实践'],
  },
  {
    id: "4-1",
    module: "第四章：进阶技巧",
    title: "当 AI 犯错时怎么办",
    description: "AI 不是万能的，学会处理错误",
    content: `
## 当 AI 犯错时怎么办

AI 会犯错，这很正常。关键是你知道怎么处理。

### AI 常犯的错误

1. **幻觉** — 编出不存在的功能或 API
2. **过时知识** — 某些库的版本已经变了
3. **理解偏差** — 没get到你的真实需求
4. **代码错误** — 语法错误或逻辑错误
5. **不完整** — 代码写到一半断了

### 解决方法

**1. 把错误信息贴给 AI**

> "运行后报错：Uncaught TypeError: Cannot read property..."

AI 通常能根据报错信息修复。

**2. 提供更明确的约束**

> "请使用纯 HTML/CSS/JS，不要用任何框架"
> "必须兼容手机浏览器"
> "数据要保存在浏览器本地存储里"

**3. 缩小问题范围**

> "不用重写全部，只改第 15-20 行的函数"
> "其他部分没问题，只修复搜索功能"

**4. 换种方式描述**

如果 AI 一直理解错，换个说法：

> 不要说："按钮要点了有用"
> 要说："点击提交按钮后，检查输入框是否为空，如果为空就提示'请填写内容'，否则显示'提交成功'"

**5. 自己先尝试理解**

看 AI 给的代码，试着理解逻辑。即使不懂语法，也能看出明显的问题：
- 数字明显不对（比如颜色值 #999999 写成了 #99999）
- 文字内容错了
- 少了一个按钮

### 心态调整

- 把错误当作学习机会
- 每次 Debug 你都会更懂一点代码
- 记录常见错误，下次遇到就知道怎么解决
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'intermediate' as const,
    estimatedMinutes: 12,
    prerequisites: ['3-2'],
    tags: ['实践', '工具'],
  },
  {
    id: "4-2",
    module: "第四章：进阶技巧",
    title: "如何继续对话",
    description: "让 AI 记住上下文，保持连贯",
    content: `
## 如何继续对话

和 AI 的对话有长度限制，长对话可能会被"截断"。

### 上下文窗口

AI 能记住的最近内容有限（几万到几十万字）。如果对话太长，它可能会"忘记"最开始的设定。

### 保持连贯的技巧

**1. 定期总结**

长对话后，你可以：

> "请总结一下我们目前做的是什么项目，完成了哪些功能，还有哪些待完成？"

然后新开一个对话，把总结贴进去：

> "我们正在做一个待办事项应用，已完成：添加任务、标记完成、删除任务。待完成：本地保存、筛选功能。这是当前代码：[粘贴代码]。现在请继续完成本地保存功能。"

**2. 保存关键代码**

把当前完整的代码保存在一个文件里。每次对话时：

> "基于以下代码，请添加 [新功能]：[粘贴代码]"

**3. 使用系统提示**

有些工具允许设置"系统提示"，给 AI 一个固定的角色设定：

> "你是一位耐心的前端开发老师，正在帮一个零基础学生做项目。当前项目是：个人博客网站。技术栈：HTML/CSS/JS。"

**4. 模块化思考**

把项目拆成独立的小文件：
- index.html — 页面结构
- style.css — 样式
- app.js — 功能逻辑

这样每次只修改一个文件，对话更短更清晰。

### 工具推荐

- **Claude.ai** — 上下文很长，适合大项目
- **ChatGPT** — GPT-4 代码能力不错
- **Cursor** — 专为编程设计的 AI 编辑器
- **GitHub Copilot** — 在编辑器里实时补全代码
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'intermediate' as const,
    estimatedMinutes: 12,
    prerequisites: ['3-3'],
    tags: ['技巧'],
  },
  {
    id: "4-3",
    module: "第四章：进阶技巧",
    title: "做出你的作品",
    description: "从学习到创造，完成你的第一个项目",
    content: `
## 做出你的作品

学完这些，你已经可以做自己的项目了！

### 项目选题建议

**入门级：**
- 个人简历网页
- 计算器
- 待办清单
- 天气预报展示（静态数据）

**进阶级：**
- 记账本
- 小游戏（猜数字、2048、打砖块）
- 读书笔记管理
- 健身打卡记录

### 开发流程

1. **确定目标** — 你要做什么？给谁用？
2. **画出草图** — 用纸笔画出页面大概样子
3. **描述给 AI** — 用学到的技巧，详细描述需求
4. **迭代优化** — 一步步加功能、改样式
5. **测试** — 在不同设备上打开看看
6. **发布** — 用 GitHub Pages 或 Vercel 发布到网上

### 保持学习的习惯

- **每天做一点点** — 15 分钟比 0 分钟好
- **保存所有项目** — 即使很粗糙也是你的成长记录
- **加入社区** — 和朋友交流，互相给建议
- **分享你的作品** — 教别人是最好的学习方式

### 记住这些原则

1. **先完成，再完美** — 能用的烂作品比做不出来的好作品强
2. **遇到问题问 AI** — 这就是 Vibe Coding 的意义
3. **不懂就问** — 没有愚蠢的问题，只有没问出口的问题
4. **享受过程** — 创造的乐趣比结果更重要

---

## 恭喜你！

你已经完成了 Vibe Coding 入门课程。

现在，打开 Playground，或者打开你喜欢的 AI 工具，开始创造属于你的作品吧！

**The best way to learn is to build.**
`,
    hasChat: true,
    hasPlayground: true,
    type: 'lesson' as const,
    difficulty: 'intermediate' as const,
    estimatedMinutes: 15,
    prerequisites: ['4-2'],
    tags: ['实践', '项目'],
  },
  // ====== 第五章 ======
  {
    id: "5-1",
    module: "第五章：工具与准备工作",
    title: "AI 工具对比与选择",
    description: "Claude、ChatGPT、Cursor、Copilot 各有千秋，选对工具事半功倍",
    content: `
## AI 工具对比与选择

市面上的 AI 编程工具很多，选哪个好？别急，看完这一课你就清楚了。

### 四大主流工具

| 工具 | 适合人群 | 特点 | 价格 |
|------|---------|------|------|
| **Claude** | 零基础/初学者 | 对话最自然，代码质量高，解释详细 | 免费额度 + \$20/月 |
| **ChatGPT** | 零基础/初学者 | 用户最多，插件丰富，社区活跃 | 免费额度 + \$20/月 |
| **Cursor** | 进阶用户 | 专为编程设计的编辑器，AI 深度集成 | 免费额度 + \$20/月 |
| **GitHub Copilot** | 开发者 | 在 VS Code 里实时补全代码 | 免费额度 + \$10/月 |

### 我的推荐

**如果你是第一次接触编程**：用 Claude 或 ChatGPT 的网页版就够了。不需要安装任何软件，打开浏览器就能用。

**如果你想更深入学习**：下载 Cursor，它是基于 VS Code 的 AI 编辑器，能直接编辑项目文件。

### 常见误区

> "贵的工具一定更好？"——不一定。对于 Vibe Coding 入门来说，免费额度的工具已经足够。关键是学会描述需求，而不是工具本身。

### 要点总结

- 初学者推荐 Claude 或 ChatGPT 网页版，零门槛
- Cursor 和 Copilot 更适合有一定基础后使用
- 所有工具都有免费额度，先免费试用再决定是否付费
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 10,
    prerequisites: ['4-3'],
    tags: ['工具'],
  },
  {
    id: "5-2",
    module: "第五章：工具与准备工作",
    title: "注册与第一次对话",
    description: "从注册账号到发出第一条指令，一步步带你上手",
    content: `
## 注册与第一次对话

光说不练假把式，这节课我们来实际操作。

### 注册 Claude 账号

1. 打开 https://claude.ai
2. 点击 "Sign Up" 注册账号（可以用 Google 账号或邮箱）
3. 验证邮箱后登录
4. 进入对话界面

### 你的第一次对话

在输入框里输入你的第一条指令：

> 你好！我想学习编程，但我完全没有基础。你能告诉我应该从哪里开始吗？

按下发送键，AI 就会回复你了。

### 对话的基本结构

一条好的对话包含三个要素：

1. **角色设定**（可选）——"你是一位耐心的编程老师"
2. **背景信息**——"我完全零基础，想学前端开发"
3. **具体问题**——"请用大白话解释什么是 HTML"

### 现在就试试

打开你选择的 AI 工具，输入上面的示例对话，感受一下和 AI 交流的感觉。

### 常见误区

> "我英语不好，能学吗？"——完全没问题！Claude 和 ChatGPT 都支持中文对话。用中文描述你的需求，AI 能听懂。

### 要点总结

- 注册一个 AI 工具账号，选择免费版即可
- 第一次对话从简单的自我介绍开始
- 中文完全没问题，不需要英语基础
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 8,
    prerequisites: ['5-1'],
    tags: ['工具'],
  },
  {
    id: "5-3",
    module: "第五章：工具与准备工作",
    title: "文件与文件夹基础",
    description: "不懂编程也要会的文件管理知识",
    content: `
## 文件与文件夹基础

在做项目之前，你需要知道怎么管理文件。很简单，5 分钟学会。

### 什么是文件？

你在电脑上看到的一切都是文件：
- 照片（.jpg、.png）
- 文档（.docx、.pdf）
- 网页（.html）
- 代码（.js、.py、.ts）

文件名由两部分组成：**名称** + **扩展名**（点后面的部分）。扩展名告诉电脑这个文件是什么类型。

### 创建你的第一个 HTML 文件

1. 在桌面上新建一个文件夹，命名为 "my-first-project"
2. 打开文件夹，右键 → 新建 → 文本文档
3. 将文件名改为 "index.html"（注意是 .html 不是 .txt）
4. 右键这个文件 → 打开方式 → 记事本
5. 粘贴以下内容：

\`\`\`html
<!DOCTYPE html>
<html>
<head><title>我的第一个网页</title></head>
<body>
  <h1>Hello World！</h1>
  <p>这是我的第一个网页。</p>
</body>
</html>
\`\`\`

6. 保存文件（Ctrl+S）
7. 双击文件，浏览器会自动打开，看到你的第一个网页！

### 文件命名建议

- 用英文或拼音命名（中文可能在部分工具中出问题）
- 不要有空格（用 - 或 _ 代替，如 my-page.html）
- 名称要有意义（不要叫 "新建文件1"）

### 要点总结

- 文件扩展名决定了文件类型
- HTML 文件的扩展名是 .html
- 命名用英文，用 - 代替空格
- 建一个专门的文件夹存放你的所有项目
`,
    hasChat: false,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 10,
    prerequisites: ['5-2'],
    tags: ['工具'],
  },
  {
    id: "5-4",
    module: "第五章：工具与准备工作",
    title: "浏览器开发者工具入门",
    description: "按 F12 能看到什么？学会查看和调试代码效果",
    content: `
## 浏览器开发者工具入门

每个浏览器都有一套隐藏的"开发者工具"，是查看网页内部结构的神器。

### 打开开发者工具

- **Chrome/Edge**：按 F12，或右键页面 → 检查
- **Safari**：先在偏好设置中开启"开发"菜单，再按 Cmd+Option+I

### 你能看到什么？

打开后你会看到几个标签页：

1. **Elements（元素）**——网页的 HTML 结构，你可以实时修改文字和样式
2. **Console（控制台）**——显示 JavaScript 的日志和错误信息
3. **Sources（源代码）**——网页的原始文件
4. **Network（网络）**——网页加载了什么文件

### 实际用途

对 Vibe Coding 学习者来说，开发者工具最有用的功能是：

- **查看错误**：如果页面出问题，Console 里会有红色报错信息，把这信息发给 AI 帮你分析
- **临时修改**：在 Elements 里双击文字可以临时修改，刷新后恢复（用来测试想法）
- **调试代码**：AI 生成的代码跑不起来？打开 Console 看报错，粘贴给 AI

### 常见误区

> "开发者工具看起来好复杂，我是不是学不会？"——你不需要全部搞懂。现阶段只需要知道：打开 F12 → 找到 Console → 把红色的报错信息复制给 AI。

### 要点总结

- F12 打开开发者工具
- Console 标签页查看错误信息
- 报错信息发给 AI 帮你分析
- 现阶段会用 Console 就够了
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'intermediate' as const,
    estimatedMinutes: 12,
    prerequisites: ['5-3'],
    tags: ['工具'],
  },
  // ====== 第六章 ======
  {
    id: "6-1",
    module: "第六章：动手做项目",
    title: "做一个个人主页",
    description: "从零开始，构建属于你的个人名片网页",
    content: `
## 做一个个人主页

前面学了这么多理论，是时候动手了！第一个项目：做一个简单但好看的个人主页。

### 第一步：描述你的需求

打开 Playground 或你常用的 AI 工具，输入：

> 帮我做一个个人主页，要求：
> - 顶部是你的名字（大标题）
> - 中间是一段 100 字左右的自我介绍
> - 底部放你的联系方式（邮箱、GitHub）
> - 整体风格简洁清新，用白色背景 + 蓝色作为强调色
> - 需要适配手机屏幕

### 第二步：预览效果

1. 复制 AI 生成的代码
2. 粘贴到一个新的 HTML 文件
3. 双击打开，看看效果

### 第三步：迭代修改

不满意的地方直接告诉 AI：
- "背景改成浅灰色"
- "字体太大了，缩小一点"
- "在我名字下面加一句座右铭"
- "联系方式改成带图标的样式"

### 第四步：个性化

把你的真实信息填进去：
- 换上你自己的名字
- 写上真实的自我介绍
- 填入真实的联系方式

### 常见误区

> "AI 生成的代码我一行都看不懂，改不了。"——没关系！你不需要看懂代码。你只需要告诉 AI 你想改什么，AI 会帮你改。这就是 Vibe Coding 的核心！

### 要点总结

- 从清晰的描述开始
- 预览效果 → 提出修改 → 再次预览
- 用你自己的信息个性化
- 保存为 .html 文件，随时可以修改
`,
    hasChat: false,
    hasPlayground: true,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 15,
    prerequisites: ['5-4'],
    tags: ['实践', '项目'],
  },
  {
    id: "6-2",
    module: "第六章：动手做项目",
    title: "做一个待办清单",
    description: "学会创建有交互功能的网页应用",
    content: `
## 做一个待办清单

比静态网页更进一步——做一个能交互的待办清单。

### 核心功能

告诉 AI 你需要这些功能：
1. 输入框 + 添加按钮，输入任务后添加到列表
2. 点击任务标记为完成（加删除线）
3. 点击删除按钮移除任务
4. 显示还有多少任务未完成
5. 数据保存在浏览器本地（刷新不丢失）

### 推荐的 Prompt

> 帮我做一个待办清单网页，要求：
> - 顶部输入框和添加按钮
> - 列表显示所有任务
> - 点击任务可以标记完成（文字加删除线，颜色变灰）
> - 每个任务右边有删除按钮
> - 底部显示"还有 X 项未完成"
> - 使用 localStorage 保存数据，刷新页面数据还在
> - 简洁现代的设计风格
> - 所有代码放在一个 HTML 文件中

### 学到的技能

做完这个项目，你会掌握：
- 表单输入处理
- 列表的动态增删
- 数据持久化（localStorage）
- 状态管理的基本概念

### 进阶挑战

如果基础版做完了，试试增加这些功能：
- 双击任务可以编辑文字
- 添加任务分类标签
- 按完成状态筛选（全部/进行中/已完成）
- 添加截止日期功能

### 常见误区

> "越做越复杂，最后卡住了。"——建议先把基础功能做好，再逐步加功能。每次只加一个功能，确认能用后再加下一个。

### 要点总结

- 从基础功能开始，逐步迭代
- localStorage 让数据持久化存储
- 每次只加一个新功能
`,
    hasChat: false,
    hasPlayground: true,
    type: 'lesson' as const,
    difficulty: 'intermediate' as const,
    estimatedMinutes: 15,
    prerequisites: ['6-1'],
    tags: ['实践', '项目'],
  },
  {
    id: "6-3",
    module: "第六章：动手做项目",
    title: "做一个倒计时工具",
    description: "练习定时器、日期处理和界面更新",
    content: `
## 做一个倒计时工具

这个项目帮你理解时间和定时器的概念。

### 核心功能

告诉 AI 你需要：
1. 用户设定一个目标日期和时间
2. 实时显示距离目标还有多少天、小时、分钟、秒
3. 倒计时到达后显示提示文字
4. 好看的卡片式布局

### 推荐的 Prompt

> 帮我做一个倒计时网页，要求：
> - 用户可以输入目标日期和时间
> - 实时显示剩余的天、小时、分钟、秒（每秒更新）
> - 四个数字卡片分别显示天/时/分/秒
> - 到达目标时间后显示"时间到！"并有动画效果
> - 预设几个常用倒计时（比如元旦、春节）
> - 现代简洁设计，大数字显示

### 学到的技能

- 日期和时间的处理
- setInterval 定时器
- 实时界面更新
- CSS 动画效果

### 进阶挑战

- 添加多个倒计时同时显示
- 倒计时结束播放提示音
- 添加进度条显示百分比
- 可以给每个倒计时命名

### 常见误区

> "倒计时不准怎么办？"——浏览器中的倒计时可能有 1-2 秒的误差，这是正常的。如果需要精确到毫秒级别的计时，需要更复杂的技术，入门阶段不需要纠结。

### 要点总结

- setInterval 用于定时更新
- 日期计算注意时区和格式
- 定时器用完记得清理
`,
    hasChat: false,
    hasPlayground: true,
    type: 'lesson' as const,
    difficulty: 'intermediate' as const,
    estimatedMinutes: 12,
    prerequisites: ['6-2'],
    tags: ['实践', '项目'],
  },
  {
    id: "6-4",
    module: "第六章：动手做项目",
    title: "组合项目：个人作品集",
    description: "将之前的项目组合成一个作品集页面",
    content: `
## 组合项目：个人作品集

你已经完成了多个小项目，现在把它们整合到一个作品集页面里。

### 什么是作品集？

作品集就像一个在线展览馆，展示你做的所有项目。以后给别人看你的成果时，只需要发一个链接。

### 推荐的结构

告诉 AI：

> 帮我做一个个人作品集网页，包含：
> 1. 顶部个人介绍区（名字、一句话简介）
> 2. 项目展示区，每个项目一个卡片，包含：
>    - 项目截图或图标
>    - 项目名称
>    - 简短描述（1-2 句话）
>    - "查看项目"按钮（链接到项目文件）
> 3. 底部联系方式
> 4. 整体采用卡片式布局，响应式设计

### 发布你的作品集

做好之后，用第 7 章学到的方法把它发布到网上。

### 项目清单

把你之前做的项目都加进去：
- 个人主页
- 待办清单
- 倒计时工具
- 以及任何你以后会做的项目

### 要点总结

- 作品集是展示你成果的最佳方式
- 用卡片布局展示多个项目
- 持续更新，你的作品集会越来越丰富
`,
    hasChat: false,
    hasPlayground: true,
    type: 'lesson' as const,
    difficulty: 'intermediate' as const,
    estimatedMinutes: 20,
    prerequisites: ['6-3'],
    tags: ['实践', '项目'],
  },
  // ====== 第七章 ======
  {
    id: "7-1",
    module: "第七章：分享与发布",
    title: "网站是怎么出现在互联网上的",
    description: "理解托管、域名和部署的基本概念",
    content: `
## 网站是怎么出现在互联网上的

你做了网页，但只有你自己能看。怎么让全世界都看到？

### 三个核心概念

1. **文件**——你的 HTML/CSS/JS 代码，这是网站的"内容"
2. **托管**——把文件放到一台 24 小时开机的电脑上（叫"服务器"），这样别人随时能访问
3. **域名**——服务器的地址，比如 dreamnight.net.cn，别人通过域名访问你的网站

### 类比理解

- 文件 = 你写的书
- 托管 = 把书放到图书馆的书架上
- 域名 = 图书馆的地址，别人按地址找到你的书

### 免费托管服务

| 服务 | 适合人群 | 特点 |
|------|---------|------|
| **GitHub Pages** | 静态网页 | 免费、简单、配合 GitHub 使用 |
| **Vercel** | 各类项目 | 免费、一键部署、自动 HTTPS |
| **Netlify** | 静态网页 | 免费、拖拽上传、简单 |

### 要点总结

- 托管 = 把文件放到服务器上
- 域名 = 服务器的网址
- GitHub Pages 是最简单的入门选择
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedMinutes: 8,
    prerequisites: ['6-4'],
    tags: ['工具'],
  },
  {
    id: "7-2",
    module: "第七章：分享与发布",
    title: "用 GitHub Pages 免费发布你的网站",
    description: "最简单的免费网站发布方式，手把手教学",
    content: `
## 用 GitHub Pages 免费发布你的网站

不需要花钱，10 分钟就能让全世界看到你的网页。

### 第一步：注册 GitHub

1. 打开 https://github.com
2. 点击 Sign Up 注册账号
3. 验证邮箱
4. 登录后看到你的 Dashboard

### 第二步：创建仓库

1. 点击右上角的 "+" → New repository
2. Repository name 填写：你的用户名.github.io
   （比如：sixtdreanight.github.io）
3. 选择 Public（公开）
4. 点击 Create repository

### 第三步：上传文件

1. 点击 "uploading an existing file"
2. 把你的 index.html 拖进去
3. 在 Commit message 里写 "第一次提交"
4. 点击 Commit changes

### 第四步：访问你的网站

等待 1-2 分钟，打开浏览器访问：
https://你的用户名.github.io

你的网站上线了！把链接分享给朋友看看吧。

### 如果想用 Vercel

Vercel 更现代、更简单：

1. 打开 https://vercel.com，用 GitHub 登录
2. 点击 New Project
3. 选择你的仓库
4. 点击 Deploy
5. 几分钟后你的网站就上线了，还会自动配置 HTTPS

### 要点总结

- GitHub Pages 完全免费
- 仓库名必须是 用户名.github.io
- 上传 index.html 就能访问
- Vercel 是更现代的替代方案
- 每次修改后重新上传，网站就会更新
`,
    hasChat: true,
    hasPlayground: false,
    type: 'lesson' as const,
    difficulty: 'intermediate' as const,
    estimatedMinutes: 15,
    prerequisites: ['7-1'],
    tags: ['工具', '实践'],
  },
];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getNextLessonId(id: string): string | null {
  const idx = lessons.findIndex((l) => l.id === id);
  if (idx >= 0 && idx < lessons.length - 1) {
    return lessons[idx + 1].id;
  }
  return null;
}

export function getPrevLessonId(id: string): string | null {
  const idx = lessons.findIndex((l) => l.id === id);
  if (idx > 0) {
    return lessons[idx - 1].id;
  }
  return null;
}
