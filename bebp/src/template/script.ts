import {leaderboardProgress, promotion} from "onaim-endpoints";

async function oa_fetchLeaderboard() {
  const progressResponse = await window.fetchEndpoint(leaderboardProgress, { query: { LeaderboardRecordId: parseInt(`{{sourceId}}`) }});
    
  const leaderboardHeader = document.getElementById("leadebroard_header");

  if (leaderboardHeader) {
    leaderboardHeader.innerText = progressResponse.data[0].playerUsername;
  }

  //   const data = {
  //       id: "dummy-leaderboard",
  //       title: "Dummy Leaderboard",
  //       items: [
  //           {
  //               amount: 1500,
  //               coinId: "coin123",
  //               leaderboardRecordId: 1,
  //               placement: 1,
  //               playerId: 101,
  //               playerUsername: "PlayerOne",
  //               prizeAmount: 5000
  //           },
  //           {
  //               amount: 1200,
  //               coinId: "coin456",
  //               leaderboardRecordId: 2,
  //               placement: 2,
  //               playerId: 102,
  //               playerUsername: "PlayerTwo",
  //               prizeAmount: 3000
  //           },
  //           {
  //               amount: 1000,
  //               coinId: "coin789",
  //               leaderboardRecordId: 3,
  //               placement: 3,
  //               playerId: 103,
  //               playerUsername: "PlayerThree",
  //               prizeAmount: 2000
  //           }
  //       ]
  //   };

//   try {
//     // Select leaderboard rows container
//     const leaderboardBody = document.getElementById("oa_leaderboard-rows");
//     if (!leaderboardBody) {
//       console.error("Leaderboard container not found");
//       return;
//     }

//     leaderboardBody.innerHTML = ""; // Clear existing rows

//     // ✅ Ensure `dummyData.items` exists and is an array
//     if (
//       !progressResponse ||
//       !progressResponse.data ||
//       !Array.isArray(progressResponse.data)
//     ) {
//       console.error("Invalid dummy data structure", progressResponse.data);
//       leaderboardBody.innerHTML = `
//               <tr>
//                   <td colspan="4" class="oa_text-center text-danger">
//                       Invalid data format
//                   </td>
//               </tr>
//           `;
//       return;
//     }

//     // ✅ Loop through `items` and insert rows
//     progressResponse.data.forEach((player, index) => {
//       const row = document.createElement("tr");
//       row.classList.add("oa_leaderboard-table__row");

//       row.innerHTML = `
//               <td class="oa_leaderboard-table__cell">${index + 1}</td>
//               <td class="oa_leaderboard-table__cell">${
//                 player.playerUsername
//               }</td>
//               <td class="oa_leaderboard-table__cell">${player.amount}</td>
//               <td class="oa_leaderboard-table__cell">${player.prizeAmount}</td>
//           `;

//       leaderboardBody.appendChild(row);
//     });
//   } catch (error) {
//     console.error("Error populating leaderboard data:", error);
//     const leaderboardBody = document.getElementById("oa_leaderboard-rows");
//     if (leaderboardBody) {
//       leaderboardBody.innerHTML = `
//               <tr>
//                   <td colspan="4" class="oa_text-center text-danger">
//                       Failed to load data
//                   </td>
//               </tr>
//           `;
//     }
//   }
}

// ✅ Call function
oa_fetchLeaderboard();
