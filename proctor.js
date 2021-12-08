window.addEventListener("load", function () {

      const clientID = "8b88Yarr";
      const clientSecret = "4vaNDdgPX3JuHkh";
      const testAttemptId = CryptoJS.lib.WordArray.random(5).toString();

      const hashedTestAttemptId = CryptoJS.SHA256(testAttemptId + clientSecret).toString();

      const apSettings = {
        tenantId: clientID,
        testAttemptId: testAttemptId,
        hashedTestAttemptId: hashedTestAttemptId,
        trackingOptions: {
          audio: true,
          numHumans: true,
          tabSwitch: true,
          photosAtRandom: true,
          numPhotosAtRandom: 5,
          userScreen: true,
          captureSwitchedTab: true,
          preventMultipleScreens: true,
          testTakerPhoto: true,
          forceCaptureSwitchedTab: false,
          forcePreventMultipleScreens: false,
        },
        restrictConsole: false,
        evidencePushInterval: 5,
        informUser: true,
        userDetails: {},
        domain: "https://www.autoproctor.co/"
      }

      async function init() {
        try {
          autoProctorTest = await initAutoProctor(apSettings);
          document.getElementById("testStart").addEventListener("click", () => {
            console.log('start');
            autoProctorTest.start();
          });
          console.log(document.getElementById("testEnd"));
          document.getElementById("testEnd").addEventListener("click", () => {
            autoProctorTest.stop();
          });
          window.addEventListener("apStopMonitoring", async () => {
                        const response = await autoProctorTest.getEvidenceReport(
                            apSettings.tenantId,
                            apSettings.testAttemptId,
                            apSettings.hashedTestAttemptId
                        );
                        let html = `<section class="py-20">
                                        <div class="container mx-auto px-4">
                                            <div class="flex flex-wrap text-center">
                                            <div class="mb-8 w-full md:w-1/2 lg:w-1/4">
                                                <h4 class="mb-2 text-gray-500">Device</h4>
                                                <span class="text-3xl lg:text-2xl font-bold">${
                                                    response.attemptDetails.device
                                                }</span>
                                            </div>
                                            <div class="mb-8 w-full md:w-1/2 lg:w-1/4">
                                                <h4 class="mb-2 text-gray-500">Started</h4>
                                                <span class="text-3xl lg:text-2xl font-bold">${
                                                    response.attemptDetails.startedAt
                                                }</span>
                                            </div>
                                            <div class="mb-8 w-full md:w-1/2 lg:w-1/4">
                                                <h4 class="mb-2 text-gray-500">Finished</h4>
                                                <span class="text-3xl lg:text-2xl font-bold">${
                                                    response.attemptDetails.finishedAt
                                                }</span>
                                            </div>
                                            <div class="mb-8 w-full md:w-1/2 lg:w-1/4">
                                                <h4 class="mb-2 text-gray-500">Trust Score</h4>
                                                <span class="text-3xl lg:text-2xl font-bold">${
                                                    response.attemptDetails.trustScore * 100
                                                } %</span>
                                            </div>
                                            </div>
                                        </div>
                                        </section><div
                                            class="
                                                md:ml-auto
                                                border-t border-gray-200
                                                inset-x-0
                                                transform
                                                rh-assg-result-candidate__scores
                                            "
                                        >
                                    <div class="flex flex-col">
                                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                    <table class="min-w-full divide-y divide-gray-200" id="rh-ap-section-table">
                                                        <thead class="bg-gray-50">
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    class="
                                                                        px-6
                                                                        py-3
                                                                        text-left text-xs
                                                                        font-medium
                                                                        text-gray-500
                                                                        uppercase
                                                                    "
                                                                >
                                                                    Number
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    class="
                                                                        px-6
                                                                        py-3
                                                                        text-left text-xs
                                                                        font-medium
                                                                        text-gray-500
                                                                        uppercase
                                                                    "
                                                                >
                                                                    Type
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    class="
                                                                        px-6
                                                                        py-3
                                                                        text-left text-xs
                                                                        font-medium
                                                                        text-gray-500
                                                                        uppercase
                                                                    "
                                                                >
                                                                    Time
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    class="
                                                                        px-6
                                                                        py-3
                                                                        text-left text-xs
                                                                        font-medium
                                                                        text-gray-500
                                                                        uppercase
                                                                    "
                                                                >
                                                                    Capture
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="bg-white divide-y divide-gray-200">`;

                        response.reportData.forEach((report, index) => {
                            html += `<tr>
                                                                <td
                                                                    class="
                                                                        px-6
                                                                        py-4
                                                                        whitespace-nowrap
                                                                        text-sm
                                                                        font-medium
                                                                        text-gray-900
                                                                    "
                                                                >
                                                                    ${index + 1}
                                                                </td>
                                                                <td
                                                                    class="
                                                                        px-6
                                                                        py-4
                                                                        whitespace-nowrap
                                                                        text-sm
                                                                        font-medium
                                                                        text-gray-900
                                                                    "
                                                                >
                                                                    ${report.message}
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    ${report.occurredAt}
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    ${
                                                                        report?.evidenceUrl
                                                                            ? report?.miscData
                                                                                ? report?.miscData?.dataType === "audio"
                                                                                    ? `<a href="${report.evidenceUrl}"><audio controls class="media-audio">
                                                                            <source src="${report.evidenceUrl}">
                                                                        </audio></a>`
                                                                                    : `<a href="${report.evidenceUrl}"><img class="media-image" src="${report.evidenceUrl}" /></a>`
                                                                                : `-`
                                                                            : `-`
                                                                    }


                                                                </td>
                                                            </tr>`;
                        });

                        html += `</tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                        document.getElementById("ap-test-report").innerHTML = html;
                    });
             
          document.getElementById("testReload").addEventListener("click", () => {
            window.location.reload();
          });
        } catch (err) {
        }
      }

      init();

    })