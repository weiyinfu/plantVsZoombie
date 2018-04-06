//关卡页面10波强度最大为10
(function () {
	var Pro = oPotatoMine.prototype,
		NCard = Pro.PicArr[Pro.CardGif],
		NGif = Pro.PicArr[Pro.NormalGif],
		o = {
			PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut],
			ZName: [oZombie, oConeheadZombie],
			PicArr: ['images/interface/background1.jpg', 'images/interface/crater1.png', NCard, NGif],
			backgroundImage: 'images/interface/background1.jpg',
			ZombieKind: 10,
			FlagNum: 10,
			ArrayZombies: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie],
			CanSelectCard: 0,
			LevelName: '1-5 特别关：陨石坑',
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
		SetHidden($('dSunNum')); //隐藏阳光
		SetVisible($('tdShovel'));
		SetBlock($('dTop')); //显示阳光和铲子的界面
		NewEle('DivTeach', 'div', 0, 0, 1);
		oP.Monitor(0, LvlTeach, 0, function () {
			var R = Math.floor(1 + Math.random() * 5),
				C = Math.floor(1 + Math.random() * 9),
				X = GetX(C) - 55,
				Y = GetY(R) - 60,
				S = R + '_' + C,
				P;
			switch (true) {
			case FlagZombies > 3:
				SetStyle(P = $('imgCrater'), {
					left: X + 'px',
					top: Y + 'px',
					zIndex: 3 * R
				});
				delete oGd.$Crater[P.getAttribute('S')];
				oGd.$Crater[S] = 2;
				P.setAttribute('S', S);
				(P = oGd.$[S + '_1']) && P.Die();
				break;
			case FlagZombies > 2:
				(NewImg('imgCrater', 'images/interface/crater1.png', 'position:absolute;left:' + X + 'px;top:' + Y + 'px;z-index:' + 3 * R, 1)).setAttribute('S', S);
				(P = oGd.$[S + '_1']) && P.Die();
				oGd.$Crater[S] = 2;
			}
		}); //全局监控计时器
		SetBlock($('dFlagMeter'));
		CustomPlants(0, 2, 6); //种植豌豆
		CustomPlants(0, 3, 8);
		CustomPlants(0, 4, 7);
	};
	LevelStart2 = function () {
		//开始
		SetNone($('DivTeach'));
		SetNone($('PointerUD'));
		SetVisible($('dSunNum'));
		obDAll.removeChild($('oEmbed'));
		NewEle('oEmbed', 'embed', 'width:0;height:0;', {
			src: 'music/Watery Graves.swf'
		}, 1);
		SetBlock($('dTop'));
		InitLawnMower(); //剪草机
		SetBlock($('dFlagMeter'));
		PrepareGrowPlants(function () {
			BeginCool(); //卡片的开场冷却
			AutoProduceSun(25); //自动掉落阳光
			DelayTime(0, 20, function () {
				oP.AddZombiesFlag();
				SetVisible($('tdFlagMeter'));
				SetBlock($('imgFlag1'));
			});
		});
	};
	StartGame = LevelStart;
	LvlTeach = function (LevelTeachStep) {
		//教学
		if (LevelTeachStep > 3) return LevelTeachStep;
		var C, $R = oGd.$;
		switch (LevelTeachStep) {
		case 0:
			innerText($('DivTeach'), '你必须清理一下你的草坪，用铲子挖出那些植物！');
			NewImg('PointerUD', 'images/interface/PointerUP.gif', 'top:36px;left:250px;', 1);
			++LevelTeachStep;
			break;
		case 1:
			Chose < 0 && (innerText($('DivTeach'), '点击移除一棵植物！'), ++LevelTeachStep);
			break;
		case 2:
			!($R['2_6_1'] && $R['3_8_1'] && $R['4_7_1']) ? (innerText($('DivTeach'), '一直挖吧，挖到你的草坪上没有植物！'), ++LevelTeachStep) : Chose > -1 && (innerText($('DivTeach'), '点击铲子挖出那些植物！'), LevelTeachStep = 1);
			break;
		case 3:
			!($R['2_6_1'] || $R['3_8_1'] || $R['4_7_1']) && (++LevelTeachStep, LevelStart2());
		}
		return LevelTeachStep;
	};
	FlagToSumNum = {
		a1: [3, 5, 9],
		f: $f('a<b'),
		a2: [1, 2, 3, 10]
	};
	FlagToMonitor = {
		a1: [9],
		f: $f('a==b'),
		a2: [ShowFinalWave]
	};
	FlagToEnd = function () {
		(NewImg('imgSF', 'images/card/plants/PotatoMine.png', 'left:587px;top:270px;', 1)).onclick = function () {
			GetNewCard(this, oPotatoMine, 0, 6)
		};
		NewImg('PointerUD', 'images/interface/PointerDown.gif', 'top:235px;left:596px;', 1);
		Win = 1;
	};
	GetZombieR = function (o) {
		return Math.floor(1 + Math.random() * 5)
	};
	oS.Init(o);
})();
