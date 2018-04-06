//Download by http://www.veryhuo.com/down
var CZombies = NewO({
        name: 'Zombies',
        HP: 270,
        Lvl: 1,
        NormalGif: 0,
        AttackGif: 1,
        LostHeadGif: 2,
        LostHeadAttackGif: 3,
        HeadGif: 4,
        DieGif: 5,
        BoomDieGif: 6,
        width: 166,
        height: 144,
        beAttackedPointL: 82,
        beAttackedPointR: 156,
        BreakPoint: 90,
        Ornaments: 0,
        OrnHP: 0,
        OSpeed: 1.6,
        Speed: 1.6,
        AKind: 0,
        beAttacked: 1,
        isAttacking: 0,
        Attack: 100,
        WalkDirection: 0,
        Altitude: 1,
        canSlow: 1,
        canFreeze: 1,
        canSputtering: 1,
        canRaven: 1,
        canSetbody: 1,
        FreeSetbodyTime: '',
        FreeFreezeTime: '',
        FreeSlowTime: '',
        CanPass: function(R) {
            return !(R < 1 || R > oS.R || oGd.$LF[R] == 2)
        },
        GetDY: 0,
        getRaven: function(pid) {
            this.Die(2);
            return 1
        },
        Birth: function() {
            var o = this,
                R = GetZombieR(o),
                Y = GetY(R) + o.GetDY,
                pixelTop = Y - o.height,
                zIndex = 3 * R + 1,
                id = o.id = 'Z_' + Math.random();
            o.R = R;
            o.pixelTop = pixelTop;
            o.X = (o.ZX = o.AttackedLX = GetX(11)) - o.beAttackedPointL;
            o.AttackedRX = o.X + o.beAttackedPointR;
            o.zIndex = zIndex;
            $Z[id] = o;
            oZ.add(o);
            o.AddShadow(id, o.ZX, Y, zIndex);
            EditImg(ZPn[o.EName].cloneNode(false), o.id, '', {
                left: o.X + 'px',
                top: pixelTop + 'px',
                zIndex: zIndex
            }, 1)
        },
        AddShadow: function(id, ZX, Y, zIndex) {
            NewImg(id + '_shadow', ShadowPNG, 'position:absolute;left:' + (ZX - 10) + 'px;top:' + (Y - 22) + 'px;z-index:' + (zIndex - 1), 1)
        },
        Die: function(DieGif) {
            var o = this,
                id = o.id,
                p = $(id);
            !DieGif ? (p.src = o.PicArr[o.DieGif] + '#' + Math.random(), setTimeout(function() {
                ClearImg(id);
                ClearImg(id + '_shadow')
            }, 2500)) : DieGif < 2 ? (ClearImg(id + '_shadow'), p.src = o.PicArr[o.BoomDieGif] + '#' + Math.random(), setTimeout(function() {
                ClearImg(id)
            }, 3000)) : (ClearImg(id), ClearImg(id + '_shadow'));
            o.HP = 0;
            delete $Z[id];
            --NumZombies
        },
        GoingDie: function() {
            var o = this,
                id = o.id,
                pid = id + '_head',
                ar = o.PicArr;
            $(id).src = !o.isAttacking ? ar[o.LostHeadGif] : ar[o.LostHeadAttackGif];
            NewImg(pid, ar[o.HeadGif] + '#' + Math.random(), 'position:absolute;left:' + o.ZX + 'px;top:' + (o.pixelTop - 20) + 'px;z-index:' + o.zIndex, 1);
            setTimeout(function() {
                ClearImg(pid)
            }, 2000);
            o.beAttacked = 0;
            o.FreeFreezeTime = o.FreeSetbodyTime = o.FreeSlowTime = '';
            o.AutoReduceHP(id)
        },
        AutoReduceHP: function(id) {
            setTimeout(function() {
                var o = $Z[id];
                o && ((o.HP -= 60) < 1 ? o.Die() : o.AutoReduceHP(id))
            }, 1000)
        },
        JudgeAttack: function() {
            var o = this,
                ZX = o.ZX,
                s = o.R + '_',
                C = GetC(ZX),
                _$ = oGd.$,
                ar;
            (ar = o.JudgeLR(o, s, C, ZX, _$) || o.JudgeSR(o, s, C, ZX, _$)) ? ar[0](ar[1], ar[2]): o.isAttacking && (o.isAttacking = 0, $(o.id).src = o.PicArr[o.NormalGif])
        },
        JudgeLR: function(o, i, C, ZX, _$) {
            return C > 10 || C < 1 ? false : function() {
                i += --C + '_';
                var j = 3,
                    p;
                while (j--)
                    if ((p = _$[i + j]) && p.canEat && p.AttackedRX >= ZX && p.AttackedLX <= ZX) return [o.NormalAttack, o.id, p.id]
            }()
        },
        JudgeSR: function(o, i, C, ZX, _$) {
            return C > 9 || C < 1 ? false : function() {
                i += C + '_';
                var j = 3,
                    p;
                while (j--)
                    if ((p = _$[i + j]) && p.canEat && p.AttackedRX >= ZX && p.AttackedLX <= ZX) return [o.NormalAttack, o.id, p.id]
            }()
        },
        NormalAttack: function(zid, pid) {
            var o = $Z[zid];
            o && !o.isAttacking && (o.isAttacking = 1, $(zid).src = o.PicArr[o.AttackGif]);
            setTimeout(function() {
                var o = $Z[zid],
                    p;
                o && o.beAttacked && !o.FreeFreezeTime && !o.FreeSetbodyTime && ((p = $P[pid]) && p.getHurt(o, o.AKind, !o.FreeSlowTime ? o.Attack : Math.round(o.Attack * 0.5)), o.JudgeAttack())
            }, 1000)
        }
    }),
    OrnNoneZombies = InheritO(CZombies, {
        getHurt: function(Akind, D, Attack, SetSlow, SetFreeze, SetBody, DieGif) {
            var o = this,
                d, ar, i, id = o.id;
            if (!o.beAttacked) {
                DieGif && o.Die(2);
                return
            };
            switch (true) {
                case (o.HP -= Attack) > o.BreakPoint:
                    switch (SetSlow) {
                        case 0:
                            break;
                        case -1:
                            o.canSlow && (d = new Date(), !o.FreeSlowTime && (o.Speed *= 0.5), o.FreeSlowTime = d.setSeconds(d.getSeconds() + 10));
                            break;
                        default:
                            o.FreeSlowTime && (o.FreeSlowTime = '', o.Speed = o.OSpeed);
                            if (o.canSputtering) {
                                ar = !D ? oZ.getArZ(o.AttackedLX, o.AttackedLX + 40, o.R) : oZ.getArZ(o.AttackedRX - 40, o.AttackedRX, o.R);
                                for (i = ar.length; i--; ar[i].canSputtering && ar[i].getHurt(1, 0, 13, 0, 0, 0, 0));
                            }
                    };
                    SetAlpha($(id), 50, 0.5);
                    setTimeout(function() {
                        $Z[id] && SetAlpha($(id), 100, 1)
                    }, 100);
                    break;
                case o.HP > 0:
                    o.GoingDie();
                    break;
                default:
                    o.Die(DieGif)
            }
        }
    }),
    oZombie = InheritO(OrnNoneZombies, {
        EName: 'oZombie',
        CName: '领带僵尸',
        PicArr: ['images/Zombies/Zombie/Zombie.gif', 'images/Zombies/Zombie/ZombieAttack.gif', 'images/Zombies/Zombie/ZombieLostHead.gif', 'images/Zombies/Zombie/ZombieLostHeadAttack.gif', 'images/Zombies/Zombie/ZombieHead.gif', 'images/Zombies/Zombie/ZombieDie.gif', 'images/Zombies/BoomDie1.gif'],
        Produce: '普通僵尸<p>韧性：<font color="#FF0000">低</font></p>这种僵尸喜爱脑髓，贪婪而不知足。脑髓，脑髓，脑髓，夜以继日地追求着。老而臭的脑髓？腐烂的脑髓？都没关系。僵尸需要它们。'
    }),
    oFlagZombie = InheritO(oZombie, {
        EName: 'oFlagZombie',
        CName: '旗帜僵尸',
        width: 111,
        height: 143,
        OSpeed: 2.2,
        Speed: 2.2,
        beAttackedPointR: 101,
        Produce: '旗帜僵尸标志着即将来袭的一大堆僵尸"流"。<p>韧性：<font color="#FF0000">低</font></p>毫无疑问，摇旗僵尸喜爱脑髓。但在私下里他也迷恋旗帜。也许是因为旗帜上也画有脑子吧，这很难说。'
    }, {
        PicArr: {
            0: 'images/Zombies/FlagZombie/FlagZombie.gif',
            1: 'images/Zombies/FlagZombie/FlagZombieAttack.gif',
            2: 'images/Zombies/FlagZombie/FlagZombieLostHead.gif',
            3: 'images/Zombies/FlagZombie/FlagZombieLostHeadAttack.gif'
        }
    }),
    OrnIZombies = InheritO(CZombies, {
        Ornaments: 1,
        OrnLostNormalGif: 7,
        OrnLostAttackGif: 8,
        getHurt: function(Akind, D, Attack, SetSlow, SetFreeze, SetBody, DieGif) {
            var o = this,
                id = o.id;
            if (!o.beAttacked) {
                DieGif && o.Die(2);
                return
            };
            switch (true) {
                case !o.OrnHP:
                    o.HP -= Attack;
                    break;
                case (o.OrnHP -= Attack) > 0:
                    break;
                case o.OrnHP < 0:
                    o.HP += o.OrnHP;
                    o.OrnHP = 0;
                default:
                    var t1 = o.NormalGif = o.OrnLostNormalGif,
                        t2 = o.AttackGif = o.OrnLostAttackGif;
                    $(id).src = !o.isAttacking ? o.PicArr[t1] : o.PicArr[t2]
            };
            switch (true) {
                case o.HP > o.BreakPoint:
                    switch (SetSlow) {
                        case 0:
                            break;
                        case -1:
                            o.canSlow && (d = new Date(), !o.FreeSlowTime && (o.Speed *= 0.5), o.FreeSlowTime = d.setSeconds(d.getSeconds() + 10));
                            break;
                        default:
                            o.FreeSlowTime && (o.FreeSlowTime = '', o.Speed = o.OSpeed);
                            if (o.canSputtering) {
                                ar = !D ? oZ.getArZ(o.AttackedLX, o.AttackedLX + 40, o.R) : oZ.getArZ(o.AttackedRX - 40, o.AttackedRX, o.R);
                                for (i = ar.length; i--; ar[i].canSputtering && ar[i].getHurt(1, 0, 13, 0, 0, 0, 0));
                            }
                    };
                    SetAlpha($(id), 50, 0.5);
                    setTimeout(function() {
                        $Z[id] && SetAlpha($(id), 100, 1)
                    }, 100);
                    break;
                case o.HP > 0:
                    o.GoingDie();
                    break;
                default:
                    o.Die(DieGif)
            }
        }
    }),
    oConeheadZombie = InheritO(OrnIZombies, {
        EName: 'oConeheadZombie',
        CName: '路障僵尸',
        OrnHP: 370,
        Lvl: 2,
        PicArr: ['images/Zombies/ConeheadZombie/ConeheadZombie.gif', 'images/Zombies/ConeheadZombie/ConeheadZombieAttack.gif', 'images/Zombies/Zombie/ZombieLostHead.gif', 'images/Zombies/Zombie/ZombieLostHeadAttack.gif', 'images/Zombies/Zombie/ZombieHead.gif', 'images/Zombies/Zombie/ZombieDie.gif', 'images/Zombies/BoomDie1.gif', 'images/Zombies/Zombie/Zombie.gif', 'images/Zombies/Zombie/ZombieAttack.gif'],
        Produce: '他的路障头盔，使他两倍坚韧于普通僵尸。<p>韧性：<font color="#FF0000">中</font></p>和其他僵尸一样，路障头僵尸盲目地向前。但某些事物却使他停下脚步，捡起一个交通路障，并固实在自己的脑袋上。是的，他很喜欢参加聚会。'
    }),
    oBucketheadZombie = InheritO(oConeheadZombie, {
        EName: 'oBucketheadZombie',
        CName: '铁桶僵尸',
        OrnHP: 1100,
        Lvl: 3,
        Produce: '他的铁桶头盔，能极大程度的承受伤害。<p>韧性：<font color="#FF0000">高</font><br>弱点：<font color="#FF0000">磁力菇</font></p>铁桶头僵尸经常戴着水桶，在冷漠的世界里显得独一无二。但事实上，他只是忘记了，那铁桶还在他头上而已。'
    }, {
        PicArr: {
            0: 'images/Zombies/BucketheadZombie/BucketheadZombie.gif',
            1: 'images/Zombies/BucketheadZombie/BucketheadZombieAttack.gif',
            7: 'images/Zombies/Zombie/Zombie2.gif'
        }
    }),
    oFootballZombie = InheritO(oConeheadZombie, {
        EName: 'oFootballZombie',
        CName: '橄榄球僵尸',
        OrnHP: 1400,
        Lvl: 3,
        width: 154,
        height: 160,
        OSpeed: 3.2,
        Speed: 3.2,
        beAttackedPointL: 20,
        beAttackedPointR: 134,
        Produce: '橄榄球僵尸的表演秀。<p>韧性：<font color="#FF0000">极高</font><br>速度：<font color="#FF0000">快</font><br>弱点：<font color="#FF0000">磁力菇</font></p>在球场上，橄榄球僵尸表现出110%的激情，他进攻防守样样在行。虽然他完全不知道橄榄球是什么。'
    }, {
        PicArr: {
            0: 'images/Zombies/FootballZombie/FootballZombie.gif',
            1: 'images/Zombies/FootballZombie/FootballZombieAttack.gif',
            7: 'images/Zombies/FootballZombie/FootballZombieOrnLost.gif',
            8: 'images/Zombies/FootballZombie/FootballZombieOrnLostAttack.gif'
        }
    }),
    oPoleVaultingZombie = InheritO(OrnNoneZombies, {
        EName: 'oPoleVaultingZombie',
        CName: '撑杆僵尸',
        HP: 500,
        width: 348,
        height: 218,
        OSpeed: 3.2,
        Speed: 3.2,
        beAttackedPointL: 215,
        beAttackedPointR: 260,
        GetDY: 5,
        Lvl: 2,
        PicArr: ['images/Zombies/PoleVaultingZombie/PoleVaultingZombie.gif', 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieAttack.gif', 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieLostHead.gif', 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieLostHeadAttack.gif', 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieHead.gif', 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieDie.gif', 'images/Zombies/PoleVaultingZombie/BoomDie.gif', 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif', 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieLostHeadWalk.gif', 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump.gif', 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump2.gif'],
        Produce: '撑杆僵尸运用标杆高高地跃过障碍物。<p>韧性：<font color="#FF0000">中</font><Br>速度：<font color="#FF0000">快,而后慢(跳跃后)</font><BR>特点：<font color="#FF0000">跃过他所碰到的第一筑植物</font></p>一些僵尸渴望走得更远、得到更多，这也促使他们由普通成为非凡。那就是撑杆僵尸。',
        AddShadow: function(id, ZX, Y, zIndex) {
            NewImg(id + '_shadow', ShadowPNG, 'position:absolute;left:' + (ZX - 20) + 'px;top:' + (Y - 35) + 'px;z-index:' + (zIndex - 1), 1)
        },
        GoingDie: function() {
            var o = this,
                id = o.id,
                pid = id + '_head',
                ar = o.PicArr;
            $(id).src = !o.isAttacking ? ar[o.LostHeadGif] : ar[o.LostHeadAttackGif];
            NewImg(pid, ar[o.HeadGif] + '#' + Math.random(), 'position:absolute;left:' + o.X + 'px;top:' + (o.pixelTop - 20) + 'px;z-index:' + o.zIndex, 1);
            setTimeout(function() {
                ClearImg(pid)
            }, 2000);
            o.beAttacked = 0;
            o.FreeFreezeTime = o.FreeSetbodyTime = o.FreeSlowTime = '';
            o.AutoReduceHP(id)
        },
        JudgeAttack: function() {
            var o = this,
                ZX = o.ZX,
                s = o.R + '_',
                CMax = GetC(ZX),
                _$ = oGd.$,
                C, j, RX = ZX - 74;
            for (C = CMax - 2; C <= CMax; C++) {
                if (C > 9 || C < 1) continue;
                for (j = 2; j > -1;
                    (p = _$[s + C + '_' + j--]) && p.canEat && p.AttackedRX >= RX && p.AttackedLX < ZX && (j = -1, o.JudgeAttack = CZombies.prototype.JudgeAttack, o.NormalAttack(o.id, p.id)));
            }
        },
        getRaven: function(pid) {
            this.NormalAttack(this.id, pid);
            return 0
        },
        NormalAttack: function(zid, pid) {
            var o = $Z[zid],
                RX = $P[pid].AttackedLX,
                img = $(zid),
                S = $(zid + '_shadow');
            img.src = 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump.gif#' + Math.random();
            SetHidden(S);
            o.isAttacking = 1;
            o.Altitude = 2;
            setTimeout(function() {
                var o = $Z[zid],
                    P = $P[pid],
                    LX;
                o && (P && P.Stature > 0 ? (o.AttackedRX = (o.X = (o.AttackedLX = o.ZX = LX = P.AttackedRX) - o.beAttackedPointL) + o.beAttackedPointR, EditImg(img, 0, 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif#' + Math.random(), {
                    left: o.X + 'px'
                }), SetStyle(S, {
                    left: LX - 20 + 'px',
                    visibility: 'visible'
                }), o.isAttacking = 0, o.Altitude = 1, o.OSpeed = o.Speed = 1.6, o.NormalGif = 7, o.LostHeadGif = 8, o.NormalAttack = CZombies.prototype.NormalAttack, o.getRaven = CZombies.prototype.getRaven) : (o.ZX = o.AttackedLX = (o.X = (o.AttackedRX = RX) - o.beAttackedPointR) + o.beAttackedPointL, EditImg(img, 0, 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump2.gif#' + Math.random(), {
                    left: o.X + 'px'
                }), SetStyle(S, {
                    left: o.ZX - 20 + 'px',
                    visibility: 'visible'
                }), setTimeout(function() {
                    var o = $Z[zid];
                    o && (img.src = 'images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif#' + Math.random(), o.isAttacking = 0, o.Altitude = 1, o.OSpeed = o.Speed = 1.6, o.NormalGif = 7, o.LostHeadGif = 8, o.NormalAttack = CZombies.prototype.NormalAttack, o.getRaven = CZombies.prototype.getRaven)
                }, 800)))
            }, 1000)
        }
    })