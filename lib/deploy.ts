export interface DeployGuide {
  id: string;
  label: string;
  description: string;
  steps: string[];
  difficulty: 'beginner' | 'intermediate';
  icon: string;
}

export const DEPLOY_GUIDES: DeployGuide[] = [
  {
    id: 'github-pages',
    label: 'GitHub Pages',
    description: '免费、最简单的方式发布你的网页',
    difficulty: 'beginner',
    icon: 'Globe',
    steps: [
      '注册 GitHub 账号（github.com）',
      '创建新仓库，命名为 username.github.io',
      '点击 "Add file" → "Create new file"',
      '文件名写 index.html，把代码粘贴进去',
      '点击 "Commit new file" 保存',
      '等待 1-2 分钟，访问 https://username.github.io 就能看到你的网页了！',
    ],
  },
  {
    id: 'download',
    label: '下载 HTML 文件',
    description: '保存到电脑，用浏览器打开',
    difficulty: 'beginner',
    icon: 'Download',
    steps: [
      '点击下方"下载 HTML"按钮',
      '文件保存到桌面或你记得的文件夹',
      '双击文件，浏览器自动打开',
      '想分享给朋友？把文件发过去就行！',
    ],
  },
  {
    id: 'netlify',
    label: 'Netlify',
    description: '拖拽就能部署，自动生成网址',
    difficulty: 'beginner',
    icon: 'Cloud',
    steps: [
      '先下载 HTML 文件到电脑',
      '打开 netlify.com，注册账号',
      '在 Sites 页面，把 HTML 文件拖进去',
      'Netlify 自动生成一个网址',
      '你可以改网址名字（如 my-site.netlify.app）',
    ],
  },
];

export function getDeployGuides(): DeployGuide[] {
  return DEPLOY_GUIDES;
}
