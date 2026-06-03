export interface Exercise {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  templateCode: string;
  expectedBehavior: string;
  hints: string[];
  checkType: 'exact' | 'contains' | 'ai';
  checkPatterns: string[];
}

export const exercises: Exercise[] = [
  {
    id: 'ex-3-1',
    lessonId: '3-1',
    title: '修改标题颜色',
    description: '把网页的主标题颜色改成你喜欢的颜色',
    templateCode: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>我的第一个网页</title>
<style>
  body {
    font-family: system-ui, sans-serif;
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background: #f5f5f5;
  }
  h1 {
    color: #333;
    text-align: center;
  }
  p {
    line-height: 1.8;
    color: #666;
  }
</style>
</head>
<body>
  <h1>你好，世界！</h1>
  <p>这是我的第一个网页。我正在学习如何用 AI 来编程。</p>
</body>
</html>`,
    expectedBehavior: '修改 h1 的 color 属性，改成任意不同于 #333 的颜色',
    hints: [
      '找到 <style> 标签里的 h1 { ... } 部分',
      'color 属性控制文字颜色，你可以用颜色名如 red, blue, green',
      '也可以用十六进制颜色码如 #e85d3a',
    ],
    checkType: 'contains',
    checkPatterns: ['h1', 'color'],
  },
  {
    id: 'ex-3-2',
    lessonId: '3-2',
    title: '添加一个按钮',
    description: '在页面上添加一个按钮，点击后弹出提示',
    templateCode: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>添加交互</title>
<style>
  body {
    font-family: system-ui, sans-serif;
    max-width: 500px;
    margin: 80px auto;
    text-align: center;
    background: #faf7f2;
  }
  h1 { color: #2d2926; }
</style>
</head>
<body>
  <h1>点击下面的按钮</h1>
  <!-- 在这里添加你的按钮 -->

  <script>
    // 在这里写按钮点击后的代码
  </script>
</body>
</html>`,
    expectedBehavior: '添加一个按钮元素和点击事件，点击后弹出 alert 或显示文本',
    hints: [
      '用 <button> 标签创建按钮',
      '给按钮添加 onclick 属性或使用 addEventListener',
      'alert("你的消息") 可以弹出提示框',
    ],
    checkType: 'contains',
    checkPatterns: ['button', 'click'],
  },
  {
    id: 'ex-4-3',
    lessonId: '4-3',
    title: '做一个计数器',
    description: '创建一个点击计数器：每次点击数字加 1',
    templateCode: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>计数器</title>
<style>
  body {
    font-family: system-ui, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #faf7f2;
  }
  .container {
    text-align: center;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  }
</style>
</head>
<body>
  <div class="container">
    <h1>计数器</h1>
    <!-- 在这里显示数字 -->
    <!-- 在这里添加按钮 -->
  </div>

  <script>
    // 在这里写计数器逻辑
  </script>
</body>
</html>`,
    expectedBehavior: '显示一个数字，旁边有按钮，点击按钮数字加 1',
    hints: [
      '用 span 或 div 显示数字，给它一个 id',
      '用 document.getElementById 获取数字元素',
      '设置一个变量保存计数，每次点击 +1 并更新显示',
    ],
    checkType: 'contains',
    checkPatterns: ['getElementById', 'innerText'],
  },
  {
    id: 'ex-6-1',
    lessonId: '6-1',
    title: '美化个人主页',
    description: '给个人主页添加渐变背景和圆角卡片',
    templateCode: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>我的主页</title>
<style>
  body {
    font-family: system-ui, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    /* 添加渐变背景 */
  }
  .card {
    /* 添加卡片样式：背景、内边距、圆角、阴影 */
    max-width: 400px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #e0d8cc;
    margin: 0 auto 20px;
    /* 添加头像边框或阴影 */
  }
</style>
</head>
<body>
  <div class="card">
    <div class="avatar"></div>
    <h1>我的名字</h1>
    <p style="color: #666;">一段简短的自我介绍，告诉大家你是谁、在学什么。</p>
    <!-- 添加一个技能列表 -->
  </div>
</body>
</html>`,
    expectedBehavior: '添加渐变背景、卡片圆角和阴影、头像样式，以及技能列表',
    hints: [
      '渐变背景用 background: linear-gradient(...) ',
      '卡片加 border-radius: 16px 和 box-shadow',
      '技能列表可以用 ul > li 或几个小标签',
    ],
    checkType: 'contains',
    checkPatterns: ['linear-gradient', 'border-radius', 'box-shadow'],
  },
  {
    id: 'ex-6-2',
    lessonId: '6-2',
    title: '完成待办清单功能',
    description: '让待办清单能添加和删除项目',
    templateCode: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>待办清单</title>
<style>
  body {
    font-family: system-ui, sans-serif;
    max-width: 400px;
    margin: 60px auto;
    padding: 20px;
    background: #faf7f2;
  }
  h1 { text-align: center; }
  .input-row {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
  }
  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #e0d8cc;
    border-radius: 8px;
    font-size: 14px;
  }
  button {
    padding: 10px 16px;
    background: #e85d3a;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: white;
    border-radius: 8px;
    margin-bottom: 8px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }
</style>
</head>
<body>
  <h1>待办清单</h1>
  <div class="input-row">
    <input type="text" id="todoInput" placeholder="输入待办事项...">
    <button id="addBtn">添加</button>
  </div>
  <ul id="todoList">
    <!-- 待办事项会显示在这里 -->
  </ul>

  <script>
    // 在这里完成添加和删除功能
    // 提示：
    // 1. 获取 input、button、ul 元素
    // 2. 点击"添加"按钮时：
    //    - 创建新的 li 元素
    //    - 设置 li 的内容（事项文字 + 删除按钮）
    //    - 把 li 添加到 ul 中
    //    - 清空 input
    // 3. 点击"删除"按钮时移除对应的 li
  </script>
</body>
</html>`,
    expectedBehavior: '输入文字点击添加后出现在列表中，点击删除可以移除',
    hints: [
      '用 createElement("li") 创建列表项',
      '用 appendChild 把新项目加入列表',
      '删除按钮用 remove() 方法移除父元素',
    ],
    checkType: 'contains',
    checkPatterns: ['createElement', 'appendChild', 'remove'],
  },
  {
    id: 'ex-6-3',
    lessonId: '6-3',
    title: '完成倒计时逻辑',
    description: '让倒计时真正运行起来：输入秒数，点击开始倒数',
    templateCode: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>倒计时</title>
<style>
  body {
    font-family: system-ui, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #fdf0eb, #fdf3e0);
  }
  .timer-box {
    text-align: center;
    padding: 50px;
    background: white;
    border-radius: 24px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  }
  .display {
    font-size: 72px;
    font-weight: bold;
    font-variant-numeric: tabular-nums;
    color: #2d2926;
    margin: 20px 0;
  }
  input {
    padding: 10px;
    border: 1px solid #e0d8cc;
    border-radius: 8px;
    width: 80px;
    text-align: center;
    font-size: 16px;
  }
  button {
    padding: 10px 24px;
    background: #e85d3a;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    margin-left: 8px;
  }
</style>
</head>
<body>
  <div class="timer-box">
    <h1>倒计时</h1>
    <div class="display" id="display">00</div>
    <div>
      <input type="number" id="secondsInput" placeholder="秒数" min="1" max="999">
      <button id="startBtn">开始</button>
      <button id="resetBtn">重置</button>
    </div>
  </div>

  <script>
    // 完成倒计时逻辑：
    // 1. 点击"开始"，获取输入秒数
    // 2. 使用 setInterval 每 1 秒减 1
    // 3. 更新 display 显示剩余秒数
    // 4. 到 0 时停止并弹出提示
    // 5. 点击"重置"回到初始状态
  </script>
</body>
</html>`,
    expectedBehavior: '输入秒数点开始，数字每秒减 1，到 0 弹窗提示',
    hints: [
      '使用 setInterval(fn, 1000) 每秒执行一次',
      '在 interval 回调里减少剩余秒数并更新显示',
      '到 0 时用 clearInterval 停止，用 alert 提示',
    ],
    checkType: 'contains',
    checkPatterns: ['setInterval', 'clearInterval'],
  },
];

export function getExercisesByLesson(lessonId: string): Exercise[] {
  return exercises.filter((e) => e.lessonId === lessonId);
}

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find((e) => e.id === id);
}
