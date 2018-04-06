//Download by http://www.veryhuo.com/down
var JSPVZ, AutoSun, NumZombies = 0,
    FlagZombies = 0,
    AlreadyAddZombiesFlag = 0,
    Win = 0,
    Chose = 0,
    ChoseCard, MPID = '',
    MCID = -1,
    obDAll, obTSunNum, Browser = {
        IE: !!(window.attachEvent && !window.opera),
        IE6: !!(window.attachEvent && !window.opera) && !window.XMLHttpRequest,
        Opera: !!window.opera,
        WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
        Gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1
    },
    ShadowPNG = 'images/plantshadow' + (Browser.IE6 ? 8 : 32) + '.png',
    innerText = Browser.IE ?
    function(o, v) {
        o.innerText = v;
    } : function(o, v) {
        o.textContent = v;
    },
    ZPn = [],
    PPn = [],
    $Z = [],
    $P = [],
    InitLawnMower, CoordLawn = function() {
        ChosePlantX = function(X) {
            return Compare(GetC(X), 1, oS.C, GetX);
        };
        ChosePlantY = function(Y) {
            return $Switch(Y, [86, 181, 281, 386, 476], $f('a<b'), [
                [75, 0],
                [175, 1],
                [270, 2],
                [380, 3],
                [470, 4],
                [575, 5]
            ]);
        };
        GetC = function(X) {
            return $Switch(X, [100, 140, 220, 295, 379, 460, 540, 625, 695, 775, 855, 935], $f('a<b'), [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        };
        GetR = function(Y) {
            return $Switch(Y, [86, 181, 281, 386, 476], $f('a<b'), [0, 1, 2, 3, 4, 5]);
        };
        GetX = function(C) {
            return $Switch(C, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], $f('a==b'), [100, 140, 187, 267, 347, 427, 507, 587, 667, 747, 827, 865, 950]);
        };
        GetY = function(R) {
            return $Switch(R, [0, 1, 2, 3, 4], $f('a==b'), [75, 175, 270, 380, 470, 575]);
        };
        GetY1Y2 = function(R) {
            return $Switch(R, [0, 1, 2, 3, 4], $f('a==b'), [
                [0, 85],
                [86, 180],
                [181, 280],
                [281, 385],
                [386, 475],
                [476, 600]
            ]);
        };
        !InitLawnMower && (InitLawnMower = function() {
            var R = 6;
            while (--R) {
                oGd.$LM[R] = 1;
                NewImg('LawnMower' + R, 'images/LawnMower.gif', 'position:absolute;left:70px;top:' + (GetY(R) - 60) + 'px;z-index:' + (3 * R + 2), 1);
            }
        });
    },
    InitGround = function() {
        oP.Init();
        oP.SelectZombie();
        NewImg('imgGrowSoil', 'images/interface/GrowSoil.png', 'position:absolute;left:0;top:0;display:none;z-index:50;', 1);
        NewEle('dTitle', 'div', 'display:none', 0, 1);
        innerText(obTSunNum, oS.SunNum);
        SetNone($('dSelectModal'));
        SetStyle($('tGround'), {
            background: 'url(' + oS.backgroundImage + ') no-repeat',
            display: 'block'
        });
        AutoSun && AutoClickSun();
        InitPCard();
        setTimeout(function() {
            GoSelectCard()
        }, 1000);
    },
    LoadAccess = InitGround,
    StartGame, oS = {
        PicArr: [],
        W: 900,
        H: 600,
        R: 5,
        C: 9,
        PName: [],
        ZName: [],
        AccessNum: 0,
        PicNum: 0,
        SunNum: 50,
        DKind: 1,
        Coord: CoordLawn,
        backgroundImage: '',
        LF: [0, 1, 1, 1, 1, 1],
        CanSelectCard: 1,
        CanSelectZombies: [],
        LargeWaveFlag: {},
        Init: function(o, f) {
            for (f in o) this[f] = o[f];
            var R = this.R;
            oT.Init(R);
            oZ.Init(R);
            oGd.Init();
            FlagHeadStep = Math.floor(140 / (o.FlagNum - 1));
            obDAll = $('dAll');
            obTSunNum = $('tSunNum');
            this.Coord();
            this.LoadMusic();
            this.LoadProgress();
        },
        LoadProgress: function(n, proto, pa) {
            var o = oS,
                aZ = [],
                aP = [],
                PicArr = o.PicArr,
                PName = o.PName,
                ZName = o.ZName,
                S = document.createTextNode('正在准备载入游戏素材。。。');
            innerText($('sFlagMeterTitleF'), S.data);
            $('dFlagMeterTitleB').insertBefore(S, $('sFlagMeterTitleF'));
            for (n = PName.length; n--;) {
                pa = (proto = PName[n].prototype).PicArr.slice(0);
                aP.push([proto.EName, pa.splice(proto.NormalGif, 1)]);
                Array.prototype.push.apply(PicArr, pa);
            }
            for (n in oS.LargeWaveFlag) {
                ZName.push(oFlagZombie);
                break;
            }
            for (n = ZName.length; n--;) {
                pa = (proto = ZName[n].prototype).PicArr.slice(0);
                aZ.push([proto.EName, pa.splice(proto.NormalGif, 1)]);
                Array.prototype.push.apply(PicArr, pa);
            }
            o.PicNum = o.PicArr.length + aP.length + aZ.length;
            for (n = PicArr.length; n--;) {
                o.LoadImage(PicArr[n], '', o.CheckImg);
            }
            for (n = aP.length; n--;) {
                o.LoadImage(aP[n][1], aP[n][0], o.InitPPn);
            }
            for (n = aZ.length; n--;) {
                o.LoadImage(aZ[n][1], aZ[n][0], o.InitZPn);
            }
            SetStyle($('dFlagMeter'), {
                left: '50px',
                top: '280px',
                display: 'block'
            });
            SetHidden($('imgGQJC'));
            SetVisible($('tdFlagMeter'));
            $('imgFlagMeterFull').style.clip = 'rect(0px,157px,21px,157px)';
        },
        InitPPn: function(EN, img) {
            (PPn[EN] = img).style.cssText = 'position:absolute;';
            oS.CheckImg();
        },
        InitZPn: function(EN, img) {
            (ZPn[EN] = img).style.cssText = 'position:absolute;';
            oS.CheckImg();
        },
        LoadImage: function(url, id, callback) {
            var img = new Image();
            Browser.IE ?
                function() {
                    img.onreadystatechange = function() {
                        if (img.readyState == 'complete' || img.readyState == 'loaded') callback(id, img);
                    }
                }() : function() {
                    img.onload = function() {
                        if (img.complete) callback(id, img);
                    }
                }();
            img.onerror = function() {
                img.onreadystatechange = null;
                img.title = url;
                callback(id, img);
            };
            img.src = url;
        },
        CheckImg: function(LoadAccessNum, imgFlagHeadLeft, S) {
            imgFlagHeadLeft = 139 - oS.AccessNum++ * (140 / oS.PicNum) - 11;
            $('imgFlagHead').style.left = imgFlagHeadLeft + 'px';
            S = '载入:(' + oS.AccessNum + '/' + oS.PicNum + ')';
            innerText($('sFlagMeterTitleF'), S);
            $('dFlagMeterTitleB').firstChild.data = S;
            $('imgFlagMeterFull').style.clip = 'rect(0px,157px,21px,' + (imgFlagHeadLeft + 11) + 'px)';
            if (oS.AccessNum == oS.PicNum) {
                SetStyle($('dFlagMeter'), {
                    left: '260px',
                    top: '560px',
                    display: 'none'
                });
                innerText($('sFlagMeterTitleF'), oS.LevelName);
                $('dFlagMeterTitleB').firstChild.data = oS.LevelName;
                SetHidden($('tdFlagMeter'));
                $('imgFlagHead').style.left = '139px';
                $('imgFlagMeterFull').style.clip = 'rect(0px,157px,21px,157px)';
                AutoSun = Math.floor(getCookie('JSPVZAutoSun'));
                AutoSun && ($('cAutoSun').checked = true);
                LoadAccess();
            }
        }
    },
    oGd = {
        Init: function() {
            this.$ = [];
            this.$Crater = [];
            this.$Torch = [];
            this.$LF = oS.LF;
            this.$LM = [];
            this.$B = [];
        },
        add: function(o, R, C, PKind) {
            var s = R + '_' + C + '_' + PKind,
                p = this.$[s];
            p && p.Die();
            this.$[s] = o;
        },
        del: function(o) {
            delete this.$[o.R + '_' + o.C + '_' + o.PKind];
        },
        MoveBullet: function() {
            var B = oGd.$B,
                i = B.length,
                o;
            while (i--)(o = B[i]).F(o, i);
        },
        MB1: function(o, i) {
            var id = o.id,
                img = $(id),
                Attack = o.Attack,
                D = o.D,
                side, C = GetC(o.X),
                R = o.R,
                Kind = o.Kind,
                ChangeC = o.ChangeC,
                Z = oZ.getZ(o.X, R, D);
            Kind < 1 && oGd.$Torch[R + '_' + C] && ChangeC != C && ((Kind = o.Kind += 1) && (Attack = o.Attack = 40), o.ChangeC = C, img.src = 'images/Plants/PB' + Kind + D + '.gif');
            Z && Z.Altitude == 1 ? (Z.getHurt(-1, D, Attack, Kind, 0, 0, 0), oGd.$B.splice(i, 1), EditImg(img, '', 'images/Plants/PeaBulletHit.gif', {
                left: o.pixelLeft + 28 + 'px',
                width: '52px',
                height: '46px'
            }), setTimeout(function() {
                ClearImg(id)
            }, 100)) : (o.X += (side = !D ? 10 : -10)) < oS.W && o.X > 100 ? img.style.left = (o.pixelLeft += side) + 'px' : (oGd.$B.splice(i, 1), ClearImg(id));
        },
        MB2: function(o, i) {
            var id = o.id,
                img = $(id),
                C = GetC(o.X),
                R = o.R,
                Z = oZ.getZ(o.X, R, 0);
            Z && Z.Altitude == 1 ? (Z.getHurt(-1, 0, 20, 0, 0, 0, 0), oGd.$B.splice(i, 1), EditImg(img, '', 'images/Plants/ShroomBulletHit.gif', {
                left: o.pixelLeft + 38 + 'px',
                width: '52px',
                height: '46px'
            }), setTimeout(function() {
                ClearImg(id)
            }, 100)) : (o.X += 10) < oS.W ? img.style.left = (o.pixelLeft += 10) + 'px' : (oGd.$B.splice(i, 1), ClearImg(id));
        },
        MB3: function(o) {}
    },
    oZ = {
        Init: function(r) {
            this.$ = [];
            this.$R = [];
            var i;
            for (i = r; i; this.$[i] = [], this.$R[i--] = []);
        },
        add: function(o, _r) {
            (_r = this.$[o.R]).push(o);
            _r.sort(function(a, b) {
                return a.AttackedLX - b.AttackedLX
            });
            _r.RefreshTime = new Date;
        },
        getZ: function(x, r, d) {
            var i = 0,
                aL = this.$[r],
                aR = this.$R[r],
                a, Z, t, len;
            if (!d) {
                len = (a = aL).length;
                while (i < len && (Z = a[i++]).AttackedLX <= x)
                    if (Z.HP && Z.AttackedRX >= x) return Z;
            } else {
                (t = aL.RefreshTime) == aR.RefreshTime ? a = aR : (a = (this.$R[r] = aL.slice(0)).sort(function(a, b) {
                    return b.AttackedRX - a.AttackedRX
                })).RefreshTime = t;
                len = a.length;
                while (i < len && (Z = a[i++]).AttackedRX >= x)
                    if (Z.HP && Z.AttackedLX <= x) return Z;
            }
            return;
        },
        getArZ: function(lx, rx, r) {
            var i = 0,
                a = this.$[r],
                ar = [],
                Z, len = a.length;
            while (i < len && (Z = a[i++]).AttackedLX <= rx) Z.HP && (Z.AttackedLX >= lx || Z.AttackedRX >= lx) && ar.push(Z);
            return ar;
        },
        moveTo: function(id, R1, R2) {
            var $R1 = this.$[R1],
                $R2 = this.$[R2],
                i = $R1.length;
            while (i--) $R1[i].id == id && ((o = $R1.splice(i, 1)).R = R2, $R2.push(o), ($R2.sort(function(a, b) {
                return a.AttackedLX - b.AttackedLX
            })).RefreshTime = $R1.RefreshTime = new Date, i = 0);
        },
        traversalOf: function() {
            var o, F1, F2, F3, D = new Date,
                Speed, ar = this.$,
                arR, i, Resort = 0,
                Refresh = 0,
                oLX = 1000,
                LX, zid, func = function(o, s) {
                    s ? (LX = o.AttackedLX) > oLX && (Resort = 1, Refresh = 1) : Refresh = 1;
                    oLX = LX;
                },
                R = ar.length;
            while (--R) {
                i = (arR = ar[R]).length;
                while (i--) {
                    o = arR[i];
                    o.HP && o.Altitude < 3 && oT.check(o);
                    if (!o.HP) {
                        arR.splice(i, 1);
                        func(o, 0);
                        continue;
                    }
                    F1 = o.FreeFreezeTime;
                    F2 = o.FreeSetbodyTime;
                    zid = o.id;
                    switch (true) {
                        case !F1 && !F2:
                            o.beAttacked && !o.isAttacking && o.JudgeAttack();
                            break;
                        default:
                            F1 && D >= F1 && (o.FreeFreezeTime = F1 = '');
                            F2 && D >= F2 && (o.FreeSetbodyTime = F2 = '');
                            if (F1 || F2) {
                                func(o, 1);
                                continue;
                            } else {
                                o.JudgeAttack();
                            }
                    }(F3 = o.FreeSlowTime) && D >= F3 && (o.Speed = o.OSpeed, o.FreeSlowTime = '');
                    if (!o.isAttacking) {
                        Speed = o.Speed;
                        if (!o.WalkDirection) {
                            if (GetC(o.ZX = o.AttackedLX -= Speed)) {
                                if ((o.AttackedRX -= Speed) < 100) {
                                    GameOver();
                                    return;
                                }
                            } else {
                                if (oGd.$LM[R]) {
                                    arR.splice(i, 1);
                                    o.Die(2);
                                    LawnMowerKill(R);
                                    func(o, 0);
                                    continue;
                                }
                            }
                            $(zid).style.left = Math.floor(o.X -= Speed) + 'px';
                        } else {
                            if ((o.AttackedLX += Speed) > oS.W) {
                                arR.splice(i, 1);
                                o.Die(2);
                                func(o, 0);
                                continue;
                            }
                            o.ZX = o.AttackedRX += Speed;
                            $(zid).style.left = Math.ceil(o.X += Speed) + 'px';
                        }
                        $(zid + '_shadow').style.left = o.ZX - 10 + 'px';
                    }
                    func(o, 1);
                }
                Resort ? (Resort = 0, arR.sort(function(a, b) {
                    return a.AttackedLX - b.AttackedLX
                }), arR.RefreshTime = new Date) : Refresh && (arR.RefreshTime = new Date);
            }
        }
    },
    oT = {
        Init: function(r) {
            this.$ = [];
            this.$L = [];
            for (var i = r; i;) {
                this.$[i] = [];
                this.$L[i--] = [];
            }
        },
        add: function(R, ar, id) {
            var t = this.$[R],
                i = ar.length,
                a;
            while (i--) {
                a = ar[i];
                t.push([a[0], a[1], a[2], id]);
            }
            t.sort(function(a, b) {
                return b[1] - a[1]
            });
            t.RefreshTime = new Date;
        },
        check: function(o, _r, _t, _tp, _p, _$L, _R) {
            var LX = o.AttackedLX,
                RX = o.AttackedRX,
                i = 0,
                rT = this.$[_R = o.R];
            if (!o.WalkDirection) {
                while (i < rT.length && (_tp = rT[i])[1] >= LX) {
                    (_p = $P[_tp[3]]).canTrigger && _tp[0] <= LX && _p.TriggerCheck(o, _tp[2], i);
                    ++i;
                }
            } else {
                (_t = rT.RefreshTime) == (_$L = this.$L[_R]).RefreshTime ? _r = _$L : (_r = (this.$L[_R] = rT.slice(0)).sort(function(a, b) {
                    return a[0] - b[0]
                })).RefreshTime = _t;
                while (i < _r.length && (_tp = _r[i])[0] <= RX) {
                    (_p = $P[_tp[3]]).canTrigger && _tp[1] >= RX && _p.TriggerCheck(o, _tp[2], i);
                    ++i;
                }
            }
        },
        delP: function(o) {
            var T = o.oTrigger,
                id = o.id,
                R, $R, i;
            for (R in T) {
                for (i = ($R = this.$[R]).length; i--; $R[i][3] == id && $R.splice(i, 1));
                $R.RefreshTime = new Date;
            }
        },
        indexOf: function(aT, s) {
            var e = new RegExp(s + ',', 'g'),
                str = (aT.toString() + ',').replace(e, "┢,").replace(/[^,┢]/g, ""),
                c = 0,
                off = 0,
                a = [];
            for (;
                (off = str.indexOf('┢', off)) > 0; a.push((off++ - c++ - 2) / 3));
            return a;
        }
    },
    oP = {
        Init: function() {
            this.AF = oS.LargeWaveFlag;
            this.Ar = oS.ArrayZombies;
            this.LAr = this.Ar.length;
            this.MaxStr = this.Ar[this.LAr - 1].prototype.Lvl;
            this.MinStr = this.Ar[0].prototype.Lvl;
            this.SelectZombie = function() {
                var ar = oP.Ar,
                    SelectNum = oS.ZombieKind - ar.length,
                    n, aSelect = oS.CanSelectZombies;
                if (SelectNum > 0 && aSelect.length)
                    for (n = SelectNum; n-- && aSelect.length; ar.push(aSelect.splice(Math.floor(Math.random() * aSelect.length), 1)));
                ar.sort(function(a, b) {
                    return a.prototype.Lvl - b.prototype.Lvl
                });
            }, this.SelectFlagZombie = function(SumNum) {
                var ar = oP.Ar,
                    i = oP.LAr,
                    MinStr = oP.MinStr,
                    MaxStr = oP.MaxStr,
                    tmp, n = 0,
                    aZ = [];
                while (SumNum > 0) {
                    switch (true) {
                        case SumNum <= MinStr:
                            break;
                        case SumNum >= MaxStr:
                            n = Math.floor(Math.random() * i);
                            break;
                        default:
                            for (n = i - 1; n-- && ar[n].prototype.Lvl > SumNum;);
                            n = Math.floor(Math.random() * (n + 1));
                    }
                    aZ.push(tmp = ar[n]);
                    SumNum -= tmp.prototype.Lvl;
                }
                return aZ;
            }, this.AddZombiesFlag = function(f) {
                var AF = this.AF,
                    SelectFlagZombie = this.SelectFlagZombie,
                    SetTimeoutZombie = this.SetTimeoutZombie,
                    N, o = FlagToSumNum,
                    ar, FH = 139 - FlagZombies * FlagHeadStep,
                    SumNum;
                if (!FlagZombies) {
                    SetVisible($('imgGQJC'));
                    SetVisible($('tdFlagMeter'));
                    for (N in AF) N < oS.FlagNum ? SetStyle(AF[N], {
                        display: 'block',
                        left: (150 - (N - 1) * FlagHeadStep) + 'px'
                    }) : SetBlock(AF[N]);
                    setInterval(oGd.MoveBullet, 20);
                }
                SumNum = $Switch(FlagZombies++, o.a1, o.f, o.a2);
                oS.FlagNum > FlagZombies ? ($('imgFlagHead').style.left = FH + 'px', $('imgFlagMeterFull').style.clip = 'rect(0px,157px,21px,' + (FH + 11) + 'px)') : ($('imgFlagHead').style.left = '-1px', $('imgFlagMeterFull').style.clip = 'rect(0px,157px,21px,0px)');
                (N = AF[FlagZombies]) ? (N.style.top = '5px', (ar = SelectFlagZombie(--SumNum)).unshift(oFlagZombie)) : ar = SelectFlagZombie(SumNum);
                NumZombies += ar.length;
                SetTimeoutZombie(ar);
                AlreadyAddZombiesFlag = 0;
                f && f();
            }, this.SetTimeoutZombie = function(ar) {
                (new(ar.shift())).Birth();
                ar.length && setTimeout(function() {
                    oP.SetTimeoutZombie(ar)
                }, 1500);
            }, this.FlagMeter = function(timer, f, f2) {
                if (timer > 249) {
                    AlreadyAddZombiesFlag = 1;
                    oP.AddZombiesFlag(f2);
                    return 0;
                }
                if (!NumZombies) {
                    AlreadyAddZombiesFlag = 1;
                    f && f();
                    setTimeout(function() {
                        oP.AddZombiesFlag(f2)
                    }, 5000);
                    return 0;
                }
                f && timer > 169 && timer < 181 && f();
                return ++timer;
            }, this.Monitor = function(Num, f1, arg, f2) {
                var o, s;
                if (Win) return;
                switch (FlagZombies) {
                    case 0:
                        break;
                    case oS.FlagNum:
                        if (!NumZombies) {
                            FlagToEnd();
                            return;
                        }
                        break;
                    default:
                        !AlreadyAddZombiesFlag && (o = FlagToMonitor, s = $Switch(FlagZombies, o.a1, o.f, o.a2), Num = oP.FlagMeter(Num, s, f2));
                }
                oZ.traversalOf();
                if (Win) return;
                f1 && (arg = f1(arg));
                setTimeout(function() {
                    oP.Monitor(Num, f1, arg, f2)
                }, 100);
            }
        }
    },
    WhichMouseButton = function(e) {
        var MouseButton = 1;
        e = window.event || e;
        if (!Browser.Gecko) {
            switch (e.button) {
                case 1:
                    MouseButton = 1;
                    break;
                case 0:
                    MouseButton = Browser.IE ? 2 : 1;
                    break;
                case 2:
                    MouseButton = 2;
            }
        } else {
            switch (e.which) {
                case 1:
                    MouseButton = 1;
                    break;
                case 3:
                    MouseButton = 2;
            }
        }
        return MouseButton;
    },
    GroundOnmousedown = function(e) {
        e = e || event;
        var eX = e.clientX,
            eY = e.clientY + document.body.scrollTop,
            XC = ChosePlantX(eX),
            YR = ChosePlantY(eY),
            X = XC[0],
            Y = YR[0],
            R = YR[1],
            C = XC[1];
        switch (Chose) {
            case 1:
                WhichMouseButton(e) < 2 ? GrowPlant(GetAP(eX, eY, R, C)[0], X, Y, R, C) : CancelPlant();
                break;
            case -1:
                WhichMouseButton(e) < 2 ? ShovelPlant(GetAP(eX, eY, R, C)) : CancelShovel();
        }
    },
    GetAP = function(eX, eY, R, C) {
        var K, $P = oGd.$,
            P, AP = [],
            P0;
        for (K = 0; K < 4; K++) {
            AP.push(P = $P[R + '_' + C + '_' + K]);
            P && !(eX < P.pixelLeft || eX > P.pixelRight || eY < P.pixelTop || eY > P.pixelBottom) && (P0 = P);
        }
        return [AP, P0];
    },
    GroundOnkeydown = function(e) {
        e = e || event;
        if (e.keyCode == 27) {
            switch (Chose) {
                case 1:
                    CancelPlant();
                    break;
                case -1:
                    CancelShovel();
            }
            return false;
        }
    },
    GroundOnmousemove = function(e) {
        e = e || event;
        var eX = e.clientX,
            eY = e.clientY + document.body.scrollTop,
            XC = ChosePlantX(eX),
            YR = ChosePlantY(eY),
            X = XC[0],
            Y = YR[0],
            R = YR[1],
            C = XC[1],
            AP = GetAP(eX, eY, R, C);
        switch (Chose) {
            case 1:
                var Pro = ArCard[ChoseCard].PName.prototype;
                SetStyle($('MovePlant'), {
                    left: eX - Pro.width * 0.5 + 'px',
                    top: eY - Pro.height * 0.5 + 'px'
                });
                Pro.CanGrow(AP[0], R, C) ? SetStyle($('MovePlantAlpha'), {
                    display: 'block',
                    left: X + Pro.GetDX() + 'px',
                    top: Y - Pro.height + Pro.GetDY(R, C, AP[0]) + 'px'
                }) : SetNone($('MovePlantAlpha'));
                break;
            case -1:
                var P = AP[1],
                    ID = P ? P.id : '';
                MPID != ID && (MPID && SetAlpha($(MPID), 100, 1), (MPID = ID) && SetAlpha($(ID), 60, 0.6));
                SetStyle($('tShovel'), {
                    left: eX - 15 + 'px',
                    top: eY - 16 + 'px'
                });
        }
    },
    GoSelectCard = function() {
        obDAll.scrollLeft += 25;
        obDAll.scrollLeft < 500 ? setTimeout(function() {
            GoSelectCard()
        }, 20) : (DisplayZombie(), SetBlock($('dMenu')), oS.CanSelectCard ? (SetBlock($('dTop')), SetBlock($('dSelectCard')), SetVisible($('dCardList'))) : (SetBlock($("dZombie")), AutoSelectCard(), setTimeout(function() {
            LetsGO();
            SetVisible($('dCardList'));
        }, 2000)));
    },
    ViewProducePlant = function(o) {
        var Pro = o.prototype;
        $('pHandBookPlant').src = Pro.PicArr[Pro.NormalGif];
        $('tdProducePlant').innerHTML = Pro.Produce;
        innerText($('tdHandBookPlantName'), Pro.CName);
        innerText($('spSunNum'), Pro.SunNum);
        innerText($('spCoolTime'), Pro.coolTime * 0.001 + '秒');
    },
    ViewProduceZombie = function(o) {
        var Pro = o.prototype;
        $('pHandBookZombie').src = Pro.PicArr[Pro.NormalGif];
        $('tdProduceZombie').innerHTML = Pro.Produce;
        innerText($('tdHandBookZombieName'), Pro.CName);
    },
    DisplayZombie = function() {
        var ar = oS.ArrayZombies,
            l1 = l2 = ar.length,
            Pro, dZ = $('dZombie'),
            aY = [];
        while (l1--) aY.push(Math.floor(150 + Math.random() * 444));
        aY.sort(function(a, b) {
            return b - a
        });
        while (l2--) dZ.appendChild(EditImg(ZPn[(Pro = ar[l2].prototype).EName].cloneNode(false), '', '', {
            position: 'absolute',
            left: Math.floor(50 + Math.random() * 201) - Pro.width * 0.5 + 'px',
            top: aY[l2] - Pro.height + 'px'
        }, 0));
    },
    ArCard = [],
    ArPCard = [],
    AutoSelectCard = function() {
        var PName = oS.PName,
            i = -1,
            L = PName.length;
        while (++i < L) SelectCard(PName[i].prototype.EName);
    },
    InitPCard = function() {
        var s = '',
            P, PName = oS.PName,
            L = PName.length,
            i = 0,
            Pro;
        while (i < L) {
            P = PName[i];
            Pro = P.prototype;
            ArPCard[EName = Pro.EName] = {
                Select: 0,
                PName: P
            };
            s += '<span class="span1" id="Card' + EName + '" title="' + Pro.CName + '" onclick="SelectCard(\'' + EName + '\')"><img src="' + Pro.PicArr[Pro.CardGif] + '"><span class="span2">' + Pro.SunNum + '</span></span>';
            i++ % 6 == 5 && (s += '<br>');
        }
        $('dPCard').innerHTML = s;
    },
    SelectCard = function(EName) {
        var Card = $('Card' + EName).firstChild,
            o = ArPCard[EName],
            d, d2, d3, bOK = $('btnOK');
        if (!o.Select) {
            if (!(ArPCard.SelNum |= 0)) {
                bOK.disabled = '';
                bOK.style.color = '#FFCC66';
            } else {
                if (ArPCard.SelNum > 9) return;
            }++ArPCard.SelNum;
            o.Select = 1;
            $('dCardList').appendChild(d = NewEle('dCard' + EName, 'div', 0, {
                onclick: function() {
                    SelectCard(EName);
                }
            }));
            (d2 = $n('img')).src = Card.src;
            d.appendChild(d2);
            d.appendChild(d3 = NewEle('sSunNum' + EName, 'span'));
            innerText(d3, o.PName.prototype.SunNum);
            SetAlpha(Card, 50, 0.5);
        } else {
            o.Select = 0;
            !--ArPCard.SelNum && (bOK.disabled = 'disabled', bOK.style.color = '#888888');
            d2 = (d = $('dCard' + EName)).firstChild;
            d3 = d.lastChild;
            $('dCardList').removeChild(d);
            d.removeChild(d2);
            d.removeChild(d3);
            d2 = null;
            d3 = null;
            d.onclick = null;
            d = null;
            SetAlpha(Card, 100, 1);
        }
    },
    ResetSelectCard = function() {
        var EName;
        for (EName in ArPCard) ArPCard[EName].Select && SelectCard(EName);
        $('btnOK').disabled = 'disalbed';
        $('btnOK').style.color = '#888888';
    },
    LetsGO = function() {
        var Z = $('dZombie'),
            o = $('dCardList'),
            i = 0,
            L = o.childNodes.length,
            EName, P, Pro, sp, d, d2, B = $('dBody');
        while (Z.hasChildNodes()) {
            Z.removeChild(d = Z.lastChild);
            d = null;
        }
        SetNone(Z);
        SetNone($('dSelectCard'));
        $('tGround').style.left = '-115px';
        obDAll.scrollLeft = 0;
        SetStyle($('dTop'), {
            left: '105px',
            top: 0
        });
        o.style.left = 0;
        while (i < L) {
            (function(i) {
                EName = (d = o.childNodes[i]).id.substr(5);
                Pro = (P = ArPCard[EName].PName).prototype;
                d.onclick = function(event) {
                    ChosePlant(event, i)
                };
                d.onmouseover = function() {
                    MCID = i;
                }
                d.onmousemove = function(event) {
                    ViewPlantTitle(i, event)
                };
                d.onmouseout = function() {
                    MCID = -1;
                    SetNone($('dTitle'))
                };
                d2 = d.lastChild;
                d2.id = 'sSunNum' + i;
                innerText(d2, Pro.SunNum);
                SetAlpha(d.firstChild, 50, 0.5);
                ArCard.push({
                    DID: d.id,
                    CDReady: 0,
                    SunReady: 0,
                    PName: P
                });
            })(i++);
        }
        B.onkeydown = function(event) {
            GroundOnkeydown(event)
        };
        B.onmousedown = function(event) {
            GroundOnmousedown(event)
        };
        B.onmousemove = function(event) {
            GroundOnmousemove(event)
        };
        StartGame();
    },
    ViewPlantTitle = function(i, e) {
        e = e || window.event;
        var d = $('dTitle'),
            AC = ArCard[i],
            Pro = AC.PName.prototype,
            S = Pro.CName + '<br>' + Pro.Tooltip;
        !AC.CDReady && (S += '<br><span style="color:#F00">正在重新装填中...</span>');
        !AC.SunReady && (S += '<br><span style="color:#F00">阳光不足!</span>');
        d.innerHTML = S;
        e && SetStyle(d, {
            left: e.clientX - 3 + 'px',
            top: e.clientY + 18 + 'px',
            display: 'block'
        });
    },
    BeginCool = function() {
        var i = ArCard.length,
            Pro, AC, cT, sN;
        while (i--) {
            cT = (Pro = (AC = ArCard[i]).PName.prototype).coolTime;
            sN = Pro.SunNum;
            switch (cT) {
                case 7500:
                    AC.CDReady = 1;
                    sN <= oS.SunNum && (AC.SunReady = 1, SetAlpha($(AC.DID).firstChild, 100, 1));
                    break;
                case 30000:
                    DoCoolTimer(i, 20000, 20000);
                    break;
                default:
                    DoCoolTimer(i, 35000, 35000);
            }
        }
    },
    MonitorCard = function(AC) {
        var i = ArCard.length;
        while (i--) {
            (AC = ArCard[i]).PName.prototype.SunNum > oS.SunNum ? (AC.SunReady && (AC.SunReady = 0), SetAlpha($(AC.DID).firstChild, 50, 0.5)) : (!AC.SunReady && (AC.SunReady = 1), AC.SunReady && AC.CDReady && Chose < 1 && SetAlpha($(AC.DID).firstChild, 100, 1));
        }
        MCID > -1 && ViewPlantTitle(MCID);
    },
    DoCoolTimer = function(n, T, MaxT) {
        var AC = ArCard[n],
            O = $(AC.DID),
            o1, o2, V;
        T != MaxT ?
            function() {
                (T -= 500) > 0 ?
                    function() {
                        V = (T * 0.001).toFixed(1)
                        innerText($('dCD1' + n), V);
                        innerText($('dCD2' + n), V);
                        setTimeout(function() {
                            DoCoolTimer(n, T, MaxT)
                        }, 500);
                    }() : function() {
                        O.removeChild(o1 = $('dCD1' + n));
                        O.removeChild(o2 = $('dCD2' + n));
                        o1 = null;
                        o2 = null;
                        AC.CDReady = 1;
                        MonitorCard();
                    }();
            }() : function() {
                o1 = NewEle('dCD1' + n, 'span', 'position:absolute;left:22px;top:22px;font-size:15pt;font-weight:500;font-family:Verdana;color:#000');
                o2 = NewEle('dCD2' + n, 'span', 'position:absolute;left:20px;top:20px;font-size:15pt;font-weight:500;font-family:Verdana;color:#FF0');
                O.appendChild(o1);
                O.appendChild(o2);
                V = (T * 0.001).toFixed(1);
                innerText(o1, V);
                innerText(o2, V);
                setTimeout(function() {
                    DoCoolTimer(n, T - 500, MaxT)
                }, 500);
            }();
    },
    ChosePlant = function(evt, Inx) {
        var AC = ArCard[ChoseCard = Inx];
        if (!(AC.CDReady && AC.SunReady)) return;
        var clientX = (evt = evt || event).clientX,
            clientY = evt.clientY + document.body.scrollTop,
            Pro = AC.PName.prototype,
            P, i = ArCard.length;
        Chose = 1;
        P = EditImg(PPn[Pro.EName].cloneNode(false), 'MovePlant', '', {
            position: 'absolute',
            left: clientX - Pro.width * 0.5 + 'px',
            top: clientY - Pro.height * 0.5 + 'px',
            zIndex: 254
        }, 1);
        EditImg(P.cloneNode(false), 'MovePlantAlpha', '', {
            display: 'none',
            filter: 'alpha(opacity=40)',
            opacity: 0.4,
            zIndex: 30
        }, 1);
        while (i--) SetAlpha($(ArCard[i].DID).firstChild, 50, 0.5);
    },
    CancelPlant = function() {
        ClearImg('MovePlant');
        ClearImg('MovePlantAlpha');
        Chose = 0;
        MonitorCard();
    },
    ShovelPlant = function(Ar) {
        var AP = Ar[0],
            P = Ar[1];
        P && (P.PKind || !(AP[1] || AP[2])) && (P.Die(), MPID = '');
        CancelShovel();
    },
    CancelShovel = function(o) {
        ClearImg('tShovel');
        Chose = 0;
        SetBlock($('imgShovel'));
    },
    ChoseShovel = function(e) {
        WhichMouseButton(e) < 2 && (SetNone($('imgShovel')), NewImg('tShovel', 'images/interface/Shovel.png', 'position:absolute;left:' + (e.clientX - 10) + 'px;top:' + (e.clientY + document.body.scrollTop - 17) + 'px;z-index:1', 1), Chose = -1, StopBubble(e));
    },
    StopBubble = function(e) {
        window.event ? event.cancelBubble = true : e.stopPropagation();
    },
    GrowPlant = function(AP, X, Y, R, C) {
        var AC = ArCard[ChoseCard],
            P = AC.PName,
            Pro = P.prototype;
        Pro.CanGrow(AP, R, C) && ((new P).Birth(X, Y, R, C, AP), innerText(obTSunNum, oS.SunNum -= Pro.SunNum), SetAlpha($(AC.DID).firstChild, 50, 0.5), AC.CDReady = 0, DoCoolTimer(ChoseCard, Pro.coolTime, Pro.coolTime), SetStyle($('imgGrowSoil'), {
            left: X - 30 + 'px',
            top: Y - 40 + 'px',
            zIndex: 3 * R,
            display: 'block'
        }), setTimeout(function() {
            SetNone($('imgGrowSoil'))
        }, 200));
        CancelPlant();
    },
    AutoProduceSun = function(N) {
        !Win && (AppearSun(GetX(Math.floor(1 + Math.random() * oS.C)), GetY(Math.floor(1 + Math.random() * oS.R)), N, 1), setTimeout(function() {
            AutoProduceSun(N);
        }, Math.floor(9 + Math.random() * 3) * 1000));
    },
    ArSun = [],
    AppearSun = function(X, Y, N, drop) {
        if (Win) return;
        var H, top, id = 'Sun' + Math.random(),
            cssText = 'position:absolute;cursor:pointer;z-index:25;filter:alpha(opacity=80);opacity:0.8;left:' + X + 'px;'
        switch (N) {
            case 25:
                cssText += 'width:78px;height:78px;';
                H = 39;
                break;
            case 15:
                cssText += 'width:46px;height:46px;';
                H = 23;
                break;
            default:
                cssText += 'width:100px;height:100px;';
                H = 55;
        }
        drop ? (cssText += 'top:0;', top = 0, setTimeout(function() {
            MoveDropSun(id, Y)
        }, 100)) : (top = Y - H - 20, cssText += 'top:' + top + 'px;', setTimeout(function() {
            DisappearSun(id)
        }, 8000));
        ArSun[id] = {
            id: id,
            N: N,
            C: 1,
            left: X,
            top: top
        };
        NewImg(id, 'images/Sun.gif', cssText, 1, {
            onclick: function() {
                ClickSun(this.id)
            }
        });
    },
    MoveDropSun = function(id, Y) {
        var o = ArSun[id];
        o && o.C && (o.top < Y - 53 ? ($(id).style.top = (o.top += 3) + 'px', setTimeout(function() {
            MoveDropSun(id, Y)
        }, 50)) : setTimeout(function() {
            DisappearSun(id)
        }, 8000))
    },
    DisappearSun = function(id) {
        var o = ArSun[id];
        o && o.C && (delete ArSun[id], ClearImg(id));
    },
    ClickSun = function(id) {
        var o = ArSun[id];
        o.C && (o.C = 0, (oS.SunNum += o.N) > 9990 && (oS.SunNum = 9990), innerText(obTSunNum, oS.SunNum), MoveClickSun(id), MonitorCard());
    },
    MoveClickSun = function(id) {
        var X1 = 124,
            Y1 = 20,
            o = ArSun[id],
            X2 = o.left,
            Y2 = o.top,
            X;
        SetStyle($(id), {
            left: (o.left = X = X2 - 30) + 'px',
            top: (o.top = (X - X1) / (X2 - X1) * (Y2 - Y1) + Y1) + 'px'
        });
        X > 124 ? setTimeout(function() {
            MoveClickSun(id)
        }, 10) : (delete ArSun[id], ClearImg(id));
    },
    AutoSunT, AutoClickSun = function() {
        AutoSunT = setInterval(function() {
            var o, id;
            for (id in ArSun)(o = ArSun[id]).C && ClickSun(o.id);
        }, 5000);
    },
    ShowLargeWave = function() {
        !$('LargeWave') && (NewImg('LargeWave', 'images/LargeWave.gif', 'position:absolute;left:357px;top:283px;z-index:50', 1), setTimeout(function() {
            ClearImg('LargeWave')
        }, 5000));
    },
    ShowFinalWave = function() {
        if (!$('FinalWave')) {
            NewImg('FinalWave', 'images/LargeWave.gif', 'position:absolute;left:357px;top:283px;z-index:50', 1);
            setTimeout(function() {
                EditImg($('FinalWave'), '', 'images/FinalWave.gif', {
                    left: '374px',
                    top: '265px',
                    width: '252px',
                    height: '71px',
                    display: 'none'
                });
                setTimeout(function() {
                    SetBlock($('FinalWave'));
                    setTimeout(function() {
                        ClearImg('FinalWave')
                    }, 1000);
                }, 1000);
            }, 5500);
        }
    },
    LawnMowerKill = function(R) {
        var id = 'LawnMower' + R,
            o = $(id),
            X = o.offsetLeft,
            Z = oZ.getZ(X + 50, R, 0);
        oGd.$LM[R] = 0;
        Z && Z.Die(2);
        (X += 10) > oS.W ? ClearImg(id) : (o.style.left = X + 'px', setTimeout(function() {
            LawnMowerKill(R)
        }, 10));
    },
    GameOver = function() {
        Win = -1;
        NewImg('iGameOver', 'images/ZombiesWon.png', 'position:absolute;left:0;top:0;width:900px;height:600px;z-index:255', 1, {
            onclick: function() {
                RestartGame()
            }
        });
    },
    PrepareGrowPlants = function(CallBack) {
        NewImg('PrepareGrow', 'images/PrepareGrowPlants.gif#' + Math.random(), 'position:absolute;z-index:50;left:' + (oS.W * 0.5 - 77) + 'px;top:' + (oS.H * 0.5 - 54) + 'px;', 1);
        setTimeout(function() {
            ClearImg('PrepareGrow');
            CallBack();
        }, 3000);
    },
    CustomPlants = function(Inx, R, C) {
        (new ArCard[Inx].PName).Birth(GetX(C), GetY(R), R, C, []);
    }
CheckAutoSun = function(o) {
        var c = o.checked ? 1 : 0;
        c != AutoSun && (addCookie('JSPVZAutoSun', AutoSun = c), c ? AutoClickSun() : clearInterval(AutoSunT))
    },
    GetNewCard = function(ob, p, alp, Lev) {
        switch (alp) {
            case 100:
                SetHidden(obDAll);
                SetHidden($('dTop'));
                var pro = p.prototype;
                $('iNewPlantCard').src = pro.PicArr[pro.NormalGif];
                innerText($('dNewPlantName'), pro.CName);
                $('dNewPlantTooltip').innerHTML = pro.Tooltip;
                $('btnNextLevel').onclick = function() {
                    Lev == 10 && (Lev = 0, alert('还没做好，敬请期待！'));
                    SelectModal(Lev);
                }
                SetStyle($('dNewPlant'), {
                    display: 'block',
                    zIndex: 255
                });
                return;
            case 0:
                SetStyle(ob, {
                    left: '350px',
                    top: '131px',
                    width: '200px',
                    height: '120px',
                    cursor: 'default'
                });
                ob.onclick = null;
                NewEle('DivA', 'div', 'position:absolute;left:0;top:0;width:900px;height:600px;background-color:#FFF;z-index:255;', 0, 1);
            default:
                alp += 10;
                SetAlpha($('DivA'), alp, alp * 0.01);
        }
        setTimeout(function() {
            GetNewCard(ob, p, alp, Lev)
        }, 100);
    },
    getCookie = function(name) {
        var strCookie = document.cookie,
            arrCookie = strCookie.split(';'),
            i = arrCookie.length,
            arr;
        while (i--)
            if ((arr = arrCookie[i].split('='))[0].replace(' ', '') == name) return arr[1];
        return 0;
    },
    addCookie = function(name, value, expireHours) {
        var cookieString = name + '=' + escape(value);
        document.cookie = cookieString;
    },
    deleteCookie = function(name) {
        document.cookie = name + '=0;';
    },
    CheckLvl = function() {
        $('JSPVZ').src = 'level/' + (JSPVZ = getCookie('JSPVZ')) + '.js';
        deleteCookie('JSPVZ');
    },
    SelectModal = function(Lvl) {
        innerText($('tdModalStr'), '载入中,如速度缓慢非程序原因,请体谅！');
        addCookie('JSPVZ', Lvl);
        location.reload();
    },
    RestartGame = function() {
        SelectModal(JSPVZ);
    },
    $ = function(id) {
        return document.getElementById(id)
    },
    $n = function(e) {
        return document.createElement(e)
    },
    SetBlock = function(o) {
        o.style.display = 'block'
    },
    SetNone = function(o) {
        o.style.display = 'none'
    },
    SetHidden = function(o) {
        o.style.visibility = 'hidden'
    },
    SetVisible = function(o) {
        o.style.visibility = 'visible'
    },
    SetAlpha = function(o, IEalpha, opacity) {
        o.style.filter = 'alpha(opacity=' + IEalpha + ')';
        o.style.opacity = opacity
    },
    SetStyle = function(o, ob) {
        var s = o.style,
            v;
        for (v in ob) {
            s[v] = ob[v]
        };
    },
    ClearImg = function(id, o) {
        obDAll.removeChild(o = $(id));
        o = null;
    },
    DelayTime = function(T, MaxT, f) {
        setTimeout(function() {
            ++T >= MaxT ? f() : DelayTime(T, MaxT, f);
        }, 1000);
    },
    NewImg = function(id, src, cssText, append, pro) {
        var img = $n('img');
        img.src = src;
        cssText && (img.style.cssText = cssText);
        if (pro) {
            for (v in pro) {
                img[v] = pro[v];
            }
        }
        id && (img.id = id);
        append && obDAll.appendChild(img);
        return img;
    },
    EditImg = function(d, id, src, o, append) {
        id && (d.id = id);
        src && (d.src = src);
        o && SetStyle(d, o);
        append && obDAll.appendChild(d);
        return d;
    },
    NewEle = function(id, EleN, cssText, evt, append, Attr, _E, v) {
        (_E = $n(EleN)).id = id;
        cssText && (_E.style.cssText = cssText);
        if (evt) {
            for (v in evt) {
                _E[v] = evt[v];
            }
        }
        if (Attr) {
            for (v in Attr) {
                _E.setAttribute(v, Attr[v]);
            }
        }
        append && obDAll.appendChild(_E);
        return _E;
    },
    NewO = function(pro, _o) {
        return (_o = function() {}).prototype = pro, _o;
    },
    SetPrototype = function(o, Pro, _p) {
        _p = o.prototype;
        for (var v in Pro) _p[v] = Pro[v];
    },
    InheritO = function(o, pro, p, _c, _p, _v, _v1, _v2, _pro) {
        var _c = function() {};
        _c.prototype = new o;
        pro && SetPrototype(_c, pro);
        if (p) {
            _pro = _c.prototype;
            for (_v1 in p) {
                _p = _pro[_v1].slice(0);
                _v = p[_v1];
                for (_v2 in _v) _p[_v2] = _v[_v2];
                _c.prototype[_v1] = _p;
            }
        }
        return _c;
    },
    Compare = function(X, S, L, func, C) {
        return C = X < S ? S : X > L ? L : X,
            func ? [func(C), C] : [C]
    },
    $Switch = function(X, aX, funX, aR, LX, LR, f) {
        LR = 0;
        LX = aX.length;
        f = funX;
        while (LR < LX) {
            if (f(X, aX[LR])) break;
            ++LR;
        }
        return aR[LR];
    },
    ImgSpriter = function(id, pid, Ar, Inx, func) {
        var ar = Ar[Inx],
            i = ar[2];
        $(id).style.backgroundPosition = ar[0];
        setTimeout(function() {
            i > -1 ? ImgSpriter(id, pid, Ar, i, func) : func(id, pid);
        }, ar[1]);
    },
    $f = function(s) {
        return new Function('a', 'b', 'return(' + s + ')')
    };