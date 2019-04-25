
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("applications").del()
    .then(function () {
      // Inserts seed entries
      return knex("applications").insert([
        {
          id: "7e67ac23-5230-4c1e-92ad-a3df62918160",
          name: "media_player",
          version:"1"
        },
        {
          id: "99f63c90-3bc3-44d7-a1e7-9abeda0d5dfd",
          name: "media_player",
          version:"1.2"
        },
        {
          id: "184f012a-462c-4a00-bdac-24c33040667b",
          name: "media_player",
          version:"1.3"
        },
        {
        id: "4519c283-649f-4919-9fb5-1caf3e190747",
        name: "com.delphi.hmi.referenceaudioapp",
        version: "0.1"
    },
    {
        id: "44b75f44-f855-4ee1-8dd9-94677748471d",
        name: "com.aptiv.launcher",
        version: "0.1"
    },
    {
        id: "52753b63-3dba-427f-830b-eafdfbf53f91",
        name: "com.delphi.hmi.opengltest",
        version: "0.1"
    },
    {
        id: "17378b85-8473-4136-8f68-46ad650d6915",
        name: "com.aptiv.traffic.trafficrefapp",
        version: "0.1"
    },
    {
        id: "a8c302eb-d25e-4133-926c-83b6764c3c52",
        name: "com.android.car.dialer",
        version: "0.1"
    },
    {
        id: "17e2f6ae-73f3-4b07-bae3-b8618ca75bd6",
        name: "com.android.contacts",
        version: "0.1"
    },
    {
        id: "bcd9ee63-5048-4f59-bbf6-cb54c69f0f57",
        name: "com.android.calculator2",
        version: "0.1"
    },
    {
        id: "c2a9db97-df01-4ecb-95e3-05f27b09e360",
        name: "com.aptiv.audiosettings",
        version: "0.1"
    },
    {
        id: "d131848e-e0fb-4b84-9d5e-8322308bbc6d",
        name: "com.android.deskclock",
        version: "0.1"
    },
    {
        id: "08ba1e83-a429-4516-af8d-51c27ef4dd3e",
        name: "com.android.documentsui",
        version: "0.1"
    },
    {
        id:"e877c1ef-c53e-44f3-aa62-bbefd7897f73",
        name:"com.aptiv.hmi.referenceaudioapp",
        version:"0.1"
    },
    {
        id: "9004510c-4d43-4ba2-acc7-549190be2f15",
        name:"com.android.settings",
        version:"0.1"
    },
    {
        id: "5f9ba8d2-bdbf-4008-af2e-1dbafe1f5be1",
        name: "com.aptiv.hvac",
        version: "0.1"
    },
    {
        id: "6ed642ae-9b9a-4af2-b7ba-128cec8b2e21",
        name: "com.aptiv.tuner",
        version: "0.1"
    },
    {
        id: "15f6ba44-c684-4636-b8eb-cd2069380dbb",
        name: "com.android.music",
        version: "0.1"
    },
    {
        id: "85d43108-8d9b-4a66-9f87-702fd0f6cc55",
        name: "com.aptiv.tts.ttsrefapp",
        version: "0.1"
    },
    {
        id: "b3a2e4b6-9018-4c84-92fa-e814fa5e538f",
        name: "com.android.car.settings",
        version: "0.1"
    }

      ]);
  });
};
