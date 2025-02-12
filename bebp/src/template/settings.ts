import {
  SettingGroup,
  NumberSetting,
  StringSetting,
  ColorSetting,
  SelectSetting,
} from "builder-settings-types";
import { promotion, PromotionResponseT } from "element_interfaces";

export default {
  getSettings: () => {
    return new SettingGroup({
      title: "leaderboard Settings",
      settings: {
        backgroundColor: new ColorSetting({ default: "#ff0000" }),
        tableRow: new ColorSetting({ default:"#112200" }),
        maxWidth: new NumberSetting({ default: 1000 }),    
      },
    });
  },
};

// transalte this           
// 
// getOptions: async () => {
//   return (await window.myFetch(promotion)).data.leaderboards.map((lb) => ({
//     name: lb.title,
//     value: lb.id,
//   }));
// }, 
// 
// with Atomic