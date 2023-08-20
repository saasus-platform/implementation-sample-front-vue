<template>
  <div></div>
</template>

<script lang="ts">
import axios from "axios";

const LOGIN_URL = import.meta.env.VITE_APP_LOGIN_URL || "";
const API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT || "";

export default {
  mounted() {
    this.startCallback();
  },
  methods: {
    async getToken() {
      const res = await axios.get(
        `${API_ENDPOINT}/credentials?code=${this.$route.query.code}`,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
          withCredentials: true,
        }
      );
      const idToken = res.data.id_token;
      localStorage.setItem("SaaSusIdToken", idToken);
    },
    async navigateByRole() {
      const jwtToken = window.localStorage.getItem("SaaSusIdToken");
      const res = await axios.get(`${API_ENDPOINT}/userinfo`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${jwtToken}`,
        },
        withCredentials: true,
      });
      const role = res.data.tenants[0].envs[0].roles[0].role_name;

      switch (role) {
        case "sadmin":
          this.$router.push("/sadmin/toppage");
          break;
        case "admin":
          this.$router.push("/admin/toppage");
          break;
        default:
          this.$router.push("/user/toppage");
      }
    },
    async startCallback() {
      const code = this.$route.query.code;
      if (code) {
        await this.getToken();
        await this.navigateByRole();
      } else {
        window.location.href = LOGIN_URL;
      }
    },
  },
};
</script>
