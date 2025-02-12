import {SettingGroup, NumberSetting, StringSetting, ColorSetting} from "builder-settings-types";


export default {
  getSettings: () => {
    return new SettingGroup({
      title: "Element Settings",
      settings: {
        backgroundColor: new ColorSetting({ default: "#ff0000" }),
        text: new StringSetting({ default: "textdasdasdasd" }),
        width: new NumberSetting({ default: 200 }),
      }
    })
  }
}
