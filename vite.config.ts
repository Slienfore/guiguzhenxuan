import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入 Icons 插件
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
// 引入 mock 插件
import {viteMockServe} from 'vite-plugin-mock'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    // 获取各种环境下的 变量
    const env = loadEnv(mode, process.cwd())

    return {
        server: {// 代理跨域
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: env.VITE_SERVE,// 数据服务器地址设置
                    changeOrigin: true,// 开启跨域
                    rewrite: (path) => path.replace(/^\/api/, '')// 路径重写(将 /api 替换成 '')
                }
            }
        },
        plugins: [
            viteMockServe({
                enable: command === 'serve'// 保证开发阶段能够使用 mock 数据
            }),
            vue(),
            VueSetupExtend(),
            createSvgIconsPlugin({
                // Specify the icon folder to be cached
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                // Specify symbolId format
                symbolId: 'icon-[dir]-[name]',
            })
        ],
        css: {// scss 全局变量配置
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "./src/style/variable.scss";'
                }
            },
        },
        resolve: {
            alias: {
                "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
            }
        }
    }
})
