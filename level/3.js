//关卡页面8波强度最大为7
(function () {
	var Pro = oWallNut.prototype,
		NCard = Pro.PicArr[Pro.CardGif],
		NGif = Pro.PicArr[Pro.NormalGif],
		o = {
			PName: [oPeashooter, oSunFlower, oCherryBomb],
			ZName: [oZombie, oConeheadZombie],
			PicArr: ['images/interface/background1unsodded2.jpg', NCard, NGif],
			backgroundImage: 'images/interface/background1unsodded2.jpg',
			LF: [0, 0, 1, 1, 1, 0],
			//0荒地 1草地 2水池 3屋顶
			ZombieKind: 10,
			//选卡界面出现的僵尸个数
			FlagNum: 8,
			//僵尸波数
			ArrayZombies: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie],
			//必出现的僵尸种类
			CanSelectCard: 0,
			//是否允许选卡
			LevelName: '关卡 1-3',
			//关卡名称
			LargeWaveFlag: {
				8: $('imgFlag1')
			},
			LoadMusic: function () {
				NewEle('oEmbed', 'embed', 'width:0;height:0;', {
					src: 'music/Faster.swf'
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
		a1: [3, 5, 7],
		f: $f('a<b'),
		a2: [1, 2, 3, 6]
	};
	//根据FlagZombies返回不同种类的执行给Monitor
	FlagToMonitor = {
		a1: [7],
		f: $f('a==b'),
		a2: [ShowFinalWave]
	};
	//流程结束
	FlagToEnd = function () {
		(NewImg('imgSF', 'images/card/plants/WallNut.png', 'left:827px;top:330px;', 1)).onclick = function () {
			GetNewCard(this, oWallNut, 0, 4)
		};
		NewImg('PointerUD', 'images/interface/PointerDown.gif', 'top:295px;left:836px;', 1);
		Win = 1;
	};
	//在僵尸的Birth事件里调用，根据关卡提供的行以及僵尸的CanPass()方法返回一个值
	GetZombieR = function (o) {
		return Math.floor(2 + Math.random() * 3)
	};
	oS.Init(o);
})();
//源码来自：烈火下载 http://www.veryhuo.com/down
