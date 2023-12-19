<template>
  <div>
    <div>
      <!-- <div class="row justify-center">
        <div class="size24 text-weight-bold">Complete Your Profile</div>
      </div> -->
      <div class="row justify-center q-py-lg">
        <div class="relative">
          <q-img :src="imageSrc('')" width="80px" height="80px" />
          <q-img class="head_edit cursor-pointer" src="/icons/edit.png" />
        </div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <div class="q-mb-md">
            <div class="text-weight-bold q-mb-sm">Name</div>
            <q-input color="green" standout v-model="params.Name" />
          </div>

          <div class="q-mb-md">
            <div class="text-weight-bold q-mb-sm">Gender</div>
            <q-btn-dropdown class="text-weight-regular full-width" :label="GenderList[genderIndex].name" unelevated flat
              no-caps dropdown-icon="expand_more"
              style="height: 50px;background: #f5f6fa;border-radius: 10px;color: rgba(0, 0, 0, 0.87);">
              <!-- 下拉 -->
              <q-list style="min-width: 268px" class="q-py-sm">
                <q-item @click="genderIndex = i" v-for="(item, i) in GenderList" :key="i" clickable v-close-popup
                  class="row no-wrap items-center">
                  <div>
                    <div style="font-size: 16px;">{{ item.name }}</div>
                  </div>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>

          <div class="q-mb-md">
            <div class="text-weight-bold q-mb-sm">Birthday</div>
            <q-input @click="birthdayPopup = true" standout v-model="params.Birthday" mask="date" class="q-mb-lg">
              <template v-slot:append>
                <q-popup-proxy v-model="birthdayPopup">
                  <q-date v-model="params.Birthday">
                    <div class="row items-center justify-end">
                      <q-btn @click="birthdayPopup = false" no-caps label="confirm" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </template>
            </q-input>
          </div>

          <q-btn class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;" color="primary"
            label="Complete Profile" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';

export default defineComponent({
  name: 'infoEdit',
  setup(props: any, context: any) {
    // const router = useRouter();
    let store = reactive({
      toggle: false,

      genderIndex: 0,
      GenderList: [
        { name: 'male' },
        { name: 'female' },
      ],

      //date选择器状态
      birthdayPopup: false,

      params: {
        Name: '',
        Gender: '',
        Birthday: '', //验证id
      }
    })

    context.emit('update', {
      title: 'AccountManage',
    })

    return {
      imageSrc,
      ...toRefs(store),
    }
  }
})
</script>

<style scoped lang="scss">
.relative {
  position: relative;
}

.head_edit {
  width: 27px;
  height: 27px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 99;
}

:deep(.q-btn) {
  .q-btn__content {
    justify-content: start;
  }

  .q-btn-dropdown__arrow {
    position: absolute;
    right: 10px;
  }

}
</style>
