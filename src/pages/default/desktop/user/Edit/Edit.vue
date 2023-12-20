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
            <q-input standout class="q-mb-md" v-model="form['arguments']" placeholder="Email">
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
            <div class="q-mb-xs">{{ form.title }}</div>
            <q-input standout class="q-mb-md" :type="isPwd ? 'password' : 'text'" v-model="form.oldPassword"
              placeholder="oldPassword">
              <template v-slot:append>
                <q-icon @click="isPwd = !isPwd" :name="isPwd ? 'o_visibility' : 'o_visibility_off'"></q-icon>
              </template>
            </q-input>
            <div class="q-mb-xs">Confirm {{ form.title }}</div>
            <q-input standout class="q-mb-md" :type="isPwd2 ? 'password' : 'text'" v-model="form.newPassword"
              placeholder="oldPassword">
              <template v-slot:append>
                <q-icon @click="isPwd2 = !isPwd2" :name="isPwd2 ? 'o_visibility' : 'o_visibility_off'"></q-icon>
              </template>
            </q-input>
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
import { updateInfo, updatePassword, getUserInfo } from 'src/apis/user';
import { NotifyNegative, NotifyPositive } from 'src/utils/notify';


export default defineComponent({
  name: 'EditIndex',
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
    });

    // 打开弹窗
    const showEdit = (row: any) => {
      console.log(row);
      state.form = { ...row }

      // 
      state.arguments = state.form.arguments

      // 如果父页面资料存在，就赋值给本页面的参数值
      state.form.content != '' ?
        state.form.arguments = state.form.content :
        state.form.arguments = ''

      state.show = true
    }

    // 执行接口
    const submit = () => {
      if (state.form.type == 'info') {
        // 修改个人信息
        let params = {} as any
        params[state.arguments] = state.form['arguments']
        updateInfo(params).then((res: any) => {
          console.log(res);
          NotifyPositive('修改成功')
          state.show = false
          context.emit('UserInfo')
        })

      } else {

        // 修改密码
        if (state.form.oldPassword.length < 5) {
          NotifyNegative('密码长度: 5-28')
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
          NotifyPositive('修改成功')
          state.show = false
        })
      }

    }

    return {
      ...toRefs(state),
      showEdit,
      submit,
    }
  },
});
</script>
<style lang="scss" scoped>
// 下拉选框样式
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

// pc版input样式
:deep .q-field--standout .q-field__native {
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep .q-field--standout .q-field__prefix {
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep .q-field--standout .q-field__append {
  color: rgba(0, 0, 0, 0.54) !important;
}

:deep .q-field__marginal {
  height: 40px !important;
}

:deep .q-field--standout:before {
  background: #fff !important;
}

:deep .q-field--standout .q-field__control {
  background: #fff !important;
  height: 40px !important;
  min-height: 40px !important;
  outline: none !important;
  border: 1px solid #DDDDDD;
  box-shadow: none !important;
  border-radius: 4px;
}

:deep .q-field--highlighted .q-field__control {
  background: #fff !important;
  box-shadow: none !important;
}
</style>
