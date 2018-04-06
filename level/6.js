//Download by http://www.veryhuo.com/down
//关卡页面9波强度最大为10
(function () {
	var Pro = oSnowPea.prototype,
		NCard = Pro.PicArr[Pro.CardGif],
		NGif = Pro.PicArr[Pro.NormalGif],
		o = {
			PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine],
			ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie],
			PicArr: ['images/interface/background1.jpg', 'images/interface/crater1.png', NCard, NGif],
			backgroundImage: 'images/interface/background1.jpg',
			ZombieKind: 10,
			FlagNum: 9,
			ArrayZombies: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie],
			CanSelectCard: 0,
			LevelName: '关卡 1-6',
			LargeWaveFlag: {
				9: $('imgFlag1')
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
		a1: [3, 5, 8],
		f: $f('a<b'),
		a2: [1, 2, 3, 9]
	};
	FlagToMonitor = {
		a1: [8],
		f: $f('a==b'),
		a2: [ShowFinalWave]
	};
	FlagToEnd = function () {
		(NewImg('imgSF', 'images/card/plants/SnowPea.png', 'left:827px;top:525px;', 1)).onclick = function () {
			GetNewCard(this, oSnowPea, 0, 7)
		};
		NewImg('PointerUD', 'images/interface/PointerDown.gif', 'top:490px;left:836px;', 1);
		Win = 1;
	};
	GetZombieR = function (o) {
		return Math.floor(1 + Math.random() * 5)
	};
	oS.Init(o);
})();
