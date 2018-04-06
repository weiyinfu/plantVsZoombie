//关卡页面6波强度最大为5
(function () {
	var Pro = oCherryBomb.prototype,
		NCard = Pro.PicArr[Pro.CardGif],
		NGif = Pro.PicArr[Pro.NormalGif],
		o = {
			PName: [oPeashooter, oSunFlower],
			ZName: [oZombie],
			PicArr: ['images/interface/SodRollCap.png',
				                'images/interface/SodRoll.png',
				                'images/interface/sod3row.png',
				                'images/interface/background1unsodded_1.jpg', NCard, NGif],
			backgroundImage: 'images/interface/background1unsodded_1.jpg',
			LF: [0, 0, 1, 1, 1, 0],
			//0荒地 1草地 2水池 3屋顶
			ZombieKind: 10,
			//选卡界面出现的僵尸个数
			FlagNum: 6,
			//僵尸波数
			ArrayZombies: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie],
			//必出现的僵尸种类
			CanSelectCard: 0,
			//是否允许选卡
			LevelName: '关卡 1-2',
			//关卡名称
			LargeWaveFlag: {
				6: $('imgFlag1')
			},
			LoadMusic: function () {
				NewEle('oEmbed', 'embed', 'width:0;height:0;', {
					src: 'music/Look up at the.swf'
				}, 1);
			}
		};
	StartGame = function () { //开始游戏
		NewImg('sod3row', 'images/interface/sod3row.png', 'position:absolute;left:119px;top:163px;clip:rect(0px,46px,330px,0px);z-index:1;', 1);
		NewImg('SodRoll_1', 'images/interface/SodRoll.png', 'position:absolute;left:132px;top:128px;z-index:1;', 1);
		NewImg('SodRollCap_1', 'images/interface/SodRollCap.png', 'position:absolute;left:127px;top:211px;z-index:1;', 1);
		NewImg('SodRoll_2', 'images/interface/SodRoll.png', 'position:absolute;left:132px;top:348px;z-index:1;', 1);
		NewImg('SodRollCap_2', 'images/interface/SodRollCap.png', 'position:absolute;left:127px;top:431px;z-index:1;', 1);
		fRoll(65, 132, 68, 127, 73, 71, 211, 431);
	};
	//卷草皮
	fRoll = function (sod3rowLX, SodRollLX, SodRollWidth, SodRollCapLX, SodRollCapWidth, SodRollCapHeight, SodRollCap1Top, SodRollCap2Top) {
		sod3rowLX += 15;
		SodRollLX += 16;
		SodRollCapLX += 16;
		$('sod3row').style.clip = 'rect(0px,' + sod3rowLX + 'px,330px,0px)';
		SetStyle($('SodRoll_1'), {
			left: SodRollLX + 'px',
			width: --SodRollWidth + 'px',
			height: '141px'
		});
		SetStyle($('SodRoll_2'), {
			left: SodRollLX + 'px',
			width: SodRollWidth + 'px',
			height: '141px'
		});
		SetStyle($('SodRollCap_1'), {
			left: SodRollCapLX + 'px',
			width: --SodRollCapWidth + 'px',
			height: --SodRollCapHeight + 'px',
			top: ++SodRollCap1Top + 'px'
		});
		SetStyle($('SodRollCap_2'), {
			left: SodRollCapLX + 'px',
			width: SodRollCapWidth + 'px',
			height: SodRollCapHeight + 'px',
			top: ++SodRollCap2Top + 'px'
		});
		sod3rowLX < 766 ? setTimeout(function () {
			fRoll(sod3rowLX, SodRollLX, SodRollWidth, SodRollCapLX, SodRollCapWidth, SodRollCapHeight, SodRollCap1Top, SodRollCap2Top)
		}, 30) : (ClearImg('SodRoll_1'), ClearImg('SodRoll_2'), ClearImg('SodRollCap_1'), ClearImg('SodRollCap_2'), LevelStart());
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
			NewEle('DivTeach', 'div', 0, 0, 1);
			oP.Monitor(0, LvlTeach, 0); //全局监控计时器
			BeginCool(); //卡片的开场冷却
			AutoProduceSun(25); //自动掉落阳光
		});
	};
	LvlTeach = function (LevelTeachStep) {
		//教学
		if (LevelTeachStep > 3) return LevelTeachStep;
		var C;
		switch (LevelTeachStep) {
		case 0:
			innerText($('DivTeach'), '向日葵是极其重要的植物，一般种在最左边');
			NewImg('PointerUD', 'images/interface/PointerUP.gif', 'top:120px;left:50px;', 1);
			++LevelTeachStep;
			break;
		case 1:
			var AP = oGd.$,
				S;
			for (S in AP) {
				if (AP[S].EName == 'oSunFlower') {
					innerText($('DivTeach'), '请至少种下三棵向日葵！');
					++LevelTeachStep;
					DelayTime(0, 25, function () {
						oP.AddZombiesFlag();
						SetVisible($('tdFlagMeter'));
						SetBlock($('imgFlag1'));
					});
					break;
				}
			}
			break;
		case 2:
			var AP = oGd.$,
				S, PlantNum = 0;
			for (S in AP) AP[S].EName == 'oSunFlower' && (++PlantNum);
			PlantNum > 1 && (
			innerText($('DivTeach'), '向日葵越多，你获得阳光的速度就越快！'), ++LevelTeachStep);
			break;
		case 3:
			var AP = oGd.$,
				S, PlantNum = 0;
			for (S in AP) AP[S].EName == 'oSunFlower' && (++PlantNum);
			PlantNum > 2 && (
			innerText($('DivTeach'), '现在用你获得的阳光种植其它的植物！'), ++LevelTeachStep, EditImg($('PointerUD'), 0, 0, {
				left: '50px',
				top: '60px'
			}), setTimeout(function () {
				SetNone($('PointerUD'));
				SetNone($('DivTeach'));
			}, 5000));
		}
		return LevelTeachStep;
	};
	//初始化剪草机，每个关卡文件必须定义
	InitLawnMower = function () {
		var R = 5;
		while (--R > 1) {
			oGd.$LM[R] = 1;
			NewImg('LawnMower' + R, 'images/LawnMower.gif', 'position:absolute;left:70px;top:' + (GetY(R) - 60) + 'px;z-index:' + (3 * R + 2), 1);
		}
	};
	//根据FlagZombies返回SumNum,调用的时候用SumNum=$Switch(FlagZombies,FlagToSumNum.a1,FlagToSumNum.f,FlagToSumNum.a2)
	FlagToSumNum = {
		a1: [3, 5],
		f: $f('a<b'),
		a2: [1, 2, 4]
	};
	//根据FlagZombies返回不同种类的执行给Monitor
	FlagToMonitor = {
		a1: [5],
		f: $f('a==b'),
		a2: [ShowFinalWave]
	};
	//流程结束
	FlagToEnd = function () {
		(NewImg('imgSF', 'images/card/plants/CherryBomb.png', 'left:827px;top:220px;', 1)).onclick = function () {
			GetNewCard(this, oCherryBomb, 0, 3)
		};
		EditImg($('PointerUD'), 0, 'images/interface/PointerDown.gif', {
			left: '836px',
			top: '185px',
			display: 'block'
		});
		Win = 1;
	};
	//在僵尸的Birth事件里调用，根据关卡提供的行以及僵尸的CanPass()方法返回一个值
	GetZombieR = function (o) {
		return Math.floor(2 + Math.random() * 3)
	};
	oS.Init(o);
})();
