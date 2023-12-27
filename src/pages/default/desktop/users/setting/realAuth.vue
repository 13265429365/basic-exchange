<template>
  <!-- input -->
  <q-form @submit="submit" class="full-width" style="padding: 48px 100px;">
    <div class="row no-wrap justify-between">
      <div class="q-mr-md" style="width: 48.5%;">
        <div class="q-mb-xs text-color-6">{{ $t('email') }}</div>
        <q-input :rules="[
          val => val !== null && val !== ''
        ]" outlined dense class="q-mb-lg" v-model="form.realName" :placeholder="$t('email')" />
      </div>
      <div style="width: 48.5%;">
        <div class="q-mb-xs text-color-6">{{ $t('telephone') }}</div>
        <q-input :rules="[
          val => val !== null && val !== ''
        ]" outlined dense class="q-mb-lg" v-model="form.telephone" :placeholder="$t('telephone')" />
      </div>
    </div>
    <div class="row no-wrap justify-between">
      <div class="q-mr-md" style="width: 48.5%;">
        <div class="q-mb-xs text-color-6">{{ $t('bankNumber') }}</div>
        <q-input :rules="[
          val => val !== null && val !== ''
        ]" outlined dense class="q-mb-lg" v-model="form.number" :placeholder="$t('bankNumber')" />
      </div>
      <div style="width: 48.5%;">
        <div class="q-mb-xs text-color-6">{{ $t('digitalAddress') }}</div>
        <q-input :rules="[
          val => val !== null && val !== ''
        ]" outlined dense class="q-mb-lg" v-model="form.address" :placeholder="$t('digitalAddress')" />
      </div>
    </div>

    <!-- 上传身份证 -->
    <div class="q-mb-xs text-color-6">{{ $t('idPhoto1').replace('正面', '').replace('1', '') }}</div>
    <div class="row justify-between">
      <div class="q-mb-xl" style="width: 48.5%;">
        <uploader :respValue="form.photo1" @uploaded="uploaded" :value="imgUrl" :listStyle="{
          height: '155px',
        }">
          <template v-slot:noneAdd>
            <div style="width: 100%;height: 100%;" class="column justify-center items-center fit">
              <q-icon name="add" size="29px" />
            </div>
          </template>
        </uploader>
        <div class="text-body2 text-weight-medium text-center q-mt-lg">{{ $t('idPhoto1') }}</div>
      </div>

      <!--  -->
      <div class="q-mb-xl" style="width: 48.5%;">
        <uploader :respValue="form.photo2" @uploaded="uploaded2" :value="imgUrl" :listStyle="{
          height: '155px',
        }">
          <template v-slot:noneAdd>
            <div style="width: 100%;height: 100%;" class="column justify-center items-center fit">
              <q-icon name="add" size="29px" />
            </div>
          </template>
        </uploader>
        <div class="text-body2 text-weight-medium text-center q-mt-lg">{{ $t('idPhoto2') }}</div>
      </div>
    </div>

    <!-- sub按钮 -->
    <div class="q-mt-xl row justify-center">
      <q-btn rounded color="primary" type="submit" no-caps :label="$t('submit')"
        style="width: 170px;height: 48px;"></q-btn>
    </div>
  </q-form>
</template>

<script lang="ts">
import uploader from 'src/components/uploader.vue';
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { NotifyPositive } from 'src/utils/notify';
import { userAuth, getUserAuth } from 'src/apis/user';
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
      form: {
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
      getUserAuth().then((res: any) => {
        console.log(res);
        state.form = res
      })
    }

    const submit = () => {
      if (state.form.photo1 == '' || state.form.photo2 == '') {
        return false
      }
      let params = {
        realName: state.form.realName,
        telephone: state.form.telephone,
        number: state.form.number,
        address: state.form.address,
        photo1: state.form.photo1,
        photo2: state.form.photo2,
      }
      userAuth(params).then((res: any) => {
        NotifyPositive(t('submittedSuccess'))
        getAuth()
        console.log(res);
      })
    }

    const uploaded = (url: any) => {
      state.form.photo1 = url
    }

    const uploaded2 = (url: any) => {
      state.form.photo2 = url
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
