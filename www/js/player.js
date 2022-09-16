var player;
function playM3u8(url, license, clearkeys) {
    player = new Clappr.Player({
        source: url,
        parentId: '#player',
        preload: 'auto',
        autoPlay: 'true',
        width: '100%',
        height: '100%',

        fullscreenEnabled: 'true',
        hideMediaControl: 'false',
        plugins: [LevelSelector, ClapprPip.PipButton, ClapprPip.PipPlugin, DashShakaPlayback],
        shakaConfiguration: {
            drm: {
                servers: {
                    'com.widevine.alpha': license,
                    'org.w3.clearkey': 'https://cdn4.xaxa.live/keys2/vtvplus.json'
                },
                clearKeys: JSON.parse(clearkeys)
            },

        },

    });
    
    player.configure({'preferredLanguage': 'spa',
                  'streamBufferSize': 15});
    document.title = url; //.split('/')[url.split('/').length - 1];
}
var url = window.location.href.split("#")[1];
try {
   ck = window.atob(window.location.href.split("&ck=")[1]);
} catch{
  ck = '{"":""}';
}
try {
  license = window.atob(window.location.href.split("&l=")[1]);    
} catch {
  license = '';
}
playM3u8(url, license, ck);



document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
var keyCode = e.key;
   window.parent.postMessage(keyCode, '*');
}
