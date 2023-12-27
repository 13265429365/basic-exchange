<template>
  <q-dialog v-model="show">
    <q-card style="width: 380px;">
      <q-card-section style="padding: 20px;">
        <div class="row no-wrap">
          <div class="text-weight-bold text-color-3 text-h6">
            {{ form.headTitle }}
          </div>
          <q-space />
          <q-btn class="text-color-6" icon="close" flat round dense v-close-popup />
        </div>
        <div class="q-mt-lg">
          <!-- 修改基础资料 -->
          <q-form v-if="form.type == 'info'">
            <div class="q-mb-xs">{{ form.title }}</div>

            <!-- 头像 -->
            <div v-if="form.title == 'Avatar'" class="row justify-center q-px-md q-mb-md q-py-sm">
              <div class="relative">
                <q-avatar style="width: 80px;height: 80px;">
                  <q-img :src="form['arguments'] ? imageSrc(form['arguments']) : imageSrc('')" />
                  <uploader type="avatar"
                    :uploaderStyle="{ position: 'absolute', right: '0', bottom: '0', width: '27px', height: '27px', background: 'transparent' }"
                    :respValue="form.avatar" @upload="upload"></uploader>
                </q-avatar>
              </div>
            </div>

            <!-- 性别 -->
            <div v-else-if="form.title == 'Gender'" class="row justify-between q-px-md q-mb-md q-py-sm"
              style="border-radius: 4px;border: 1px solid #DDDDDD;">
              <div class="self-center row">
                <div class="self-center q-ml-sm">{{ sexList[sexIndex].name }}</div>
              </div>
              <q-icon class="self-center" name="expand_more" size="24px"></q-icon>
              <!-- 下拉 -->
              <q-menu auto-close transition-show="jump-down" transition-hide="jump-up">
                <q-list style="min-width: 268px" class="q-py-sm">
                  <q-item @click="selectSex(sexKey)" v-for="(sex, sexKey) in sexList" :key="sexKey" clickable
                    class="row no-wrap items-center">
                    <div>
                      <div style="font-size: 16px;">{{ sex.name }}</div>
                    </div>
                    <q-space />
                  </q-item>
                </q-list>
              </q-menu>
            </div>

            <!-- 生日 -->
            <q-input v-else-if="form.title == 'Birthday'" standout class="q-mb-md" v-model="form['arguments']"
              :placeholder="arguments">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="form['arguments']" style="width: 340px;">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn :label="$t('cancel')" color="primary" flat v-close-popup />
                    <q-btn @click="selectDate" :label="$t('confirm')" color="primary" flat v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-input>

            <q-input v-else standout class="q-mb-md" v-model="form['arguments']" :placeholder="arguments">
            </q-input>

            <div class="row justify-center q-mt-lg">
              <q-btn class="q-mr-md text-color-3" unelevated rounded no-caps @click="show = false"
                style="background: #F3F5F5;height: 40px;width: 160px;" label="Cancel"></q-btn>
              <q-btn @click="submit()" class="" unelevated rounded no-caps style="height: 40px;width: 160px;"
                color="primary" label="Save" />
            </div>
          </q-form>

          <!-- 修改密码、安全码 -->
          <q-form v-else>
            <div>
              <div class="q-mb-xs">{{ form.title }}</div>
              <q-input standout class="q-mb-md" :type="isPwd ? 'password' : 'text'" v-model="form.oldPassword"
                placeholder="oldPassword">
                <template v-slot:append>
                  <q-icon @click="isPwd = !isPwd" :name="isPwd ? 'o_visibility' : 'o_visibility_off'"></q-icon>
                </template>
              </q-input>
            </div>
            <div>
              <div class="q-mb-xs">Confirm {{ form.title }}</div>
              <q-input standout class="q-mb-md" :type="isPwd2 ? 'password' : 'text'" v-model="form.newPassword"
                placeholder="newPassword">
                <template v-slot:append>
                  <q-icon @click="isPwd2 = !isPwd2" :name="isPwd2 ? 'o_visibility' : 'o_visibility_off'"></q-icon>
                </template>
              </q-input>
            </div>
            <div class="row justify-center q-mt-lg">
              <q-btn class="q-mr-md text-color-3" unelevated rounded no-caps @click="show = false"
                style="background: #F3F5F5;height: 40px;width: 160px;" label="Cancel"></q-btn>
              <q-btn @click="submit()" class="" unelevated rounded no-caps style="height: 40px;width: 160px;"
                color="primary" label="Save" />
            </div>
          </q-form>

        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import uploader from 'src/components/uploader.vue';
import { updateInfo, updatePassword } from 'src/apis/user';
import { date } from 'quasar';
import { imageSrc } from 'src/utils';


export default defineComponent({
  name: 'EditIndex',
  components: {
    uploader,
  },
  setup(props: any, context: any) {

    const state = reactive({

      // 是否显示本弹窗
      show: false,

      // 是否显示密码
      isPwd: false,
      // 是否显示确认密码
      isPwd2: false,

      // 表单
      form: {} as any,

      // 表示这个页面只需要的参数
      arguments: '' as any,

      // 性别
      sexList: [
        { name: 'male', value: 1 },
        { name: 'female', value: 2 },
      ],
      sexIndex: 0,
    });

    // 打开弹窗
    const showEdit = (row: any) => {
      state.form = { ...row }
      console.log(row);

      // 预设性别
      if (row.content == 0) {
        state.sexIndex = row.content
      } else {
        state.sexIndex = row.content - 1
      }



      // 
      state.arguments = state.form.arguments

      if (row.title == 'Birthday') {
        state.form.arguments = date.formatDate(row.content * 1000, 'YYYY-MM-DD')
      } else {
        // 如果父页面资料存在，就赋值给本页面的参数值
        state.form.content != '' ?
          state.form.arguments = state.form.content :
          state.form.arguments = ''
      }


      state.show = true
    }

    // 执行接口
    const submit = () => {
      if (state.form.type == 'info') {
        // 修改个人信息
        let params = {} as any
        if (state.form.title == 'Birthday') {
          params[state.arguments] = Number(date.formatDate(state.form['arguments'], 'X'))
        } else {
          params[state.arguments] = state.form['arguments']
        }
        updateInfo(params).then((res: any) => {
          console.log(res);
          state.show = false
          context.emit('UserInfo')
        })

      } else {

        // 修改密码
        if (state.form.oldPassword.length < 5 || state.form.newPassword.length < 5) {
          return false
        }
        const params = {
          type: 1,
          oldPassword: state.form.oldPassword,
          newPassword: state.form.newPassword,
        } as any
        if (state.form.title != 'Password') {
          params.type = 2
        }
        console.log(params);

        updatePassword(params).then((res: any) => {
          console.log(res);
          state.show = false
        })
      }

    }

    const upload = (url: string) => {
      state.form['arguments'] = url
    }

    const selectSex = (sexKey: any) => {
      state.sexIndex = Number(sexKey)
      state.form['arguments'] = state.sexIndex + 1
      console.log(state.form['arguments'], state.sexIndex);

    }

    const selectDate = () => {
      // state.form['arguments'] = date.formatDate(state.form['arguments'], 'X')
      console.log(state.form['arguments']);
    }

    const uploaded = (url: any) => {
      state.form.avatar = url
    }

    return {
      imageSrc,
      ...toRefs(state),
      showEdit,
      submit,
      uploaded,
      upload,
      selectSex,
      selectDate,
    }
  },
});
</script>
<style lang="scss" scoped></style>
