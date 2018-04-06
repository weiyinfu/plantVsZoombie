(function() {
    var o = {
        PicArr: ['images/Logo.jpg', ShadowPNG,
            'images/LawnMower.gif',
            'images/ZombiesWon.png',
            'images/PrepareGrowPlants.gif',
            'images/LargeWave.gif',
            'images/FinalWave.gif',
            'images/Sun.gif',
            'images/interface/PointerUP.gif',
            'images/interface/PointerDown.gif',
            'images/interface/Shovel.png',
            'images/interface/SunBack.png',
            'images/interface/ShovelBack.png',
            'images/interface/GrowSoil.png',
            'images/interface/SeedChooser_Background.png',
            'images/interface/Button.png',
            'images/interface/LogoLine.png',
            'images/interface/dialog_topleft.png',
            'images/interface/dialog_topmiddle.png',
            'images/interface/dialog_topright.png',
            'images/interface/dialog_centerleft.png',
            'images/interface/dialog_centermiddle.png',
            'images/interface/dialog_centerright.png',
            'images/interface/SelectorScreen_Almanac.png',
            'images/interface/SelectorScreen_AlmanacHighlight.png',
            'images/interface/dialog_bottomleft.png',
            'images/interface/dialog_bottommiddle.png',
            'images/interface/dialog_bottomright.png',
            'images/interface/Almanac_IndexBack.jpg',
            'images/interface/Almanac_IndexButton.png',
            'images/interface/Almanac_CloseButton.png',
            'images/interface/Almanac_CloseButtonHighlight.png',
            'images/interface/Almanac_IndexButtonHighlight.png',
            'images/interface/Almanac_PlantBack.jpg',
            'images/interface/Almanac_PlantCard.png',
            'images/interface/Almanac_ZombieBack.jpg',
            'images/interface/Almanac_ZombieCard.png',
            'images/interface/AwardScreen_Back.jpg'
        ],
        LoadMusic: function() {
            NewEle('oEmbed', 'embed', 'width:0;height:0;', {
                src: 'music/Faster.swf'
            }, 1);
        }
    };
    LoadAccess = function() {
        obDAll.innerHTML = '<div id="dLogo" style="position:absolute;left:0;top:0;width:900px;height:600px;background:#000 url(images/Logo.jpg) no-repeat;z-index:1"><span style="position:absolute;line-height:1.5;left:349px;top:10px;width:524px;text-align:right;font-size:15pt; font-family:黑体;color:#FF6600; top:32px">欢迎来到<span style="font-family:Verdana">LonelyStar</span>的<span style="font-family:Verdana">JavaScript</span>版植物大战僵尸<br><b>程序的开发目的是为了学习，所有的版权归Pop Cap所有</b></span><div id="LogoWord" style="position:absolute;color:#FFFF00;left:0;top:510px;width:100%;height:90px;"><span style="position:absolute;font-size:15pt;width:321px;height:69px; font-family:黑体;line-height:69px; left:60px; top:10px;cursor:pointer;background:url(images/interface/LogoLine.png) no-repeat center -5px;text-align:center" onclick="SetBlock($(\'dSelectModal\'))">点击开始<span style="font-size:15pt; font-family:Verdana;color:#FFFF00;cursor:pointer;">JavaScript</span>版。。。</span><span style="position:absolute;font-size:11pt;left:407px; top:29px;line-height:1.5;font-weight:bold"><!-- 修正一些兼容问题，增加新的植物进行测试(09.17)<br><a target="_blank" style="cursor:pointer;color:#FFFF00;" href="http://www.lonelystar.org/view/Index.asp">点击这里到网站留言板留言，谢谢。(无需注册登陆)</a> --></span></div></div>';
    };
    oS.Init(o);
})();