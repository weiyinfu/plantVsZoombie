//Download by http://www.veryhuo.com/down
//关卡页面9波强度最大为10
(function () {
	o = {
		PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut],
		ZName: [oZombie, oConeheadZombie],
		PicArr: ['images/interface/background1unsodded2.jpg',
			                'images/interface/background1.jpg'],
		backgroundImage: 'images/interface/background1unsodded2.jpg',
		ZombieKind: 9,
		FlagNum: 9,
		ArrayZombies: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie],
		CanSelectCard: 0,
		LevelName: '关卡 1-4',
		LargeWaveFlag: {
			9: $('imgFlag1')
		},
		LoadMusic: function () {
			NewEle('oEmbed', 'embed', 'width:0;height:0;', {
				src: 'music/Look up at the.swf'
			}, 1);
		}
	};
	StartGame = function () { //开始游戏
		NewImg('sod3row', 'images/interface/background1.jpg', 'position:absolute;left:-118px;top:0;clip:rect(0px,264px,600px,0px);z-index:0;', 1);
		NewImg('SodRoll_1', 'images/interface/SodRoll.png', 'position:absolute;left:122px;top:48px;z-index:1;', 1);
		NewImg('SodRollCap_1', 'images/interface/SodRollCap.png', 'position:absolute;left:117px;top:131px;z-index:1;', 1);
		NewImg('SodRoll_2', 'images/interface/SodRoll.png', 'position:absolute;left:122px;top:428px;z-index:1;', 1);
		NewImg('SodRollCap_2', 'images/interface/SodRollCap.png', 'position:absolute;left:117px;top:511px;z-index:1;', 1);
		fRoll(283, 122, 68, 117, 73, 71, 131, 511);
	};
	//卷草皮
	fRoll = function (sod3rowLX, SodRollLX, SodRollWidth, SodRollCapLX, SodRollCapWidth, SodRollCapHeight, SodRollCap1Top, SodRollCap2Top) {
		sod3rowLX += 15;
		SodRollLX += 16;
		SodRollCapLX += 16;
		$('sod3row').style.clip = 'rect(0px,' + sod3rowLX + 'px,600px,0px)';
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
		sod3rowLX < 990 ? setTimeout(function () {
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
			oP.Monitor(0);
			BeginCool();
			AutoProduceSun(25);
			DelayTime(0, 15, function () {
				oP.AddZombiesFlag();
				SetVisible($('tdFlagMeter'));
				SetBlock($('imgFlag1'));
			});
		});
	};
	FlagToSumNum = {
		a1: [3, 5, 8],
		f: $f('a<b'),
		a2: [1, 2, 3, 10]
	};
	FlagToMonitor = {
		a1: [8],
		f: $f('a==b'),
		a2: [ShowFinalWave]
	};
	FlagToEnd = function () {
		(NewImg('imgSF', 'images/interface/Shovel.png', 'left:667px;top:330px;cursor:pointer;', 1)).onclick = function () {
			SetNone(obDAll);
			SetNone($('dFlagMeter'));
			(EditImg($('imgSF'), 0, 0, {
				left: '351px',
				top: '131px',
				width: '152px',
				height: '68px',
				cursor: 'default'
			})).onclick = null;
			$('iNewPlantCard').src = 'images/interface/Shovel.png';
			innerText($('dNewPlantTitle'), '你获得了铲子！')
			innerText($('dNewPlantName'), '铲子');
			innerText($('dNewPlantTooltip'), '你可以使用铲子铲除掉草坪上的植物');
			$('btnNextLevel').onclick = function () {
				SelectModal(5);
			}
			SetBlock($('dNewPlant'));
		};
		NewImg('PointerUD', 'images/interface/PointerDown.gif', 'top:295px;left:676px;', 1)
		Win = 1;
	};
	//在僵尸的Birth事件里调用，根据关卡提供的行以及僵尸的CanPass()方法返回一个值
	GetZombieR = function (o) {
		return Math.floor(1 + Math.random() * 5)
	};
	oS.Init(o);
})();
