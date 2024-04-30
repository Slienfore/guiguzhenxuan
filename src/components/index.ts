import SvgIcon from './Svg/SvgIcon.vue'

const allComponents = {SvgIcon}

export default {
    install(app) {
        for (const [name, component] of Object.entries(allComponents)) {
            app.component(name, component)// 注册全局组件
        }
    }
}