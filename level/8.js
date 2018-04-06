//Download by http://www.veryhuo.com/down
//关卡页面10波强度最大为10
(function () {
	var Pro = oRepeater.prototype,
		NCard = Pro.PicArr[Pro.CardGif],
		NGif = Pro.PicArr[Pro.NormalGif],
		o = {
			PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper],
			ZName: [oZombie, oConeheadZombie, oBucketheadZombie],
			PicArr: ['images/interface/background1.jpg', NCard, NGif],
			backgroundImage: 'images/interface/background1.jpg',
			ZombieKind: 10,
			FlagNum: 10,
			ArrayZombies: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oBucketheadZombie],
			CanSelectCard: 1,
			LevelName: '关卡 1-8',
			LargeWaveFlag: {
				10: $('imgFlag1')
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
		a1: [3, 5, 9],
		f: $f('a<b'),
		a2: [1, 2, 3, 10]
	};
	FlagToMonitor = {
		a1: [9],
		f: $f('a==b'),
		a2: [ShowLargeWave]
	};
	FlagToEnd = function () {
		(NewImg('imgSF', 'images/card/plants/Repeater.png', 'left:827px;top:525px;', 1)).onclick = function () {
			GetNewCard(this, oRepeater, 0, 9)
		};
		NewImg('PointerUD', 'images/interface/PointerDown.gif', 'top:490px;left:836px;', 1);
		Win = 1;
	};
	GetZombieR = function (o) {
		return Math.floor(1 + Math.random() * 5)
	};
	oS.Init(o);
})();
