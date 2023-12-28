<template>
  <div class="column full-height">
    <q-form @submit="submit" class="full-width">
      <div class="col bg-white  q-pa-md">
        <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">{{ $t('email') }}</div>
        <q-input standout v-model="form.realName" class="q-mb-md" />
        <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">{{ $t('telephone') }}</div>
        <q-input standout v-model="form.telephone" class="q-mb-md" />
        <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">{{ $t('bankNumber') }}</div>
        <q-input standout v-model="form.number" class="q-mb-md" />
        <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">{{ $t('digitalAddress') }}</div>
        <q-input standout v-model="form.address" class="q-mb-md" />

        <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">{{ $t('idPhoto1').replace('正面',
          '').replace('1', '') }}</div>
        <uploader :respValue="form.photo1" @uploaded="uploaded" :listStyle="{
          height: '186px',
        }">
          <template v-slot:noneAdd>
            <div style="border: 1px dashed #D7D7D7;width: 100%;height: 100%;background-color: #F5F6FA;"
              class="rounded-borders column justify-center">
              <q-icon name="add" size="24px" class="self-center"></q-icon>
              <div class="text-body2 text-weight-medium text-color-9 self-center q-mt-sm">身份证正面</div>
            </div>
          </template>
        </uploader>
        <uploader :respValue="form.photo2" @uploaded="uploaded2" :listStyle="{
          height: '186px',
        }">
          <template v-slot:noneAdd>
            <div style="border: 1px dashed #D7D7D7;width: 100%;height: 100%;background-color: #F5F6FA;"
              class="rounded-borders column justify-center">
              <q-icon name="add" size="24px" class="self-center"></q-icon>
              <div class="text-body2 text-weight-medium text-color-9 self-center q-mt-sm">身份证背面</div>
            </div>
          </template>
        </uploader>

        <q-btn unelevated rounded color="primary" :label="$t('submit')" class="full-width q-my-xl" no-caps
          type="submit" />
      </div>
    </q-form>


  </div>
</template>

<script lang="ts">
import uploader from 'components/uploader.vue';
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { NotifyPositive } from 'src/utils/notify';
import { realAuthCreateAPI, realAuthInfoAPI } from 'src/apis/user';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';


export default defineComponent({
  name: 'UserRealAuth',
  components: { uploader },
  setup(props: any, context: any) {
    const { t } = useI18n();
    const $router = useRouter();

    const state = reactive({
      form: {
        realName: '',
        telephone: '',
        number: '',
        address: '',
        photo1: '',
        photo2: '',
      } as any,
    });

    context.emit('update', {
      title: t('realAuth'),
    })

    onMounted(() => {
      getAuth()
    })

    // 获取实名
    const getAuth = () => {
      realAuthInfoAPI().then((res: any) => {
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
      realAuthCreateAPI(params).then((res: any) => {
        NotifyPositive(t('submittedSuccess'))
        $router.push({ name: 'UserIndex' })
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
:deep(.q-field__control) {
  background-color: #F5F6FA !important;
  height: 55px;
  box-shadow: none !important;
}

:deep(.q-field__marginal) {
  height: 55px;
}

:deep(.q-field--labeled .q-field__native) {
  padding: 0;
}

:deep(.userInfo-input .q-field__native) {
  text-align: end;
}

:deep(.q-field__label) {
  top: 20px;
}

:deep(.q-btn) {
  min-height: 44px;
}

:deep(.q-field--standout.q-field--rounded .q-field__control) {
  border-radius: 25px;
}

:deep(.q-field__control:before) {
  color: #999999 !important;
  background: #F5F6FA !important;
}

:deep(.q-field__native) {
  color: #999999 !important;
  font-weight: 500 !important;
  font-family: PingFangSC-Medium, sans-serif;
  line-height: 20px;
}

:deep(.q-field__prepend .q-field--standout .q-field--highlighted) {
  color: #999999 !important;
}
</style>
