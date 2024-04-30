export const constantRoutes = [
    {
        path: '/', component: () => import('@/layout/Layout.vue'), meta: {hidden: true},
        redirect: '/home',// 重定向到 home
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/Home.vue'),
                meta: {title: '首页', hidden: false, icon: 'HomeFilled'}
            }
        ]
    },
    {
        name: 'screen', path: '/screen',
        component: () => import('@/views/screen/Screen.vue'),
        meta: {title: '数据大屏', hidden: false, icon: 'DataLine'}
    },
    {
        name: 'acl', path: '/acl',
        component: () => import('@/layout/Layout.vue'),
        meta: {title: '权限管理', hidden: false, icon: 'Lock'},
        redirect: '/acl/user',// 访问一级路由时候重定向第一个二级路由
        children: [
            {
                name: 'acl', path: '/acl/user',
                component: () => import('@/views/acl/user/User.vue'),
                meta: {title: '用户管理', hidden: false, icon: 'User'}
            },
            {
                name: 'role', path: '/acl/role',
                component: () => import('@/views/acl/role/Role.vue'),
                meta: {title: '权限管理', hidden: false, icon: 'UserFilled'}
            },
            {
                name: 'permission', path: '/acl/permission',
                component: () => import('@/views/acl/permission/Permission.vue'),
                meta: {title: '菜单管理', hidden: false, icon: 'Monitor'}
            },
        ]
    },
    {
        name: 'produce', path: '/product',
        component: () => import('@/layout/Layout.vue'),
        meta: {title: '商品管理', hidden: false, icon: 'Goods'},
        redirect: '/product/trademark',// 访问一级路由时候重定向第一个二级路由
        children: [
            {
                name: 'trademark', path: '/product/trademark',
                component: () => import('@/views/product/trademark/Trademark.vue'),
                meta: {title: '品牌管理', hidden: false, icon: 'ShoppingCartFull'}
            },
            {
                name: 'attr', path: '/product/attr',
                component: () => import('@/views/product/attr/Attr.vue'),
                meta: {title: '属性管理', hidden: false, icon: 'BrushFilled'}
            },
            {
                name: 'sku', path: '/product/sku',
                component: () => import('@/views/product/sku/Sku.vue'),
                meta: {title: 'SKU管理', hidden: false, icon: 'ElementPlus'}
            },
            {
                name: 'spu', path: '/product/spu',
                component: () => import('@/views/product/spu/Spu.vue'),
                meta: {title: 'SPU管理', hidden: false, icon: 'SwitchFilled'}
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/Login.vue'),
        meta: {title: '登录', hidden: true}
    },
    {
        name: '404', path: '/404', component: () => import('@/views/404/404.vue'), meta: {title: '404', hidden: true}
    },
    {// 任意路由匹配不上, 则重定向 404
        name: 'any', path: '/:pathMatch(.*)*', redirect: '/404', meta: {title: '任意', hidden: true}
    }
]