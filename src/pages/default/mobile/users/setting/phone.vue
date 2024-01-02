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
        <div class="row no-wrap justify-between">
          <q-btn-dropdown class="col-4 text-weight-regular rounded-borders" unelevated flat no-caps
            dropdown-icon="expand_more" style="height: 40px;border: 1px solid rgba(0, 0, 0, 0.24);">
            <template v-slot:label>
              <div class="row no-wrap items-center">
                <q-img :src="imageSrc(countryList[countryIndex].icon ? countryList[countryIndex].icon : '')" width="24px"
                  height="16px" />
                <div class="q-ml-sm">+{{ countryList[countryIndex].code }}</div>
              </div>
            </template>
            <!-- 下拉 -->
            <q-list style="min-width: 268px" class="q-py-sm">
              <q-item @click="countryIndex = i" v-for="(item, i) in countryList" :key="i" clickable v-close-popup
                class="row no-wrap items-center">
                <q-img class="q-mr-sm" :src="imageSrc(item.icon)" width="38px" height="38px" />
                <div>
                  <div style="font-size: 16px;">{{ item.name }}</div>
                </div>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-input style="width: 64%;" :placeholder="$t('telephone')" class="q-mb-lg" outlined dense
            v-model="params.telephone" />
        </div>
        <q-btn @click="submit" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;" color="primary"
          :label="$t('submit')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LocalStorage } from 'quasar';
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
      countryList: $initStore.countryList as any,
      countryIndex: 0,
      params: {} as any,
    })

    onMounted(() => {
      UserInfo()
    })

    // 获取用户信息
    const UserInfo = () => {
      userInfoAPI().then((res: any) => {
        state.params.telephone = res.telephone.split('|')[1]
        $userStore.updateUserInfo(res)
        LocalStorage.set(UserInfoKey, JSON.stringify(res))
      })
    }

    // 执行接口
    const submit = () => {
      console.log(state.countryList[state.countryIndex].code + state.params.telephone);

      let params = {
        telephone: state.countryList[state.countryIndex].code + '|' + state.params.telephone,
      }
      updateInfoAPI(params).then((res: any) => {
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
