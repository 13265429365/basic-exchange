<template>
  <div>
    <div>
      <div class="row justify-center q-mt-lg q-mb-sm">
        <div class="text-h6 text-weight-bold">{{ $t('bindTelephone') }}</div>
      </div>
      <div class="row justify-center q-px-lg">
        {{ $t('bindTelephoneSmall') }}
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <div class="row no-wrap justify-between">
            <q-btn-dropdown class="col-4 text-weight-regular" unelevated flat no-caps dropdown-icon="expand_more"
              style="height: 50px;background: #f5f6fa;border-radius: 10px;color: #8F959E;">
              <template v-slot:label>
                <div class="row no-wrap items-center">
                  <q-img :src="imageSrc(options[areaCodeIndex].icon ? options[areaCodeIndex].icon : '')" width="24px"
                    height="16px" />
                  <div class="q-ml-sm">+{{ options[areaCodeIndex].code }}</div>
                </div>
              </template>
              <!-- 下拉 -->
              <q-list style="min-width: 268px" class="q-py-sm">
                <q-item @click="areaCodeIndex = i" v-for="(item, i) in options" :key="i" clickable v-close-popup
                  class="row no-wrap items-center">
                  <q-img class="q-mr-sm" :src="imageSrc(item.icon)" width="38px" height="38px" />
                  <div>
                    <div style="font-size: 16px;">{{ item.name }}</div>
                  </div>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-input style="width: 64%;" :placeholder="$t('telephone')" class="q-mb-lg" standout
              v-model="form.telephone" />
          </div>
          <q-btn @click="submit" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
            color="primary" :label="$t('submit')" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';
import { InitStore } from 'src/stores/init';
import { useRouter } from 'vue-router';
import { UserStore, UserInfoKey } from 'src/stores/user';
import { userInfoAPI, updateInfoAPI } from 'src/apis/user';

// 列表
export default defineComponent({
  name: 'phoneAuthentication',
  setup() {
    const $router = useRouter();
    const $initStore = InitStore();
    const $userStore = UserStore();

    let state = reactive({
      options: [
        { icon: '' }
      ] as any,
      // 手机区号
      areaCodeIndex: 0,

      form: {} as any,

    })

    onMounted(() => {
      state.options = $initStore.countryList
      UserInfo()
    })

    // 获取用户信息
    const UserInfo = () => {
      userInfoAPI().then((res: any) => {
        console.log('用户信息', res);
        state.form = res
        $userStore.updateUserInfo(res)
        localStorage.setItem(UserInfoKey, JSON.stringify(res))
      })
    }

    // 执行接口
    const submit = () => {
      let params = {
        telephone: state.form.telephone,
      }
      updateInfoAPI(params).then((res: any) => {
        console.log(res);
        UserInfo()
        // $router.push({ name: 'UserIndex' })
      })
    }

    return {
      imageSrc,
      ...toRefs(state),
      submit,
    }
  }
})
</script>

<style scoped>
:deep .q-select .q-field__control:hover:before {
  opacity: 0;
}

:deep .q-select .q-field__prepend {
  padding-right: 0;
  color: #8F959E;
}

:deep .q-select .q-field__append {
  padding-left: 4px;
  font-size: 15px;
  color: #8F959E;
}

:deep .q-select .q-field__native {
  display: none;
}

:deep .q-select .q-field__append .q-icon {
  display: none;
}
</style>
