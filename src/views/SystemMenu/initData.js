export const initialMenuItems = [
  { id: 1, name: '仪表盘', path: '/dashboard', type: 'menu', status: 'enabled', order: 1 },
  {
    id: 2,
    name: '系统配置',
    path: '/systemconfig',
    type: 'menu',
    status: 'enabled',
    order: 2,
    children: [
      { id: 21, name: '菜单管理', path: '/systemmenu', type: 'menu', status: 'enabled', order: 1 },
      { id: 22, name: '权限管理', path: '/systempermission', type: 'menu', status: 'enabled', order: 2 },
      { id: 23, name: '用户管理', path: '/systemuser', type: 'menu', status: 'enabled', order: 3 }
    ]
  },
  {
    id: 3,
    name: '素材',
    path: '/material',
    type: 'group',
    status: 'enabled',
    order: 3,
    children: [
      { id: 31, name: '图片素材', path: '/materialimage', type: 'menu', status: 'enabled', order: 1 },
      { id: 32, name: '视频素材', path: '/materialvideo', type: 'menu', status: 'enabled', order: 2 },
      { id: 33, name: '模板素材', path: '/materialtemplate', type: 'menu', status: 'enabled', order: 3 },
      { id: 34, name: '楼层素材', path: '/materialfloor', type: 'menu', status: 'enabled', order: 4 },
      { id: 35, name: '邮件模板', path: '/materialemailtemplate', type: 'menu', status: 'enabled', order: 5 },
      { id: 36, name: '仪表素材', path: '/materialboardtemplate', type: 'menu', status: 'enabled', order: 6 }
    ]
  }
  ,{
    id: 7,
    name: '活动',
    path: '/activity',
    type: 'menu',
    status: 'enabled',
    order: 6,
    children: [
      { id: 71, name: '活动列表', path: '/activitylist', type: 'menu', status: 'enabled', order: 1 }
    ]
  }
]