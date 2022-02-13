<i18n>
{
  "ja": {
    "title": "デジタル墓地",
    "menu": {
      "top": "トップページ",
      "inspire": "インスパイア"
    }
  },
  "en": {
    "title": "DigitalCemetery",
    "menu": {
      "top": "Toppage",
      "inspire": "Inspire"
    }
  }
}
</i18n>

<template>
  <v-app light>
    <v-navigation-drawer
      v-model="isDrawerShown"
      :mini-variant="isMiniVariant"
      app
    >
      <v-list>
        <v-list-item link exact :to="localePath({name: 'index'})" nuxt>
          <v-list-item-action>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('menu.top')" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item link exact :to="localePath({name: 'inspire'})" nuxt>
          <v-list-item-action>
            <v-icon>mdi-chart-bubble</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('menu.inspire')" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
    >
      <v-app-bar-nav-icon @click.stop="isDrawerShown = !isDrawerShown" />
      <v-btn
        icon
        @click.stop="isMiniVariant = !isMiniVariant"
      >
        <v-icon>mdi-{{ `chevron-${isMiniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="$t('title')" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';

@Component({
  components: {}
})

export default class DefaultLayout extends Vue {
  private isDrawerShown: boolean = false
  private isMiniVariant: boolean = false
}
</script>
