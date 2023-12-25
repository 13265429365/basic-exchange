<template>
  <div class="column full-height" style="width: 100vw;">
    <div class="col page_bg column full-width ">
      <div class="bg">
        <div class="q-pa-md">

          <div class="row justify-between q-mt-lg">
            <div class="col-6  ">
              <div class="text-body1 text-white text-weight-bold q-mb-sm">
                {{ $t('helperYou') }}
              </div>
              <div style="background: rgba(255, 255, 255, 0.12);padding: 7px 16px;max-width: 131px;border-radius: 19px;"
                class="text-center text-white ellipsis">{{ $t('24hoursOnline') }}</div>
            </div>
            <q-img :src="imageSrc('')" width="62px" height="79px" />
          </div>

          <div class="row q-col-gutter-md q-mt-xs">
            <div class="col-4">
              <div class="radius-8 bg-white column items-center" style="padding: 25px 0;">
                <q-img :src="imageSrc('')" width="41px" height="41px" />
                <div class="text-color-3 text-body2 text-weight-medium q-mt-sm">Line</div>
              </div>
            </div>

            <div class="col-4">
              <div class="radius-8 bg-white column items-center" style="padding: 25px 0;">
                <q-img :src="imageSrc('')" width="41px" height="41px" />
                <div class="text-color-3 text-body2 text-weight-medium q-mt-sm">Telegram</div>
              </div>
            </div>

            <div class="col-4">
              <div class="radius-8 bg-white column items-center" style="padding: 25px 0;">
                <q-img :src="imageSrc('')" width="41px" height="41px" />
                <div class="text-color-3 text-body2 text-weight-medium q-mt-sm">Whatsapp</div>
              </div>
            </div>
          </div>
        </div>


        <!-- 帮助中心列表 -->
        <q-list class="q-ma-md bg-white q-mt-lg text-black" style="border-radius: 8px" v-if="articleList.length > 0">
          <q-expansion-item v-for="( helper, helperIndex ) in articleList " :key="helperIndex" :label="helper.name">
            <q-card flat>
              <q-card-section>
                <div class="font-c-6 font-18 text-400" v-html="helper.content"></div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { imageSrc } from 'src/utils/index';
import { getHelpers } from 'src/apis/index'
import { useI18n } from 'vue-i18n'

export default {
  name: 'helpCenter',
  setup(props: any, context: any) {
    const { t } = useI18n();

    const state = reactive({
      articleList: [] as any,
    });

    context.emit('update', {
      title: t('helpers'),
    })

    onMounted(() => {
      getHelpers().then((res: any) => {
        state.articleList = res.data.articleList
        console.log(res);
      })
    })

    return {
      imageSrc,
      ...toRefs(state),
    }
  }
};
</script>

<style lang="scss" scoped>
.bg {

  background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);
  height: 220px;
  border-bottom-left-radius: 8%;
  border-bottom-right-radius: 8%;
}

::v-deep(.q-expansion-item) {
  border-bottom: 1px solid #F4F5FD;
}
</style>
