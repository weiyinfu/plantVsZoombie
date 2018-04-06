//Download by http://www.veryhuo.com/down
(function () {
	var Pro = oSunFlower.prototype,
		NCard = Pro.PicArr[Pro.CardGif],
		NGif = Pro.PicArr[Pro.NormalGif],
		o = {
			PName: [oPeashooter],
			ZName: [oZombie],
			PicArr: ['images/interface/SodRollCap.png', 'images/interface/SodRoll.png', 'images/interface/sod1row.png', 'images/interface/background1unsodded.jpg', NCard, NGif],
			SunNum: 150,
			backgroundImage: 'images/interface/background1unsodded.jpg',
			LF: [0, 0, 0, 1, 0, 0],
			ZombieKind: 5,
			FlagNum: 4,
			ArrayZombies: [oZombie, oZombie, oZombie, oZombie, oZombie],
			CanSelectCard: 0,
			LevelName: '关卡 1-1',
			LoadMusic: function () {
				NewEle('oEmbed', 'embed', 'width:0;height:0;', {
					src: 'music/UraniwaNi.swf'
				}, 1)
			}
		};
	StartGame = function () {
		NewImg('sod1row', 'images/interface/sod1row.png', 'position:absolute;left:132px;top:280px;clip:rect(0px,0px,117px,0px);z-index:1;', 1);
		NewImg('SodRoll', 'images/interface/SodRoll.png', 'position:absolute;left:112px;top:244px;z-index:1;', 1);
		NewImg('SodRollCap', 'images/interface/SodRollCap.png', 'position:absolute;left:17px;top:322px;z-index:1;', 1);
		fRoll(35, 122, 68, 117, 73, 71, 322)
	};
	fRoll = function (sod1rowLX, SodRollLX, SodRollWidth, SodRollCapLX, SodRollCapWidth, SodRollCapHeight, SodRollCapTop) {
		sod1rowLX += 15;
		SodRollLX += 16;
		SodRollCapLX += 16;
		$('sod1row').style.clip = 'rect(0px,' + sod1rowLX + 'px,117px,0px)';
		SetStyle($('SodRoll'), {
			left: SodRollLX + 'px',
			width: --SodRollWidth + 'px',
			height: '141px'
		});
		SetStyle($('SodRollCap'), {
			left: SodRollCapLX + 'px',
			width: --SodRollCapWidth + 'px',
			height: --SodRollCapHeight + 'px',
			top: ++SodRollCapTop + 'px'
		});
		sod1rowLX < 755 ? setTimeout(function () {
			fRoll(sod1rowLX, SodRollLX, SodRollWidth, SodRollCapLX, SodRollCapWidth, SodRollCapHeight, SodRollCapTop)
		}, 30) : (ClearImg('SodRoll'), ClearImg('SodRollCap'), LevelStart())
	};
	LevelStart = function () {
		SetBlock($('dTop'));
		NewEle('DivTeach', 'div', 0, 0, 1);
		InitLawnMower();
		oP.Monitor(0, LvlTeach, 0);
		BeginCool();
		SetBlock($('dFlagMeter'))
	};
	LvlTeach = function (LevelTeachStep) {
		if (LevelTeachStep > 4) return LevelTeachStep;
		var C;
		switch (LevelTeachStep) {
		case 0:
			innerText($('DivTeach'), '点击卡片选择豌豆射手！');
			NewImg('PointerUD', 'images/interface/PointerUP.gif', 'top:60px;left:50px;', 1);
			++LevelTeachStep;
			break;
		case 1:
			Chose > 0 && (innerText($('DivTeach'), '点击草地种下豌豆射手，最好种在靠左边！'), EditImg($('PointerUD'), '', 'images/interface/PointerDown.gif', {
				left: '170px',
				top: '270px'
			}), ++LevelTeachStep);
			break;
		case 2:
			for (C = oS.C; C; C--) if (oGd.$['3_' + C + '_1']) {
				SetNone($('PointerUD'));
				innerText($('DivTeach'), '你拥有了第一个植物，点击收集掉落的阳光！');
				AutoProduceSun(25);
				++LevelTeachStep;
				break
			};
			!(Chose || C) && (ClearImg('PointerUD'), LevelTeachStep = 0);
			break;
		case 3:
			oS.SunNum > 99 && (innerText($('DivTeach'), '你拥有了足够的阳光来种植另一个豌豆射手！'), EditImg($('PointerUD'), '', 'images/interface/PointerUP.gif', {
				left: '50px',
				top: '60px',
				display: 'block'
			}), ++LevelTeachStep);
			break;
		case 4:
			var PlantNum = 0;
			for (C = oS.C; C; C--) oGd.$['3_' + C + '_1'] && (++PlantNum);
			PlantNum > 1 && (SetNone($('PointerUD')), innerText($('DivTeach'), '别让僵尸靠近你的房子！'), ++LevelTeachStep, oP.AddZombiesFlag(), setTimeout(function () {
				SetNone($('DivTeach'))
			}, 5000))
		};
		return LevelTeachStep
	};
	InitLawnMower = function () {
		oGd.$LM[3] = 1;
		NewImg('LawnMower3', 'images/LawnMower.gif', 'position:absolute;left:70px;top:' + (GetY(3) - 60) + 'px;z-index:11;', 1)
	};
	FlagToSumNum = {
		a1: [3],
		f: $f('a<b'),
		a2: [1, 2]
	};
	FlagToMonitor = {
		a1: [3],
		f: $f('a==b'),
		a2: [ShowFinalWave]
	};
	FlagToEnd = function () {
		(NewImg('imgSF', 'images/card/plants/SunFlower.png', 'left:667px;top:330px;', 1)).onclick = function () {
			GetNewCard(this, oSunFlower, 0, 2)
		};
		EditImg($('PointerUD'), 0, 'images/interface/PointerDown.gif', {
			left: '676px',
			top: '295px',
			display: 'block'
		});
		Win = 1
	};
	GetZombieR = function (o) {
		return 3
	};
	oS.Init(o)
})()
//源码来自：烈火下载 http://www.veryhuo.com/down ｄｏｗｎ．ｌｉｅｈｕｏ．ｎｅｔ