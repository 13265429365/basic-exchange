<template>
  <q-dialog v-model="Show">
    <q-card style="width: 380px;">
      <q-card-section style="padding: 20px;">
        <div class="row no-wrap">
          <div class="text-weight-bold text-color-3 text-h5">
            {{form.arguments}}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </div>
        <div class="q-mt-lg">
          <q-form>
            <!-- 修改邮箱 -->
            <div v-if="form.arguments=='Edit Email'">
              <div class="q-mb-xs">Email</div>
              <q-input standout class="q-mb-md" v-model="form.content" placeholder="Email" />
            </div>
            <!-- 修改密码-->
            <div v-if="form.arguments=='Edit Password'">
              <div class="q-mb-xs">Password</div>
              <q-input class="q-mb-md" v-model="form.content" standout :type="isPwd ? 'password' : 'text'"
                placeholder="Password">
                <template v-slot:append>
                  <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
              <div class="q-mb-xs">Confirm Password</div>
              <q-input class="q-mb-md" v-model="form.content" standout :type="isPwd ? 'password' : 'text'"
                placeholder="Confirm Password">
                <template v-slot:append>
                  <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer" @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>
            <!-- 修改秘钥 -->
            <div v-if="form.arguments=='Edit Secret Key'">
              <div class="q-mb-xs">Secret Key</div>
              <q-input class="q-mb-md" v-model="form.content" standout :type="isPwd ? 'password' : 'text'"
                placeholder="Secret Key">
                <template v-slot:append>
                  <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
              <div class="q-mb-xs">Confirm Secret Key</div>
              <q-input class="q-mb-md" v-model="form.content" standout :type="isPwd ? 'password' : 'text'"
                placeholder="Confirm Secret Key">
                <template v-slot:append>
                  <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer" @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>
            <!-- 绑定电话 -->
            <div v-if="form.arguments=='Bind Phone Number'">
              <div class="q-mb-xs">Phone</div>
              <div class="row no-wrap">
                <q-select @update:modelValue="newValue($event)" v-model="form.areaCode" :options="options"
                  class="q-mb-md q-mr-sm select" standout>
                  <template v-slot:prepend>
                    <q-img width="24px" height="16px" src="page_bg/china.png" @click.stop.prevent />
                    <q-icon name="keyboard_arrow_down" />
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <q-img width="24px" height="16px" src="page_bg/china.png" @click.stop.prevent />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:append>
                    <div>+86</div>
                  </template>
                </q-select>
                <q-input class="q-mb-md full-width" standout v-model="form.content" placeholder="Telphone">
                  <template v-slot:append>
                    <div @click="startCountdown()" style="font-size: 14px" :class="['text-primary',{'disabled':countdown}]">SendCode{{countdown?`(${time})`:''}}</div>
                  </template>
                </q-input>
              </div>
              <div class="q-mb-xs">Code</div>
              <q-input standout class="q-mb-md" v-model="form.content" placeholder="Code" />
            </div>
            <div class="row justify-center q-mt-lg">
              <q-btn class="q-mr-md text-color-3" unelevated rounded no-caps @click="Show=false"
                style="background: #F3F5F5;height: 40px;width: 160px;" label="Cancel"></q-btn>
              <q-btn @click="Show=false" class="" unelevated rounded no-caps style="height: 40px;width: 160px;"
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
  // 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
  export default defineComponent({
    name: 'settingsView',
    setup() {
      let store = reactive({
        // 发送短信倒计时
        time: 30,
        countdown: false,
        //
        Show: false,
        isPwd: false,
        options: [
          { label: '+86', value: '中国' },
          { label: '+866', value: '香港' },
        ],
        form: {
          content: '',
          arguments: 'Edit',
        },
      });
      let showEdit = (row : { content : string, arguments : string }) => {
        console.log(row);
        store.form = row
        store.Show = true
      }
      return {
        ...toRefs(store),
        showEdit,
        startCountdown() {
          store.countdown = true
          let times = setInterval(()=>{
            if (store.time>0) {
              store.time--
            } else {
              store.countdown = false
              store.time = 30
              clearInterval(times)
            }
          }, 1000)
        }
      }
    },
  });
</script>
<style lang="scss" scoped>
  @import url("../../../../css/pcCss.css");
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
