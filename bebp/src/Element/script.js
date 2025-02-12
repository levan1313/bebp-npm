var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function oa_fetchLeaderboard() {
    return __awaiter(this, void 0, void 0, function () {
        var data, leaderboardBody_1, leaderboardBody;
        return __generator(this, function (_a) {
            data = {
                id: "dummy-leaderboard",
                title: "Dummy Leaderboard",
                items: [
                    {
                        amount: 1500,
                        coinId: "coin123",
                        leaderboardRecordId: 1,
                        placement: 1,
                        playerId: 101,
                        playerUsername: "PlayerOne",
                        prizeAmount: 5000
                    },
                    {
                        amount: 1200,
                        coinId: "coin456",
                        leaderboardRecordId: 2,
                        placement: 2,
                        playerId: 102,
                        playerUsername: "PlayerTwo",
                        prizeAmount: 3000
                    },
                    {
                        amount: 1000,
                        coinId: "coin789",
                        leaderboardRecordId: 3,
                        placement: 3,
                        playerId: 103,
                        playerUsername: "PlayerThree",
                        prizeAmount: 2000
                    }
                ]
            };
            try {
                leaderboardBody_1 = document.getElementById("oa_leaderboard-rows");
                if (!leaderboardBody_1) {
                    console.error("Leaderboard container not found");
                    return [2 /*return*/];
                }
                leaderboardBody_1.innerHTML = ""; // Clear existing rows
                // ✅ Ensure `dummyData.items` exists and is an array
                if (!data || !data.items || !Array.isArray(data.items)) {
                    console.error("Invalid dummy data structure", data);
                    leaderboardBody_1.innerHTML = "\n              <tr>\n                  <td colspan=\"4\" class=\"oa_text-center text-danger\">\n                      Invalid data format\n                  </td>\n              </tr>\n          ";
                    return [2 /*return*/];
                }
                // ✅ Loop through `items` and insert rows
                data.items.forEach(function (player, index) {
                    var row = document.createElement("tr");
                    row.classList.add("oa_leaderboard-table__row");
                    row.innerHTML = "\n              <td class=\"oa_leaderboard-table__cell\">".concat(index + 1, "</td>\n              <td class=\"oa_leaderboard-table__cell\">").concat(player.playerUsername, "</td>\n              <td class=\"oa_leaderboard-table__cell\">").concat(player.amount, "</td>\n              <td class=\"oa_leaderboard-table__cell\">").concat(player.prizeAmount, "</td>\n          ");
                    leaderboardBody_1.appendChild(row);
                });
            }
            catch (error) {
                console.error("Error populating leaderboard data:", error);
                leaderboardBody = document.getElementById("oa_leaderboard-rows");
                if (leaderboardBody) {
                    leaderboardBody.innerHTML = "\n              <tr>\n                  <td colspan=\"4\" class=\"oa_text-center text-danger\">\n                      Failed to load data\n                  </td>\n              </tr>\n          ";
                }
            }
            return [2 /*return*/];
        });
    });
}
// ✅ Call function
oa_fetchLeaderboard();
