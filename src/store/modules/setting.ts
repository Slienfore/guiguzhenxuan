// Layout 组件的仓库
import {defineStore} from 'pinia'
import {ref} from 'vue'

const useLayoutSettingStore = defineStore('settingStore', () => {
    const fold = ref(false)// 控制侧边栏折叠
    const refresh = ref(false)// 控制刷新

    return {fold, refresh}
})

export default useLayoutSettingStore