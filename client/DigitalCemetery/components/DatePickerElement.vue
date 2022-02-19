<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          :label="pickerLabel"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="activePicker"
        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
        :min="min"
        @change="save"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

@Component
export default class DatePickerElement extends Vue {
    private activePicker:string|null = null
    private date:string|null = null
    private menu:boolean = false

    @Prop({default: "1950-01-01"})
    min!:string

    @Prop({default: "Date-Picker"})
    pickerLabel!:string

    @Watch("menu")
    onMenuChanged(val:boolean, oldVal:boolean) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
    }

    save(date:string) {
        this.menu = false
        this.$emit("dateUpdate", this.date);
    }
}
</script>