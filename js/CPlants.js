//Download by http://www.veryhuo.com/down
var CPlants = NewO({
        name: 'Plants',
        HP: 300,
        PKind: 1,
        beAttackedPointL: 20,
        NormalGif: 1,
        CardGif: 0,
        canEat: 1,
        zIndex: 0,
        coolTime: 7500,
        canTrigger: 1,
        Stature: 0,
        Sleep: 0,
        CanGrow: function(AP, R, C) {
            var S = R + '_' + C;
            return oGd.$LF[R] == 1 ? !(C < 1 || C > 9 || oGd.$Crater[S] || AP[1]) : AP[0] && !AP[1];
        },
        getHurt: function(o, AKind, Attack) {
            var p = this;
            !(AKind % 3) ? (p.HP -= Attack) < 1 && p.Die(): p.Die(1);
        },
        GetDY: function(R, C, AP) {
            return AP[0] ? -21 : -15;
        },
        GetDX: function() {
            return -Math.floor(this.width * 0.5);
        },
        GetDBottom: function() {
            return this.height;
        },
        Birth: function(X, Y, R, C, AP) {
            var o = this,
                pixelLeft = X + o.GetDX(),
                DY = Y + o.GetDY(R, C, AP),
                pixelTop = DY - o.height,
                id = o.id = 'P_' + Math.random(),
                zIndex = o.zIndex += 3 * R,
                src = o.getBirthGif(),
                Img = PPn[o.EName],
                p;
            o.pixelLeft = pixelLeft;
            o.pixelRight = pixelLeft + o.width;
            o.pixelTop = pixelTop;
            o.pixelBottom = pixelTop + o.GetDBottom();
            o.opacity = 1;
            o.InitTrigger(o, id, o.R = R, o.C = C, o.AttackedLX = pixelLeft + o.beAttackedPointL, o.AttackedRX = pixelLeft + o.beAttackedPointR);
            $P[id] = o;
            oGd.add(o, R, C, o.PKind);
            NewImg(id + '_shadow', ShadowPNG, 'position:absolute;left:' + (X - 48) + 'px;top:' + (DY - 22) + 'px;z-index:' + (zIndex - 1), 1);
            p = !src ? EditImg(Img.cloneNode(false), id, '', {
                left: pixelLeft + 'px',
                top: pixelTop + 'px',
                zIndex: zIndex
            }, 1) : NewImg(id, src, 'position:absolute;width:' + Img.width + 'px;height:' + Img.height + 'px;left:' + pixelLeft + 'px;top:' + pixelTop + 'px;z-index:' + zIndex, 1);
            o.PrivateBirth(o);
        },
        getBirthGif: function() {
            return '';
        },
        PrivateBirth: function() {},
        getTriggerRange: function(R, LX, RX) {
            return [
                [LX, oS.W, 0]
            ];
        },
        getTriggerR: function(R) {
            return [R, R];
        },
        InitTrigger: function(o, id, R, C, LX, RX) {
            var t = {},
                aTri = o.getTriggerR(R),
                R1 = aTri[0],
                R2 = aTri[1];
            do {
                oT.add(R1, t[R1] = o.getTriggerRange(R1, LX, RX), id);
            } while (R1++ != R2);
            o.oTrigger = t;
        },
        TriggerCheck: function(o, d) {
            this.AttackCheck2(o) && (this.canTrigger = 0, this.CheckLoop(o.id, d));
        },
        CheckLoop: function(zid, d) {
            var pid = this.id;
            this.NormalAttack(zid);
            setTimeout(function() {
                var p;
                (p = $P[pid]) && p.AttackCheck1(zid, d)
            }, 1400);
        },
        AttackCheck1: function(zid, d) {
            var o = this,
                T = o.oTrigger,
                Z = $Z[zid],
                rT, i, ZX, iT;
            if (Z && (rT = T[Z.R])) {
                ZX = Z.ZX;
                for (i = rT.length; i--;) {
                    iT = rT[i];
                    if (iT[0] <= ZX && iT[1] >= ZX && o.AttackCheck2(Z)) {
                        o.CheckLoop(zid, iT[2]);
                        return;
                    }
                }
            }
            o.canTrigger = 1;
        },
        AttackCheck2: function(o) {
            return o.Altitude > 0;
        },
        PrivateDie: function(o) {},
        Die: function(delP) {
            var o = this,
                id = o.id;
            o.oTrigger && oT.delP(o);
            o.HP = 0;
            delete $P[id];
            delete oGd.$[o.R + '_' + o.C + '_' + o.PKind];
            !delP && ClearImg(id);
            ClearImg(id + '_shadow');
            o.PrivateDie(o);
        }
    }),
    oPeashooter = InheritO(CPlants, {
        EName: 'oPeashooter',
        CName: '豌豆射手',
        width: 71,
        height: 71,
        beAttackedPointR: 51,
        SunNum: 100,
        BKind: 0,
        PicArr: ['images/Card/Plants/Peashooter.png', 'images/Plants/Peashooter/Peashooter.gif', 'images/Plants/PB00.gif', 'images/Plants/PeaBulletHit.gif', 'images/PeaShadow.png'],
        Tooltip: '向敌人射出豌豆',
        Produce: '豌豆射手，你的第一道防线。它们通过发射豌豆来攻击僵尸。<p>伤害：<font color="#FF0000">中等</font></p>一棵植物，怎么能如此快地生长，并发射如此多的豌豆呢？豌豆射手：“努力工作，风险自己，再加上一份阳光，高纤维和氧化碳均衡搭配，这种健康早餐让一切成为可能。”',
        PrivateBirth: function(o) {
            var LX = o.AttackedLX,
                pixelLeft = LX - 40;
            o.BulletClass = NewO({
                X: LX,
                R: o.R,
                D: 0,
                Attack: 20,
                Kind: o.BKind,
                ChangeC: 0,
                pixelLeft: pixelLeft,
                F: oGd.MB1
            });
            o.BulletImg = NewImg('', o.PicArr[2], 'position:absolute;left:' + pixelLeft + 'px;top:' + (o.pixelTop + 3) + 'px;display:none;z-index:' + (o.zIndex + 2), 0);
        },
        PrivateDie: function(o) {
            o.BulletImg = null;
        },
        NormalAttack: function() {
            var o = this,
                PB = o.BulletImg.cloneNode(false),
                OB = new o.BulletClass,
                id;
            OB.id = PB.id = id = 'PB' + Math.random();
            oGd.$B.push(OB);
            obDAll.appendChild(PB);
            setTimeout(function() {
                var o = $(id);
                o && SetBlock(o)
            }, 150);
        }
    }),
    oSnowPea = InheritO(oPeashooter, {
        EName: 'oSnowPea',
        CName: '寒冰射手',
        SunNum: 175,
        BKind: -1,
        PicArr: ['images/Card/Plants/SnowPea.png', 'images/Plants/SnowPea/SnowPea.gif', 'images/Plants/PB-10.gif', 'images/Plants/PeaBulletHit.gif'],
        Tooltip: '寒冰射手可造成伤害, 同时又有减速效果',
        Produce: '寒冰射手会发射寒冰豌豆来攻击敌人，并具有减速效果。<p>伤害：<font color="#FF0000">中等，带有减速效果</font></p>人们经常告诉寒冰射手他是多么“冷酷”，或者告诫他要“冷静”。他们叫他要“保持镇静”。寒冰射手只是转转他的眼睛。其实他都听见了。'
    }),
    oRepeater = InheritO(oPeashooter, {
        EName: 'oRepeater',
        CName: '双发射手',
        width: 73,
        height: 71,
        beAttackedPointR: 53,
        SunNum: 200,
        PicArr: ['images/Card/Plants/Repeater.png', 'images/Plants/Repeater/Repeater.gif', 'images/Plants/PB00.gif', 'images/Plants/PeaBulletHit.gif'],
        Tooltip: '一次发射两颗豌豆',
        Produce: '双发射手可以一次发射两颗豌豆<p>伤害：<font color="#FF0000">中等(每颗)</font><br>发射速度：<font color="#FF0000">两倍</font></p>双发射手很凶悍，他是在街头混大的。他不在乎任何人的看法，无论是植物还是僵尸，他打出豌豆，是为了让别人离他远点。其实呢，双发射手一直暗暗地渴望着爱情。',
        NormalAttack: function(zid, Num) {
            var o = this,
                PID = o.id,
                PB = o.BulletImg.cloneNode(false),
                OB = new o.BulletClass,
                id, Num;
            OB.id = PB.id = id = 'PB' + Math.random();
            oGd.$B.push(OB);
            obDAll.appendChild(PB);
            setTimeout(function() {
                var o = $(id);
                o && SetBlock(o)
            }, 150);
            Num ? ++Num : Num = 1;
            Num < 2 && setTimeout(function() {
                var p;
                (p = $P[PID]) && p.NormalAttack(zid, Num)
            }, 150);
        }
    }),
    oThreepeater = InheritO(oPeashooter, {
        EName: 'oThreepeater',
        CName: '三线射手',
        width: 73,
        height: 80,
        beAttackedPointR: 53,
        SunNum: 325,
        PicArr: ['images/Card/Plants/Threepeater.png', 'images/Plants/Threepeater/Threepeater.gif', 'images/Plants/PB00.gif', 'images/Plants/PeaBulletHit.gif'],
        Tooltip: '一次射出三行的豌豆',
        Produce: '三线射手可以在三条线上同时射出豌豆。<p>伤害：<font color="#FF0000">普通(每颗)</font><br>范围：<font color="#FF0000">三线</font></p>三线射手喜欢读书，下棋和在公园里呆坐。他也喜欢演出，特别是现代爵士乐。“我正在寻找我生命中的另一半，”他说。三线射手最爱的数字是5。',
        getTriggerR: function(R) {
            return [R > 2 ? R - 1 : 1,
                R < oS.R ? R + 1 : R
            ];
        },
        PrivateBirth: function(o) {
            var LX = o.AttackedLX,
                pixelLeft = LX - 40,
                pixelTop, oT = o.oTrigger,
                R;
            o.BulletClass = [];
            o.BulletImg = [];
            for (R in oT) {
                pixelTop = GetY(R) - 50;
                o.BulletClass.push(NewO({
                    X: LX,
                    R: R,
                    D: 0,
                    Attack: 20,
                    Kind: 0,
                    ChangeC: 0,
                    pixelLeft: pixelLeft,
                    F: oGd.MB1
                }));
                o.BulletImg.push(NewImg('', o.PicArr[2], 'position:absolute;left:' + pixelLeft + 'px;top:' + pixelTop + 'px;display:none;z-index:' + (3 * R + 2), 0));
            }
        },
        PrivateDie: function(o) {
            var B = o.BulletImg,
                i = B.length;
            while (i--) B[i] = null;
        },
        NormalAttack: function() {
            var o = this,
                C = o.BulletClass,
                I = o.BulletImg,
                OB, PB, id, m = C.length;
            while (m--) {
                OB = new C[m];
                PB = I[m].cloneNode(false);
                OB.id = PB.id = id = 'PB' + Math.random();
                oGd.$B.push(OB);
                obDAll.appendChild(PB);
                (function(id) {
                    setTimeout(function() {
                        var o = $(id);
                        o && SetBlock(o)
                    }, 150)
                })(id);
            }
        }
    }),
    oGatlingPea = InheritO(oPeashooter, {
        EName: 'oGatlingPea',
        CName: '加特林',
        width: 88,
        height: 84,
        beAttackedPointR: 68,
        SunNum: 250,
        coolTime: 50000,
        PicArr: ['images/Card/Plants/GatlingPea.png', 'images/Plants/GatlingPea/GatlingPea.gif', 'images/Plants/PB00.gif', 'images/Plants/PeaBulletHit.gif'],
        Tooltip: '一次发射四颗豌豆<br>(需要双发射手)',
        Produce: '加特林可以一次发射四颗豌豆<p>伤害：<font color="#FF0000">中等(每颗)</font><br>发射速度：<font color="#FF0000">四倍<br>只能种在双发射手上</font></p>当加特林宣布他要参军的时候，他的父母很为他担心，他们异口同声地对他说：“亲爱的，但这太危险了。”加特林拒绝让步，“生活本就危险，”他这样回答着，此时他的眼睛里，正闪烁着钢铁般的信念。',
        PrivateBirth: function(o) {
            var LX = o.AttackedLX,
                pixelLeft = LX - 40;
            o.BulletClass = NewO({
                X: LX,
                R: o.R,
                D: 0,
                Attack: 20,
                Kind: o.BKind,
                ChangeC: 0,
                pixelLeft: pixelLeft,
                F: oGd.MB1
            });
            o.BulletImg = NewImg('', o.PicArr[2], 'position:absolute;left:' + pixelLeft + 'px;top:' + (o.pixelTop + 8) + 'px;display:none;z-index:' + (o.zIndex + 2), 0);
        },
        CanGrow: function(AP, R, C) {
            var P = AP[1];
            return P && P.EName == 'oRepeater';
        },
        NormalAttack: function(zid, Num) {
            var o = this,
                PID = o.id,
                PB = o.BulletImg.cloneNode(false),
                OB = new o.BulletClass,
                id, Num;
            OB.id = PB.id = id = 'PB' + Math.random();
            oGd.$B.push(OB);
            obDAll.appendChild(PB);
            setTimeout(function() {
                var o = $(id);
                o && SetBlock(o)
            }, 150);
            Num ? ++Num : Num = 1;
            Num < 4 && setTimeout(function() {
                var p;
                (p = $P[PID]) && p.NormalAttack(zid, Num)
            }, 150);
        }
    }),
    oSplitPea = InheritO(oPeashooter, {
        EName: 'oSplitPea',
        CName: '分裂射手',
        width: 92,
        height: 72,
        beAttackedPointR: 72,
        SunNum: 125,
        PicArr: ['images/Card/Plants/SplitPea.png', 'images/Plants/SplitPea/SplitPea.gif', 'images/Plants/PB00.gif', 'images/Plants/PB01.gif', 'images/Plants/PeaBulletHit.gif'],
        Tooltip: '前后双向发射豌豆',
        Produce: '分裂射手，可以向前后两个方向发射豌豆。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">前面和后面</font><br>发射速度：<font color="#FF0000">前面为正常速度，后面为两倍速度</font></p>分裂射手：“没错，我就是双子座。我知道，这的确很令人惊奇。不过，有两个头，或者实际上，长着一个头和一个类似头的东西，在背上，对我这条线上的防守帮助很大。',
        GetDX: function() {
            return -55;
        },
        getTriggerRange: function(R, LX, RX) {
            return [
                [100, LX + 25, 1],
                [LX + 26, oS.W, 0]
            ];
        },
        PrivateBirth: function(o) {
            var LX = o.AttackedLX,
                pixelLeft = LX - 40,
                R = o.R;
            o.BulletClass = [];
            o.BulletImg = [];
            o.aTri = [0, 0];
            o.BulletClass.push(NewO({
                X: LX,
                R: R,
                D: 0,
                Attack: 20,
                Kind: 0,
                ChangeC: 0,
                pixelLeft: pixelLeft,
                F: oGd.MB1
            }));
            o.BulletImg.push(NewImg('', o.PicArr[2], 'position:absolute;left:' + pixelLeft + 'px;top:' + (o.pixelTop + 3) + 'px;display:none;z-index:' + (o.zIndex + 2), 0));
            LX = o.AttackedRX, pixelLeft = LX - 16;
            o.BulletClass.push(NewO({
                X: LX,
                R: R,
                D: 1,
                Attack: 20,
                Kind: 0,
                ChangeC: 0,
                pixelLeft: pixelLeft,
                F: oGd.MB1
            }));
            o.BulletImg.push(NewImg('', o.PicArr[3], 'position:absolute;left:' + pixelLeft + 'px;top:' + (o.pixelTop + 3) + 'px;display:none;z-index:' + (o.zIndex + 2), 0));
        },
        PrivateDie: function(o) {
            var B = o.BulletImg,
                i = B.length;
            while (i--) B[i] = null;
        },
        TriggerCheck: function(o, d) {
            if (this.aTri[d]) return;
            if (this.AttackCheck2(o)) {
                ++this.aTri[d];
                this.aTri[0] && this.aTri[1] && (this.canTrigger = 0);
                this.CheckLoop(o.id, d);
            }
        },
        AttackCheck1: function(zid, d) {
            var o = this,
                Z = $Z[zid],
                d2;
            if (Z && (Z.R == o.R)) {
                d2 = Z.ZX > o.AttackedLX + 25 ? 0 : 1;
                d == d2 ? (o.AttackCheck2(Z) ? o.CheckLoop(zid, d) : --o.aTri[d]) : (++o.aTri[d2], --o.aTri[d]);
            } else {
                --o.aTri[d];
            }
            o.canTrigger = o.aTri[0] && o.aTri[1] ? 0 : 1;
        },
        CheckLoop: function(zid, d) {
            this.NormalAttack(d);
            var pid = this.id;
            setTimeout(function() {
                var p;
                (p = $P[pid]) && p.AttackCheck1(zid, d)
            }, 1400);
        },
        NormalAttack: function(N, Num) {
            var o = this,
                pid = o.id,
                PB = o.BulletImg[N].cloneNode(false),
                OB = new o.BulletClass[N],
                id;
            OB.id = PB.id = id = 'PB' + Math.random();
            oGd.$B.push(OB);
            obDAll.appendChild(PB);
            setTimeout(function() {
                var o = $(id);
                o && SetBlock(o)
            }, 150);
            if (N) {
                Num = Num || 0;
                !Num && setTimeout(function() {
                    var p;
                    (p = $P[pid]) && p.NormalAttack(1, 1)
                }, 150);
            }
        }
    }),
    oSunFlower = InheritO(CPlants, {
        EName: 'oSunFlower',
        CName: '向日葵',
        width: 73,
        height: 74,
        beAttackedPointR: 53,
        SunNum: 50,
        PicArr: ['images/Card/Plants/SunFlower.png', 'images/Plants/SunFlower/SunFlower.gif'],
        Tooltip: '提供你额外的阳光',
        Produce: '向日葵，为你生产额外阳光的经济作物。尝试尽可能多种植吧！<p>阳光产量：<font color="#FF0000">中等</font></p>向日葵情不自禁地和着节拍起舞。是什么节拍呢？嗨，是大地自己用来提神的爵士节拍，这种频率的节拍，只有向日葵才能听到。',
        PrivateBirth: function(o) {
            o.ProduceSun(Math.floor((GetX(o.C) - 40) + Math.random() * 41), GetY(o.R), 0, 6);
        },
        InitTrigger: function() {},
        ProduceSun: function(X, Y, StartTimer, MaxTimer) {
            ++StartTimer >= MaxTimer && (AppearSun(X, Y, 25, 0), StartTimer = 0, MaxTimer = 24);
            (function(id) {
                setTimeout(function() {
                    var o;
                    !Win && (o = $P[id]) && o.ProduceSun(Math.floor((GetX(o.C) - 40) + Math.random() * 41), Y, StartTimer, MaxTimer);
                }, 1000)
            })(this.id);
        }
    }),
    oTwinSunflower = InheritO(oSunFlower, {
        EName: 'oTwinSunflower',
        CName: '双子向日葵',
        width: 83,
        height: 84,
        beAttackedPointR: 63,
        SunNum: 150,
        coolTime: 50000,
        PicArr: ['images/Card/Plants/TwinSunflower.png', 'images/Plants/TwinSunflower/TwinSunflower.gif'],
        Tooltip: '一次提供两倍于向日葵的阳光量<br>(需要向日葵)',
        Produce: '双子向日葵的阳光产量是普通向日葵的两倍。<p>阳光产量：<font color="#FF0000">双倍<br>只能种在普通向日葵上</font></p>这是一个疯狂的夜晚，禁忌的科学技术，让双子向日葵来到了这个世界。电闪雷鸣，狂风怒吼，都在表示着这个世界对他的拒绝。但是一切都无济于事，双子向日葵他却仍然活着！',
        CanGrow: function(AP, R, C) {
            var P = AP[1];
            return P && P.EName == 'oSunFlower';
        },
        PrivateBirth: function(o) {
            var X = GetX(o.C);
            o.ProduceSun(X - 10, X + 10, GetY(o.R), 0, 6);
        },
        ProduceSun: function(X1, X2, Y, StartTimer, MaxTimer) {
            ++StartTimer >= MaxTimer && (AppearSun(X1, Y, 25, 0), AppearSun(X2, Y, 25, 0, 0), StartTimer = 0, MaxTimer = 24);
            (function(id) {
                setTimeout(function() {
                    var o;
                    !Win && (o = $P[id]) && o.ProduceSun(X1, X2, Y, StartTimer, MaxTimer);
                }, 1000)
            })(this.id);
        }
    }),
    oPumpkinHead = InheritO(CPlants, {
        EName: 'oPumpkinHead',
        CName: '南瓜头',
        width: 97,
        height: 67,
        beAttackedPointL: 15,
        beAttackedPointR: 82,
        SunNum: 125,
        PKind: 2,
        HP: 4000,
        coolTime: 30000,
        zIndex: 1,
        PicArr: ['images/Card/Plants/PumpkinHead.png', 'images/Plants/PumpkinHead/PumpkinHead.gif', 'images/Plants/PumpkinHead/PumpkinHead1.gif', 'images/Plants/PumpkinHead/PumpkinHead2.gif', 'images/Plants/PumpkinHead/pumpkin_damage1.gif', 'images/Plants/PumpkinHead/pumpkin_damage2.gif', 'images/Plants/PumpkinHead/Pumpkin_back.gif'],
        Tooltip: '能保护种在里面的植物',
        Produce: '南瓜头，可以用他的外壳保护其他植物。<p>韧性：<font color="#FF0000">高</font><br>特点：<font color="#FF0000">可以种在其他植物上</font></p>南瓜头最近都没收到，关于他表哥刃菲尔德的消息。很明显，刃菲尔德是个大明星，是一种……叫什么运动来着……的体育明星？佩格跳跳球大师？南瓜头反正搞不懂是什么运动，他只想做好他自己的工作。',
        CanGrow: function(AP, R, C) {
            var S = R + '_' + C;
            return oGd.$LF[R] == 1 ? !(C < 1 || C > 9 || oGd.$Crater[S] || AP[2]) : AP[0] && !AP[2];
        },
        GetDY: function(R, C, AP) {
            return AP[0] ? -12 : -5;
        },
        HurtStatus: 0,
        getHurt: function(o, AKind, Attack) {
            var p = this,
                id = p.id;
            switch (true) {
                case AKind && AKind < 3:
                    p.Die(1);
                    break;
                case (p.HP -= Attack) < 1:
                    p.Die();
                    break;
                case p.HP < 1334:
                    p.HurtStatus < 2 && (p.HurtStatus = 2, $(id).src = 'images/Plants/PumpkinHead/pumpkin_damage2.gif');
                    break;
                case p.HP < 2667:
                    p.HurtStatus < 1 && (p.HurtStatus = 1, $(id).src = 'images/Plants/PumpkinHead/pumpkin_damage1.gif', $(id + '_2').src = 'images/Plants/PumpkinHead/Pumpkin_back.gif');
            }
        },
        InitTrigger: function() {},
        getBirthGif: function() {
            return 'images/Plants/PumpkinHead/PumpkinHead1.gif';
        },
        PrivateBirth: function(o) {
            NewImg(o.id + '_2', 'images/Plants/PumpkinHead/PumpkinHead2.gif', 'position:absolute;width:97px;height:67px;left:' + o.pixelLeft + 'px;top:' + (o.pixelTop + 2) + 'px;z-index:' + (o.zIndex - 2), 1);
        },
        PrivateDie: function(o) {
            ClearImg(o.id + '_2');
        }
    }),
    oFlowerPot = InheritO(CPlants, {
        EName: 'oFlowerPot',
        CName: '花盆',
        width: 72,
        height: 68,
        beAttackedPointR: 52,
        SunNum: 25,
        PicArr: ['images/Card/Plants/FlowerPot.png', 'images/Plants/FlowerPot/FlowerPot.gif'],
        PKind: 0,
        Stature: -1,
        GetDY: function(R, C, AP) {
            return 6;
        },
        CanGrow: function(AP, R, C) {
            var S = R + '_' + C,
                LF = oGd.$LF[R],
                PC = C < 1 || C > 9;
            return LF % 2 ? LF < 3 ? !(PC || AP[1] || AP[2] || AP[0] || oGd.$Crater[S]) : !(PC || AP[0] || oGd.$Crater[S]) : 0;
        },
        Tooltip: '可以让植物栽种在屋顶上',
        Produce: '花盆可以让你在屋顶上种植植物。<p>特点：<font color="#FF0000">允许你在屋顶上种植</font></p>“我是一个让植物栽种的花盆，但我也是一棵植物。是不是很意外？',
        InitTrigger: function() {}
    }),
    oLilyPad = InheritO(oFlowerPot, {
        EName: 'oLilyPad',
        CName: '睡莲',
        width: 79,
        height: 58,
        beAttackedPointR: 59,
        PicArr: ['images/Card/Plants/LilyPad.png', 'images/Plants/LilyPad/LilyPad.gif'],
        CanGrow: function(AP, R, C) {
            var S = R + '_' + C;
            return !(C < 1 || C > 9 || oGd.$LF[R] - 2 || AP[0] || oGd.$Crater[S]);
        },
        Tooltip: '使你能够将非水生植物种在上面',
        Produce: '睡莲可以让你种植非水生植物在它上面。<p>特点：<font color="#FF0000">非水生植物可以种植在它上面<br>必须种植在水面</font></p>睡莲从不抱怨，它也从来不想知道发生了什么事。在它身上种植物，它也不会说什么。难道，它有什么惊奇想法或者可怕的秘密？没人知道。睡莲把这些都埋藏在心底。'
    }),
    oPotatoMine = InheritO(CPlants, {
        EName: 'oPotatoMine',
        CName: '土豆雷',
        width: 75,
        height: 55,
        beAttackedPointR: 55,
        SunNum: 25,
        coolTime: 30000,
        Stature: -1,
        CanGrow: function(AP, R, C) {
            var S = R + '_' + C,
                LF = oGd.$LF[R];
            return LF % 2 ? LF < 3 ? !(C < 1 || C > 9 || AP[1] || oGd.$Crater[S]) : AP[0] && !AP[1] : 0;
        },
        PicArr: ['images/Card/Plants/PotatoMine.png', 'images/Plants/PotatoMine/PotatoMine.gif', 'images/Plants/PotatoMine/PotatoMineNotReady.gif', 'images/Plants/PotatoMine/PotatoMine_mashed.gif', 'images/Plants/PotatoMine/ExplosionSpudow.gif'],
        Tooltip: '敌人接触后爆炸<br>需要时间安放',
        Produce: '土豆雷具有强大的威力，但是他们需要点时间来武装自己。你应把他们种在僵尸前进的路上，当他们一被接触就会发生爆炸。<p>伤害：<font color="FF0000">巨大</font><br>范围：<font color="#FF0000">一个小区域内的所有僵尸</font><br>使用方法：<font color="#FF0000">单独使用，需要一定准备时间才能起作用。</font></p>一些人说土豆雷很懒，因为他总是把所有事情留到最后。土豆雷才没空理他们，他正忙着考虑他的投资战略呢。',
        Status: 0,
        canTrigger: 0,
        getHurt1: function(o, AKind, Attack) {
            var p = this;
            AKind > 2 ? (p.HP -= Attack) < 1 && p.Die() : p.NormalAttack(p.pixelLeft, p.pixelLeft + p.width, R);
        },
        getBirthGif: function() {
            return 'images/Plants/PotatoMine/PotatoMineNotReady.gif';
        },
        PrivateBirth: function(o, T) {
            var id = o.id;
            T ? ++T : T = 1;
            T < 16 ? setTimeout(function() {
                var p;
                (p = $P[id]) && p.PrivateBirth(p, T)
            }, 1000) : ($(id).src = 'images/Plants/PotatoMine/PotatoMine.gif', o.Status = 1, o.canTrigger = 1, o.getHurt = o.getHurt1);
        },
        getTriggerRange: function(R, LX, RX) {
            return [
                [LX, RX, 0]
            ];
        },
        TriggerCheck: function(o, d) {
            var R = this.R;
            o.beAttacked && o.Altitude < 2 && this.NormalAttack(this.pixelLeft, this.pixelLeft + this.width, R);
        },
        NormalAttack: function(LX, RX, R) {
            var ar = oZ.getArZ(LX, RX, R),
                i = ar.length,
                Z, P = this,
                id = P.id,
                pixelLeft = P.pixelLeft,
                pixelTop = P.pixelTop;
            while (i--)(Z = ar[i]).Altitude < 2 && Z.getHurt(0, 0, 1800, 0, 0, 0, 2);
            P.Die(1);
            EditImg($(id), '', 'images/Plants/PotatoMine/PotatoMine_mashed.gif', {
                left: (pixelLeft -= 40) + 'px',
                top: (pixelTop -= 20) + 'px',
                width: '132px',
                height: '93px'
            });
            NewImg(id + 'Explo', 'images/Plants/PotatoMine/ExplosionSpudow.gif', 'position:absolute;left:' + (pixelLeft - 50) + 'px;top:' + (pixelTop - 20) + 'px;z-index:50', 1);
            setTimeout(function() {
                ClearImg(id + 'Explo');
                setTimeout(function() {
                    ClearImg(id)
                }, 1000);
            }, 2000);
        }
    }),
    oTorchwood = InheritO(CPlants, {
        EName: 'oTorchwood',
        CName: '火炬树桩',
        width: 73,
        height: 83,
        beAttackedPointR: 53,
        SunNum: 175,
        PicArr: ['images/Card/Plants/Torchwood.png', 'images/Plants/Torchwood/Torchwood.gif', 'images/Plants/PB00.gif', 'images/Plants/PB01.gif', 'images/Plants/PB10.gif', 'images/Plants/PB11.gif', 'images/Plants/Torchwood/SputteringFire.gif'],
        Tooltip: '通过火炬树桩的豌豆将变为火球',
        Produce: '火炬树桩可以把穿过他的豌豆变成火球，可以造成两倍伤害。<p>特点：<font color="#FF0000">让穿过他的火球造成两倍伤害。火球也会对附近僵尸造成溅射伤害</font></p>每个人都喜欢并敬重火炬树桩。他们喜欢他的诚实和坚贞的友谊，以及增强豌豆伤害的能力。但他也有自己的秘密：他不识字！',
        PrivateBirth: function(o) {
            oGd.$Torch[o.R + '_' + o.C] = 1;
        },
        InitTrigger: function() {},
        PrivateDie: function(o) {
            delete oGd.$Torch[o.R + '_' + o.C];
        }
    }),
    oWallNut = InheritO(CPlants, {
        EName: 'oWallNut',
        CName: '坚果墙',
        width: 65,
        height: 73,
        beAttackedPointR: 45,
        SunNum: 50,
        HP: 4000,
        coolTime: 30000,
        PicArr: ['images/Card/Plants/WallNut.png', 'images/Plants/WallNut/WallNut.gif', 'images/Plants/WallNut/Wallnut_cracked1.gif', 'images/Plants/WallNut/Wallnut_cracked2.gif'],
        Tooltip: '阻碍僵尸前进, 并保护你其他的植物',
        Produce: '坚果墙拥有足以让你用来保护其它植物的坚硬外壳。<p>韧性：<font color="FF0000">高</font></p>坚果墙：“人们想知道，经常被僵尸啃的感觉怎样？他们不知道，我有限的感官，只能让我感到一种麻麻的感觉，像是，令人放松的背部按摩。”',
        InitTrigger: function() {},
        HurtStatus: 0,
        getHurt: function(o, AKind, Attack) {
            var p = this,
                id = p.id;
            !(AKind % 3) ? (p.HP -= Attack) < 1 ? p.Die() : p.HP < 1334 ? p.HurtStatus < 2 && (p.HurtStatus = 2, $(id).src = 'images/Plants/WallNut/Wallnut_cracked2.gif') : p.HP < 2667 && p.HurtStatus < 1 && (p.HurtStatus = 1, $(id).src = 'images/Plants/WallNut/Wallnut_cracked1.gif'): p.Die(1);
        }
    }),
    oTallNut = InheritO(oWallNut, {
        EName: 'oTallNut',
        CName: '高坚果',
        width: 83,
        height: 119,
        beAttackedPointR: 63,
        SunNum: 125,
        HP: 8000,
        PicArr: ['images/Card/Plants/TallNut.png', 'images/Plants/TallNut/TallNut.gif', 'images/Plants/TallNut/TallnutCracked1.gif', 'images/Plants/TallNut/TallnutCracked2.gif'],
        Tooltip: '不会被跳过的坚实壁垒',
        Produce: '高坚果是重型壁垒植物，而且不会被跨过。<p>韧性：<font color="#FF0000">非常高</font><br>特殊：<font color="#FF0000">不会被跨过或越过</font></p>人们想知道，坚果墙和高坚果是否在竞争。高坚果以男中音的声调大声笑了。“我们之间怎么会存在竞争关系？我们是哥们儿。你知道坚果墙为我做了什么吗……”高坚果的声音越来越小，他狡黠地笑着。”',
        Stature: 1,
        getHurt: function(o, AKind, Attack) {
            var p = this,
                id = p.id;
            !(AKind % 3) ? (p.HP -= Attack) < 1 ? p.Die() : p.HP < 2667 ? p.HurtStatus < 2 && (p.HurtStatus = 2, $(id).src = 'images/Plants/TallNut/TallnutCracked2.gif') : p.HP < 5333 && p.HurtStatus < 1 && (p.HurtStatus = 1, $(id).src = 'images/Plants/TallNut/TallnutCracked1.gif'): p.Die(1);
        }
    }),
    oCherryBomb = InheritO(CPlants, {
        EName: 'oCherryBomb',
        CName: '樱桃炸弹',
        width: 112,
        height: 81,
        beAttackedPointR: 92,
        SunNum: 150,
        coolTime: 50000,
        PicArr: ['images/Card/Plants/CherryBomb.png', 'images/Plants/CherryBomb/CherryBomb.gif', 'images/Plants/CherryBomb/Boom.gif'],
        Tooltip: '炸掉一定区域内的所有僵尸',
        Produce: '樱桃炸弹，能炸掉一定区域内所有僵尸。他们一种下就会立刻引爆。所以请把他们种在僵尸们的身边。<p>伤害：<font color="#FF0000">巨大</font><br>范围：<font color="#FF0000">一个中等区域内的所有僵尸</font><br>使用方法：<font color="#FF0000">单独使用，立即爆炸</font></p>“我要‘爆’开了。”樱桃一号说。“不，我们是要‘炸’开了！”它哥哥樱桃二号说。经过激烈的商议之后，他们才统一“爆炸这个说法。”',
        InitTrigger: function() {},
        getHurt: function() {},
        PrivateBirth: function(o) {
            (function(id) {
                setTimeout(function() {
                    var o = $P[id];
                    o && o.NormalAttack(o);
                }, 630)
            })(o.id);
        },
        NormalAttack: function(p) {
            var id = p.id,
                R = p.R,
                R1 = R > 2 ? R - 1 : 1,
                R2 = R < oS.R ? R + 1 : oS.R,
                LX = p.pixelLeft - 80,
                RX = p.pixelLeft + 160,
                ar, i;
            do {
                i = (ar = oZ.getArZ(LX, RX, R1)).length;
                while (i--) ar[i].getHurt(0, 0, 1800, 0, 0, 0, 1);
            } while (R1++ < R2);
            p.Die(1);
            EditImg($(id), '', 'images/Plants/CherryBomb/Boom.gif', {
                left: p.pixelLeft - 50 + 'px',
                top: p.pixelTop - 30 + 'px',
                zIndex: 50
            });
            setTimeout(function() {
                ClearImg(id)
            }, 650);
        }
    }),
    oJalapeno = InheritO(oCherryBomb, {
        EName: 'oJalapeno',
        CName: '火爆辣椒',
        width: 68,
        height: 89,
        beAttackedPointR: 48,
        PicArr: ['images/Card/Plants/Jalapeno.png', 'images/Plants/Jalapeno/Jalapeno.gif', 'images/Plants/Jalapeno/JalapenoAttack.gif'],
        Tooltip: '消灭整行的敌人',
        Produce: '火爆辣椒可以摧毁一整条线上的敌人。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">整条线上的僵尸</font><br>用法：<font color="#FF0000">单独使用，立即生效</font></p>“嘎嘎嘎嘎嘎嘎嘎！！！”火爆辣椒说。他现在不会爆炸，还不到时候，不过快了，喔~，快了快了，快来了。他知道，他感受到了，他一生都是在等待这个时刻！',
        PrivateBirth: function(o) {
            (function(id) {
                setTimeout(function() {
                    var o = $P[id];
                    o && o.NormalAttack(o);
                }, 720)
            })(o.id);
        },
        NormalAttack: function(p) {
            var id = p.id,
                R = p.R,
                ar = oZ.getArZ(100, oS.W, R),
                i = ar.length;
            while (i--) ar[i].getHurt(0, 0, 1800, 0, 0, 0, 2);
            p.Die(1);
            EditImg($(id), '', 'images/Plants/Jalapeno/JalapenoAttack.gif', {
                width: '755px',
                height: '131px',
                left: '120px',
                top: p.pixelTop - 45 + 'px',
                zIndex: 50
            });
            setTimeout(function() {
                ClearImg(id)
            }, 1350);
        }
    }),
    oSpikeweed = InheritO(CPlants, {
        EName: 'oSpikeweed',
        CName: '地刺',
        width: 85,
        height: 35,
        beAttackedPointR: 65,
        SunNum: 100,
        Stature: -1,
        canEat: 0,
        PicArr: ['images/Card/Plants/Spikeweed.png', 'images/Plants/Spikeweed/Spikeweed.gif'],
        Attack: 20,
        Tooltip: '扎破轮胎, 也能伤害走在上面的僵尸',
        Produce: '地刺可以扎破轮胎，并对踩到他的僵尸造成伤害<p>伤害：<font color="#FF0000">普通</font><br>范围：<font color="#FF0000">所有踩到他的僵尸</font><br>特点：<font color="#FF0000">不会被僵尸吃掉</font></p>地刺痴迷冰球，他买了包厢的季票。他一直关注着他喜欢的球员，他也始终如一的在赛后清理冰球场。但只有一个问题：他害怕冰球。',
        CanGrow: function(AP, R, C) {
            var S = R + '_' + C;
            return !(C < 1 || C > 9 || oGd.$LF[R] - 1 || AP[1] || AP[0] || oGd.$Crater[S]);
        },
        getHurt: function(o, AKind, Attack) {
            var p = this;
            !(AKind % 3) ? (p.HP -= Attack) < 1 && p.Die(): AKind < 2 ? (o.getHurt(1, 0, 20, 0, 0, 0, 0), p.Die(1)) : (o.HP = o.BreakPoint, o.GoingDie(), p.Die());
        },
        NormalAttack: function(zid) {
            $Z[zid].getHurt(1, 0, this.Attack, 0, 0, 0, 0);
        },
        GetDY: function(R, C, AP) {
            return -2;
        },
        getTriggerRange: function(R, LX, RX) {
            return [
                [this.pixelLeft, this.pixelLeft + this.width, 0]
            ];
        },
        TriggerCheck: function(o, d) {
            this.AttackCheck2(o) && this.CheckLoop(o.id, d);
        },
        CheckLoop: function(zid, d) {
            this.NormalAttack(zid);
            var pid = this.id;
            setTimeout(function() {
                var p;
                (p = $P[pid]) && p.AttackCheck1(zid, d)
            }, 1000);
        },
        AttackCheck1: function(zid, d) {
            var o = this,
                Z = $Z[zid],
                rT, ZX;
            Z && (rT = o.oTrigger[Z.R]) && rT[0] <= (ZX = Z.ZX) && rT[1] >= ZX && o.AttackCheck2(Z) && o.CheckLoop(zid, d);
        },
        AttackCheck2: function(o) {
            return o.Altitude == 1 && o.beAttacked;
        }
    }),
    oSpikerock = InheritO(oSpikeweed, {
        EName: 'oSpikerock',
        CName: '地刺王',
        width: 84,
        height: 43,
        beAttackedPointR: 64,
        SunNum: 125,
        coolTime: 50000,
        PicArr: ['images/Card/Plants/Spikerock.png', 'images/Plants/Spikerock/Spikerock.gif'],
        Attack: 40,
        Tooltip: '能扎破多个轮胎, 并伤害经过上面的僵尸<br>(需要地刺)',
        Produce: '地刺王可以扎破多个轮胎，并对踩到他的僵尸造成伤害。<p><font color="#FF0000">必须种植在地刺上</font></p>地刺王刚刚从欧洲旅行回来。他玩的很高兴，也认识了很多有趣的人。这些都真的拓展了他的视野——他从来不知道，他们建造了这么大的博物馆，有这么多的画作。这对他来说太惊奇了。',
        CanGrow: function(AP, R, C) {
            var p = AP[1];
            return p && p.EName == 'oSpikeweed';
        },
        GetDY: function(R, C, AP) {
            return 0;
        },
        getHurt: function(o, AKind, Attack) {
            switch (AKind) {
                case 2:
                    o.HP = o.BreakPoint;
                    o.GoingDie();
                    break;
                case 1:
                    o.getHurt(1, 0, 40, 0, 0, 0, 0);
            }(this.HP -= Attack) < 1 && this.Die();
        }
    }),
    oGarlic = InheritO(CPlants, {
        EName: 'oGarlic',
        CName: '大蒜',
        width: 60,
        height: 59,
        beAttackedPointR: 40,
        SunNum: 50,
        HP: 400,
        coolTime: 30000,
        PicArr: ['images/Card/Plants/Garlic.png', 'images/Plants/Garlic/Garlic.gif', 'images/Plants/Garlic/Garlic_body2.gif', 'images/Plants/Garlic/Garlic_body3.gif'],
        Tooltip: '将僵尸赶到其它的横行',
        Produce: '大蒜可以让僵尸改变前进的路线。<p>范围：<font color="#FF0000">近距离接触</font><br>特点：<font color="#FF0000">改变僵尸的前进路线</font></p>路线转向，这不仅仅是大蒜的专业，更是他的热情所在。他在布鲁塞尔大学里，获得了转向学的博士学位。他能把路线向量和反击阵列，讲上一整天。他甚至会把家里的东西，推到街上去。不知道为啥，他老婆还可以忍受这些。',
        InitTrigger: function() {},
        HurtStatus: 0,
        getHurt: function(o, AKind, Attack) {
            var p = this,
                id = p.id;
            !(AKind % 3) ? (p.HP -= Attack) < 1 ? p.Die() : (p.ChangeR(p, o), p.HP < 134 ? p.HurtStatus < 2 && (p.HurtStatus = 2, $(id).src = 'images/Plants/Garlic/Garlic_body3.gif') : p.HP < 267 && p.HurtStatus < 1 && (p.HurtStatus = 1, $(id).src = 'images/Plants/Garlic/Garlic_body2.gif')): p.Die(1);
        },
        ChangeR: function(P, Z) {
            var R = P.R,
                ar = [],
                t = R - 1,
                side;
            Z.CanPass(t) && ar.push(t);
            Z.CanPass(t += 2) && ar.push(t);
            ar.length ? (side = !Z.WalkDirection ? -10 : 10,
                Z.ZX += side,
                Z.AttackedLX += side,
                Z.AttackedRX += side,
                EditImg($(Z.id), '', Z.PicArr[Z.NormalGif], {
                    left: (Z.X += side) + 'px',
                    top: (Z.pixelTop = GetY(t = ar[Math.floor(Math.random() * ar.length)]) - Z.height) + 'px',
                    zIndex: Z.zIndex = 3 * t + 1
                }),
                oZ.moveTo(Z.id, R, t)) : $(Z.id).src = Z.PicArr[Z.NormalGif];
            Z.isAttacking = 0;
        }
    }),
    oSquash = InheritO(CPlants, {
        EName: 'oSquash',
        CName: '窝瓜',
        width: 73,
        height: 85,
        beAttackedPointR: 53,
        SunNum: 50,
        coolTime: 30000,
        PicArr: ['images/Card/Plants/Squash.png', 'images/Plants/Squash/Squash.gif', 'images/Plants/Squash/SquashAttack.gif'],
        Tooltip: '压扁接近的僵尸',
        Produce: '窝瓜会压扁第一个接近它的僵尸。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">短，覆盖所有它压到的僵尸。</font><br>用法：<font color="#FF0000">单独使用</font></p>“我准备好了！”窝瓜大吼道，“干吧！！算我一份！没人比我厉害！我就是你要的人！来啊！等啥啊？要的就是这个！”',
        GetDY: function(R, C, AP) {
            return AP[0] ? -21 : -10;
        },
        canTrigger: 0,
        PrivateBirth: function(o) {
            var id = o.id;
            setTimeout(function() {
                var o;
                (o = $P[id]) && (o.canTrigger = 1);
            }, 1000);
        },
        getHurt: function(o, AKind, Attack) {
            var p = this;
            AKind - 3 ? p.NormalAttack(o) : (p.HP -= Attack) < 1 && p.Die();
        },
        getTriggerRange: function(R, LX, RX) {
            return [
                [LX - 50, RX + 70, 0]
            ];
        },
        TriggerCheck: function(o, d, i) {
            o.beAttacked && o.Altitude > -1 && o.Altitude < 2 && (oT.$[this.R].splice(i, 1), this.NormalAttack(o));
        },
        NormalAttack: function(o) {
            var p = this,
                id = p.id,
                pixelLeft = o.ZX + o.Speed * 4 * (!o.WalkDirection ? -1 : 1) - 50;
            EditImg($(id), '', 'images/Plants/Squash/SquashAttack.gif', {
                left: pixelLeft + 'px',
                top: p.pixelTop - 141 + 'px',
                width: '100px',
                height: '226px'
            });
            p.Die(1);
            (function(id, LX, RX, R) {
                setTimeout(function() {
                    var ar = oZ.getArZ(LX, RX, R),
                        i = ar.length,
                        Z;
                    while (i--)(Z = ar[i]).Altitude > -1 && Z.Altitude < 3 && Z.getHurt(0, 0, 1800, 0, 0, 0, 2);
                    $(id).style.top = GetY(R) - 220 + 'px';
                    setTimeout(function() {
                        ClearImg(id)
                    }, 1850);
                }, 450)
            })(id, pixelLeft, pixelLeft + 100, p.R);
        }
    }),
    oChomper = InheritO(CPlants, {
        EName: 'oChomper',
        CName: '大嘴花',
        width: 130,
        height: 114,
        beAttackedPointR: 70,
        SunNum: 150,
        PicArr: ['images/Card/Plants/Chomper.png', 'images/Plants/Chomper/Chomper.gif', 'images/Plants/Chomper/ChomperAttack.gif', 'images/Plants/Chomper/ChomperDigest.gif'],
        Tooltip: '能一口气吞下一只僵尸, 但处于咀嚼状态中十分脆弱',
        Produce: '大嘴花可以一口吞掉一整只僵尸，但是他们消化僵尸的时候很脆弱。<p>伤害：<font color="#FF0000">巨大</font><br>范围：<font color="#FF0000">非常近</font><br>特点：<font color="#FF0000">消化时间很长</font></p>大嘴花几乎可以去“恐怖小店”，来表演它的绝技了，不过他的经纪人压榨了他太多的钱，所以他没去成。尽管如此，大嘴花没有怨言，只说了句这只是交易的一部分。',
        GetDX: function() {
            return -40;
        },
        getTriggerRange: function(R, LX, RX) {
            return [
                [this.pixelLeft, RX + 70, 0]
            ];
        },
        TriggerCheck: function(o) {
            this.AttackCheck2(o) && (this.canTrigger = 0, this.NormalAttack(this.id, o.id));
        },
        AttackCheck2: function(o) {
            return o.Altitude == 1 && o.beAttacked;
        },
        NormalAttack: function(pid, zid) {
            $(pid).src = 'images/Plants/Chomper/ChomperAttack.gif';
            setTimeout(function() {
                var Z = $Z[zid];
                $P[pid] && (Z && Z.getRaven(pid) ? setTimeout(function() {
                    var P = $P[pid];
                    P && ($(pid).src = 'images/Plants/Chomper/ChomperDigest.gif', P.Digest(pid, 0));
                }, 180) : setTimeout(function() {
                    var P = $P[pid];
                    P && ($(pid).src = 'images/Plants/Chomper/Chomper.gif', P.canTrigger = 1);
                }, 180))
            }, 720);
        },
        Digest: function(pid, i) {
            setTimeout(function() {
                var P = $P[pid];
                P && (++i > 41 ? (P.canTrigger = 1, $(pid).src = 'images/Plants/Chomper/Chomper.gif') : P.Digest(pid, i));
            }, 1000);
        }
    }),
    oFumeShroom = InheritO(CPlants, {
        EName: 'oFumeShroom',
        CName: '大喷菇',
        width: 100,
        height: 88,
        beAttackedPointR: 80,
        SunNum: 75,
        SleepGif: 2,
        PicArr: ['images/Card/Plants/FumeShroom.png', 'images/Plants/FumeShroom/FumeShroom.gif', 'images/Plants/FumeShroom/FumeShroomSleep.gif', 'images/Plants/FumeShroom/FumeShroomAttack.gif', 'images/Plants/FumeShroom/FumeShroomBullet.gif'],
        Tooltip: '喷射可以穿过门板的气液',
        Produce: '大喷菇喷出的臭气可以穿透铁丝网门。<p>伤害：<font color="#FF0000">普通，可穿透铁丝网门</font><br>范围：<font color="#FF0000">臭气中的所有僵尸<br>白天睡觉</font></p>“我以前那份没前途的工作，是为一个面包房生产酵母孢，”大喷菇说。“然后小喷菇，上帝保佑它，告诉了我这个喷杀僵尸的机会。现在我真觉得自己完全不同了。”',
        GetDY: function(R, C, AP) {
            return AP[0] ? -18 : -10;
        },
        GetDX: function() {
            return -45;
        },
        getBirthGif: function() {
            return !oS.DKind ? 0 : (this.canTrigger = 0, this.Sleep = 1, this.PicArr[this.SleepGif]);
        },
        PrivateBirth: function() {
            var P = this,
                BID = P.id + '_Bullet';
            NewEle(BID, 'div', 'position:absolute;display:none;width:343px;height:62px;left:' + P.AttackedRX + 'px;top:' + (P.pixelTop + 5) + 'px;background:url(images/Plants/FumeShroom/FumeShroomBullet.gif);z-index:' + (P.zIndex + 2), 0, 1);
        },
        PrivateDie: function(o) {
            ClearImg(o.id + '_Bullet');
        },
        getTriggerRange: function(R, LX, RX) {
            return [
                [LX, Math.min(RX + 330, 900), 0]
            ];
        },
        NormalAttack: function() {
            var P = this,
                ar = oZ.getArZ(P.AttackedLX, Math.min(P.AttackedRX + 330, 900), P.R),
                i = ar.length,
                Z, pid = P.id,
                BID = pid + '_Bullet';
            while (i--)(Z = ar[i]).Altitude < 2 && Z.getHurt(0, 0, 20, 0, 0, 0, 0);
            $(pid).src = 'images/Plants/FumeShroom/FumeShroomAttack.gif';
            SetBlock($(BID));
            ImgSpriter(BID, pid, [
                ['0 0', 90, 1],
                ['0 -62px', 90, 2],
                ['0 -124px', 90, 3],
                ['0 -186px', 90, 4],
                ['0 -248px', 90, 5],
                ['0 -310px', 90, 6],
                ['0 -372px', 90, 7],
                ['0 -434px', 90, -1]
            ], 0, function(BID, pid) {
                $P[pid] && ($(pid).src = 'images/Plants/FumeShroom/FumeShroom.gif');
                SetNone($(BID));
            });
        }
    }),
    oCoffeeBean = InheritO(CPlants, {
        EName: 'oCoffeeBean',
        CName: '咖啡豆',
        width: 39,
        height: 97,
        beAttackedPointL: 10,
        beAttackedPointR: 29,
        SunNum: 0,
        PKind: 3,
        canEat: 0,
        PicArr: ['images/Card/Plants/CoffeeBean.png', 'images/Plants/CoffeeBean/CoffeeBean.gif', 'images/Plants/CoffeeBean/CoffeeBeanEat.gif'],
        Tooltip: '唤醒在白天里睡觉的蘑菇类植物',
        Produce: '咖啡豆，可以唤醒睡眠中的蘑菇们。<p>使用方法：<font color="#FF0000">单独使用，立即生效</font><br>特点：<font color="#FF0000">可以种在其他植物上，用来唤醒蘑菇们</font></p>咖啡豆：“嘿，伙计们！嘿，怎么回事？是谁？嘿！你瞧见那个东西没？什么东西？哇！是狮子！”嗯，咖啡豆确定，这样可以让自己很兴奋。',
        InitTrigger: function() {},
        GetDBottom: function() {
            return 49
        },
        GetDY: function() {
            return -30;
        },
        CanGrow: function(AP, P) {
            return (P = AP[1]) && P.Sleep && !AP[3];
        },
        getBirthGif: function() {
            return 'images/Plants/CoffeeBean/CoffeeBeanEat.gif';
        },
        PrivateBirth: function(o) {
            var id = o.id,
                R = o.R,
                C = o.C;
            setTimeout(function(P) {
                (P = oGd.$[R + '_' + C + '_1']) && ($(P.id).src = P.PicArr[P.NormalGif], P.canTrigger = 1, P.Sleep = 0);
                o.Die();
            }, 2400);
        }
    }),
    oGloomShroom = InheritO(oFumeShroom, {
        EName: 'oGloomShroom',
        CName: '曾哥',
        width: 88,
        height: 83,
        beAttackedPointR: 68,
        SunNum: 150,
        coolTime: 7500,
        PicArr: ['images/Card/Plants/GloomShroom.png', 'images/Plants/GloomShroom/GloomShroom.gif', 'images/Plants/GloomShroom/GloomShroomSleep.gif', 'images/Plants/GloomShroom/GloomShroomAttack.gif', 'images/Plants/GloomShroom/GloomShroomBullet.gif'],
        Tooltip: '围绕自身释放大量绵羊音<br>(需要大喷菇)',
        Produce: '伪娘终结者，喜欢围绕自身释放大量绵羊音<p><font color="#FF0000">必须种植在大喷菇上</font></p>起初人们一直非议他，后来曾哥用自己独特的绵羊音横扫了宇宙拆迁办，全世界都拜倒在他的脚下。“听说有个节目叫‘快男’？”曾哥说，“没有我在他们真应该感到羞愧。”他于是决定明年去看看。',
        CanGrow: function(AP, R, C) {
            var P = AP[1];
            return P && P.EName == 'oFumeShroom';
        },
        GetDX: CPlants.prototype.GetDX,
        PrivateBirth: function() {
            var P = this,
                BID = P.id + '_Bullet';
            NewEle(BID, 'div', 'position:absolute;display:none;width:210px;height:200px;left:' + (P.pixelLeft - 60) + 'px;top:' + (P.pixelTop - 65) + 'px;background:url(images/Plants/GloomShroom/GloomShroomBullet.gif);z-index:' + (P.zIndex + 2), 0, 1);
        },
        getTriggerRange: function(R, LX, RX) {
            var X = GetX(this.C),
                X1 = this.MinX = X - 120,
                X2 = this.MaxX = X + 120;
            return [
                [X1, X2, 0]
            ];
        },
        getTriggerR: function(R) {
            var R1 = this.MinR = R > 2 ? R - 1 : 1,
                R2 = this.MaxR = R < oS.R ? R + 1 : R;
            return [R1, R2];
        },
        NormalAttack: function() {
            var P = this,
                R, RMax = P.MaxR,
                X1 = P.MinX,
                X2 = P.MaxX,
                ar, i, Z, pid = P.id,
                BID = pid + '_Bullet';
            for (R = P.MinR; R <= RMax; R++) {
                ar = oZ.getArZ(X1, X2, R);
                for (i = ar.length; i--;
                    (Z = ar[i]).Altitude < 2 && Z.getHurt(0, 0, 80, 0, 0, 0, 0));
            }
            $(pid).src = 'images/Plants/GloomShroom/GloomShroomAttack.gif';
            SetBlock($(BID));
            ImgSpriter(BID, pid, [
                ['0 0', 90, 1],
                ['0 -200px', 90, 2],
                ['0 -400px', 90, 3],
                ['0 -600px', 90, 4],
                ['0 -800px', 90, 5],
                ['0 -1000px', 90, 6],
                ['0 -1200px', 90, 7],
                ['0 -1400px', 90, 8],
                ['0 -1600px', 90, 9],
                ['0 -1800px', 90, 10],
                ['0 -2000px', 90, 11],
                ['0 -2200px', 90, -1]
            ], 0, function(BID, pid) {
                $P[pid] && ($(pid).src = 'images/Plants/GloomShroom/GloomShroom.gif');
                SetNone($(BID));
            });
        }
    }),
    oPuffShroom = InheritO(oFumeShroom, {
        EName: 'oPuffShroom',
        CName: '小喷菇',
        width: 40,
        height: 66,
        beAttackedPointL: 15,
        beAttackedPointR: 25,
        SunNum: 0,
        Stature: -1,
        PicArr: ['images/Card/Plants/PuffShroom.png', 'images/Plants/PuffShroom/PuffShroom.gif', 'images/Plants/PuffShroom/PuffShroomSleep.gif', 'images/Plants/ShroomBullet.gif', 'images/Plants/ShroomBulletHit.gif'],
        Tooltip: '向敌人发射短程孢子',
        Produce: '小喷菇是免费的，不过射程很近。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">近<br>白天要睡觉</font></p>小喷菇：“我也是最近才知道僵尸的存在，和很多蘑菇一样，我只是把他们想象成童话和电影里的怪物。不过这次的经历已经让我大开眼界了。',
        GetDX: CPlants.prototype.GetDX,
        getTriggerRange: function(R, LX, RX) {
            return [
                [LX, Math.min(RX + 250, 900), 0]
            ];
        },
        PrivateBirth: function(o) {
            var LX = o.AttackedLX,
                pixelLeft = LX - 46;
            o.BulletClass = NewO({
                X: LX,
                R: o.R,
                pixelLeft: pixelLeft,
                F: oGd.MB2
            });
            o.BulletImg = NewImg('', o.PicArr[3], 'position:absolute;left:' + pixelLeft + 'px;top:' + (o.pixelTop + 40) + 'px;display:none;z-index:' + (o.zIndex + 2), 0);
        },
        PrivateDie: function(o) {
            o.BulletImg = null;
        },
        NormalAttack: function() {
            var o = this,
                PB = o.BulletImg.cloneNode(false),
                OB = new o.BulletClass,
                id;
            OB.id = PB.id = id = 'PSB' + Math.random();
            oGd.$B.push(OB);
            obDAll.appendChild(PB);
            setTimeout(function() {
                var o = $(id);
                o && SetBlock(o)
            }, 100);
        }
    }),
    oScaredyShroom = InheritO(oFumeShroom, {
        EName: 'oScaredyShroom',
        CName: '胆小菇',
        width: 57,
        height: 81,
        beAttackedPointR: 37,
        SunNum: 25,
        Cry: 0,
        ArZ: [],
        Attacking: 0,
        PicArr: ['images/Card/Plants/ScaredyShroom.png', 'images/Plants/ScaredyShroom/ScaredyShroom.gif', 'images/Plants/ScaredyShroom/ScaredyShroomSleep.gif', 'images/Plants/ScaredyShroom/ScaredyShroomCry.gif', 'images/Plants/ShroomBullet.gif', 'images/Plants/ShroomBulletHit.gif'],
        Tooltip: '远程射手, 但敌人靠近时会蜷缩不动',
        Produce: '胆小菇是一种远程射手，敌人接近后会躲起来。<p>伤害：<font color="#FF0000">普通</font><br>特点：<font color="#FF0000">敌人接近后就停止攻击<br>白天睡觉</font></p>“谁在那？”胆小菇低声说，声音细微难辨。“走开！我不想见任何人。除非……除非你是马戏团的人。”',
        GetDX: CPlants.prototype.GetDX,
        getTriggerRange: CPlants.prototype.getTriggerRange,
        getTriggerR: function(R) {
            var R1 = this.MinR = R > 2 ? R - 1 : 1,
                R2 = this.MaxR = R < oS.R ? R + 1 : R;
            return [R1, R2];
        },
        TriggerCheck: function(o, d) {
            var P = this,
                pid = P.id;
            Math.abs(o.ZX - P.MX) < 121 && o.beAttacked ? (P.ArZ.push(o.id), !P.Cry && (P.Cry = 1, $(pid).src = 'images/Plants/ScaredyShroom/ScaredyShroomCry.gif'), P.CryCheck(pid)) : (!P.Cry && !P.Attacking && o.Altitude > 0 && P.NormalAttack());
        },
        PrivateBirth: function(o) {
            var LX = o.AttackedLX,
                pixelLeft = LX - 46;
            o.BulletClass = NewO({
                X: LX,
                R: o.R,
                pixelLeft: pixelLeft,
                F: oGd.MB2
            });
            o.BulletImg = NewImg('', o.PicArr[4], 'position:absolute;left:' + pixelLeft + 'px;top:' + (o.pixelTop + 35) + 'px;display:none;z-index:' + (o.zIndex + 2), 0);
            o.MX = LX + 9;
        },
        PrivateDie: function(o) {
            o.BulletImg = null;
        },
        NormalAttack: function() {
            var o = this,
                pid = o.id,
                PB = o.BulletImg.cloneNode(false),
                OB = new o.BulletClass,
                id;
            o.Attacking = 1;
            OB.id = PB.id = id = 'SSB' + Math.random();
            oGd.$B.push(OB);
            obDAll.appendChild(PB);
            setTimeout(function() {
                var o = $(id);
                o && SetBlock(o)
            }, 100);
            setTimeout(function() {
                var o = $P[pid];
                o && (o.Attacking = 0)
            }, 1400);
        },
        CryCheck: function(pid) {
            setTimeout(function() {
                var P = $P[pid],
                    i, ArZ, Z;
                if (P) {
                    i = (ArZ = P.ArZ).length;
                    while (i--)(!(Z = $Z[ArZ[i]]) || Math.abs(Z.ZX - P.MX) > 120) && ArZ.splice(i, 1);
                    ArZ.length ? P.CryCheck(pid) : (P.Cry = 0, $(pid).src = 'images/Plants/ScaredyShroom/ScaredyShroom.gif');
                }
            }, 1400);
        }
    });