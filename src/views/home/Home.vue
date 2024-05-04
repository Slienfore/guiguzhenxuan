<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
import SvgIcon from '@/components/Svg/SvgIcon.vue'

const userStore = useUserStore()

</script>

<template>
    <el-card>
        <div class="card">
            <el-image :src="userStore.avatar" class="avatar"></el-image>
            <div style="height: 100px;">
                <h3>Hello! {{ getTime() }}好, {{ userStore.username }}
                </h3>
            </div>
        </div>
    </el-card>

    <div class="bottom">
        <SvgIcon name="welcome" width="500px" height="500px"></SvgIcon>
    </div>
</template>

<style scoped lang="scss">
.card {
    display: flex;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 16px;
    }

    h3 {
        padding: 0 30px;
        font-size: 2rem;
        color: #636060;
        font-family: 'JetBrains Mono ExtraBold';
        line-height: 100px;
    }
}

.bottom {
    padding: 125px 0;
    display: flex;
    justify-content: center;
}
</style>