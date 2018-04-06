(function () {
	o = {
		PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oSplitPea, oJalapeno, oSpikeweed, oRepeater, oTallNut, oPumpkinHead, oSquash, oFlowerPot, oTorchwood, oThreepeater, oGatlingPea, oTwinSunflower, oSpikerock, oFumeShroom, oCoffeeBean, oGloomShroom, oPuffShroom, oScaredyShroom],
		ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie],
		PicArr: ['images/interface/background1.jpg', 'images/interface/trophy.png'],
		backgroundImage: 'images/interface/background1.jpg',
		ZombieKind: 15,
		FlagNum: 10,
		ArrayZombies: [oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie, oPoleVaultingZombie, oPoleVaultingZombie, oBucketheadZombie, oBucketheadZombie, oBucketheadZombie],
		CanSelectCard: 1,
		LevelName: '小游戏:超乎寻常的压力!',
		LargeWaveFlag: {
			10: $('imgFlag1')
		},
		LoadMusic: function () {
			NewEle('oEmbed', 'embed', 'width:0;height:0;', {
				src: 'music/Look up at the.swf'
			}, 1)
		}
	};
	LevelStart = function () {
		obDAll.removeChild($('oEmbed'));
		NewEle('oEmbed', 'embed', 'width:0;height:0;', {
			src: 'music/Watery Graves.swf'
		}, 1);
		SetBlock($('dTop'));
		InitLawnMower();
		SetBlock($('dFlagMeter'));
		PrepareGrowPlants(function () {
			oP.Monitor(0);
			BeginCool();
			AutoProduceSun(25);
			DelayTime(0, 20, function () {
				oP.AddZombiesFlag();
				SetVisible($('tdFlagMeter'));
				SetBlock($('imgFlag1'))
			})
		})
	};
	StartGame = LevelStart;
	FlagToSumNum = {
		a1: [3, 5, 9],
		f: $f('a<b'),
		a2: [1, 5, 10, 30]
	};
	FlagToMonitor = {
		a1: [9],
		f: $f('a==b'),
		a2: [ShowLargeWave]
	};
	FlagToEnd = function () {
		(NewImg('imgSF', 'images/interface/trophy.png', 'left:367px;top:233px;', 1)).onclick = function () {
			alert('感谢使用JSPVZ，敬请期待下一关！');
			SelectModal(0)
		};
		Win = 1
	};
	GetZombieR = function (o) {
		return Math.floor(1 + Math.random() * 5)
	};
	oS.Init(o)
})()
