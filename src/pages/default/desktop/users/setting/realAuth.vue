<template>
  <div style="margin-top: 60px;">
    <div class="row justify-center">
      <div class="col-6">
        <div class="text-h5 q-mb-xl">{{ $t('realAuth') }}</div>
        <div class="q-gutter-md">
          <div>
            <div class="q-mb-xs text-color-6">{{ $t('idName') }}</div>
            <q-input outlined dense v-model="params.realName" :placeholder="$t('idName')" />
          </div>
          <div>
            <div class="q-mb-xs text-color-6">{{ $t('idNumber') }}</div>
            <q-input outlined dense v-model="params.number" :placeholder="$t('idNumber')" />
          </div>
          <div>
            <div class="q-mb-xs text-color-6">{{ $t('telephone') }}</div>
            <q-input outlined dense v-model="params.telephone" :placeholder="$t('telephone')" />
          </div>
          <div>
            <div class="q-mb-xs text-color-6">{{ $t('address') }}</div>
            <q-input outlined dense v-model="params.address" :placeholder="$t('address')" />
          </div>


          <div>
            <div>{{ $t('idPhoto') }}</div>

            <div class="row q-mt-sm">
              <div class="col q-mr-xs">
                <uploader :respValue="params.photo1" @uploaded="uploaded" :value="imgUrl" :listStyle="{
                  height: '155px',
                }">
                  <template v-slot:noneAdd>
                    <div style="width: 100%;height: 100%;" class="column justify-center items-center fit">
                      <q-icon name="add" class="text-grey-6" size="40px" />
                    </div>
                  </template>
                </uploader>
                <div class="text-caption text-weight-medium text-center q-mt-sm">{{ $t('idPhoto1') }}</div>
              </div>

              <!--  -->
              <div class="col q-ml-xs">
                <uploader :respValue="params.photo2" @uploaded="uploaded2" :value="imgUrl" :listStyle="{
                  height: '155px',
                }">
                  <template v-slot:noneAdd>
                    <div style="width: 100%;height: 100%;" class="column justify-center items-center fit">
                      <q-icon name="add" class="text-grey-6" size="40px" />
                    </div>
                  </template>
                </uploader>
                <div class="text-caption text-weight-medium text-center q-mt-sm">{{ $t('idPhoto2') }}</div>
              </div>
            </div>
          </div>

          <div class="q-mt-xl row justify-end">
            <q-btn rounded unelevated color="primary" no-caps :label="$t('submit')"
              style="width: 170px;height: 48px;"></q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- sub按钮 -->
</template>

<script lang="ts">
import uploader from 'src/components/uploader.vue';
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { NotifyPositive } from 'src/utils/notify';
import { realAuthCreateAPI, realAuthInfoAPI } from 'src/apis/user';
import { UserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    uploader
  },
  name: 'realAuthIndex',
  setup() {
    const { t } = useI18n()
    const $userStore = UserStore()
    const state = reactive({
      //
      imgUrl: '',
      params: {
        realName: '',
        telephone: '',
        number: '',
        address: '',
        photo1: '',
        photo2: '',
      } as any,
    });

    onMounted(() => {
      getAuth()
    })

    const getAuth = () => {
      realAuthInfoAPI().then((res: any) => {
        console.log(res);
        state.params = res
      })
    }

    const submit = () => {
      if (state.params.photo1 == '' || state.params.photo2 == '') {
        return false
      }
      let params = {
        realName: state.params.realName,
        telephone: state.params.telephone,
        number: state.params.number,
        address: state.params.address,
        photo1: state.params.photo1,
        photo2: state.params.photo2,
      }
      realAuthCreateAPI(params).then((res: any) => {
        NotifyPositive(t('submittedSuccess'))
        getAuth()
        console.log(res);
      })
    }

    const uploaded = (url: any) => {
      state.params.photo1 = url
    }

    const uploaded2 = (url: any) => {
      state.params.photo2 = url
    }

    return {
      ...toRefs(state),
      uploaded,
      uploaded2,
      submit,
    }
  }
});
</script>
<style lang="scss" scoped>
// upload样式
:deep .q-uploader__list {
  padding: 0;
}
</style>
