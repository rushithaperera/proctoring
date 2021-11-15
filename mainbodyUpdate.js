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
      document.getElementById("testEnd").addEventListener("click", () => {
        autoProctorTest.stop();
      });
      document.getElementById("testReload").addEventListener("click", () => {
        window.location.reload();
      });
    } catch (err) {
    }
  }

  init();

})