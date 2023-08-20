<template>
  <div>
    <div>
      ログインユーザの情報
      <br />
      名前：{{ userinfo?.tenants[0].user_attribute.name }}
      <br />
      メールアドレス：{{ userinfo?.email }}
      <br />
      ロール：{{ userinfo?.tenants[0].envs[2].roles[0].display_name }}
      <br />
      料金プラン：{{
        userinfo?.tenants[0].plan_id ? userinfo?.tenants[0].plan_id : "未設定"
      }}
      <br />
    </div>
    <div>
      <br />
      <br />
      ユーザ一覧
      <table>
        <thead>
          <tr>
            <th>テナントID</th>
            <th>UUID</th>
            <th>名前</th>
            <th>メールアドレス</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.tenant_name }}</td>
            <td>{{ user.id }}</td>
            <td>{{ user.attributes.name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT || "";

export default defineComponent({
  setup() {
    const users = ref<any[]>([]);
    const userinfo = ref<any>();

    const jwtToken = window.localStorage.getItem("SaaSusIdToken");

    const getUsers = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINT}/users`, {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        });
        users.value = res.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const getUserInfo = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINT}/userinfo`, {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        });
        userinfo.value = res.data;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    onMounted(() => {
      getUsers();
      getUserInfo();
    });

    return {
      users,
      userinfo,
    };
  },
});
</script>
