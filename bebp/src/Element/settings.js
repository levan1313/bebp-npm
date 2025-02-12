{
    getSettings: function () {
        return new SettingGroup({
            title: "leaderboard Settings",
            settings: {
                backgroundColor: new ColorSetting({ default: "#ff0000" }),
                tableRow: new ColorSetting({ default: "#112200" }),
                maxWidth: new NumberSetting({ default: 1000 }),
            },
        });
    },
}
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
