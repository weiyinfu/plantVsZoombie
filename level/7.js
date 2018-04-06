//关卡页面20波强度最大为15
(function () {
	var Pro = oChomper.prototype,
		NCard = Pro.PicArr[Pro.CardGif],
		NGif = Pro.PicArr[Pro.NormalGif],
		o = {
			PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea],
			ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie],
			PicArr: ['images/interface/background1.jpg', NCard, NGif],
			backgroundImage: 'images/interface/background1.jpg',
			ZombieKind: 10,
			FlagNum: 20,
			ArrayZombies: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie],
			CanSelectCard: 0,
			LevelName: '关卡 1-7',
			LargeWaveFlag: {
				10: $('imgFlag3'),
				20: $('imgFlag1')
			},
			LoadMusic: function () {
				NewEle('oEmbed', 'embed', 'width:0;height:0;', {
					src: 'music/Look up at the.swf'
				}, 1);
			}
		};
	LevelStart = function () {
		//开始
		obDAll.removeChild($('oEmbed'));
		NewEle('oEmbed', 'embed', 'width:0;height:0;', {
			src: 'music/UraniwaNi.swf'
		}, 1);
		SetBlock($('dTop'));
		InitLawnMower(); //剪草机
		SetBlock($('dFlagMeter'));
		PrepareGrowPlants(function () {
			oP.Monitor(0); //全局监控计时器
			BeginCool(); //卡片的开场冷却
			AutoProduceSun(25); //自动掉落阳光
			DelayTime(0, 15, function () {
				oP.AddZombiesFlag();
				SetVisible($('tdFlagMeter'));
				SetBlock($('imgFlag1'));
			});
		});
	};
	StartGame = LevelStart;
	FlagToSumNum = {
		a1: [3, 5, 9, 10, 13, 15, 19],
		f: $f('a<b'),
		a2: [1, 2, 3, 10, 4, 5, 6, 15]
	};
	FlagToMonitor = {
		a1: [9, 19],
		f: $f('a==b'),
		a2: [ShowLargeWave, ShowFinalWave]
	};
	FlagToEnd = function () {
		(NewImg('imgSF', 'images/card/plants/Chomper.png', 'left:667px;top:220px;', 1)).onclick = function () {
			GetNewCard(this, oChomper, 0, 8)
		};
		NewImg('PointerUD', 'images/interface/PointerDown.gif', 'top:185px;left:676px;', 1);
		Win = 1;
	};
	GetZombieR = function (o) {
		return Math.floor(1 + Math.random() * 5)
	};
	oS.Init(o);
})();
