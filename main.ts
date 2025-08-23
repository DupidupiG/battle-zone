namespace SpriteKind {
    export const barrera = SpriteKind.create()
    export const cofre = SpriteKind.create()
    export const boss = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.boss, function (sprite, otherSprite) {
    info.changeLifeBy(-3)
    pause(5000)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairNorth, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level4`)
    levels = 2
})
controller.combos.attachCombo("u, u, u", function () {
    if (shop_openclose == false) {
        myMenu = miniMenu.createMenuFromArray(chest_inventory)
        shop_openclose = true
        myMenu.setPosition(90, 56)
        myMenu.setTitle("chest")
        myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            info.changeLifeBy(1)
            num_potions_lives += -1
            if (num_potions_lives == 0) {
                chest_inventory.removeAt(selectedIndex)
            }
        })
    } else {
        myMenu.close()
        shop_openclose = false
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile2 = sprites.createProjectileFromSprite(assets.image`mega`, player1, -150, 0)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.greenInnerSouthEast, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level3`)
    enemi.setFlag(SpriteFlag.Invisible, true)
    levels = 1
    boss_1 = sprites.create(assets.image`boss`, SpriteKind.boss)
    boss_1_bar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    boss_1_bar.value = 3000
    tiles.placeOnTile(boss_1, tiles.getTileLocation(10, 12))
    tiles.placeOnTile(player1, tiles.getTileLocation(1, 12))
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`bala`, player1, 200, 0)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(boss_1)
    info.changeScoreBy(500)
    num_potions_lives += 3
    tiles.setCurrentTilemap(tilemap`level5`)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.boss, function (sprite, otherSprite) {
    boss_1_bar.value += -0.7
    projectile.startEffect(effects.spray)
    sprites.destroy(sprite)
})
controller.combos.attachCombo("l, r, l, r, u, d", function () {
    tiles.setCurrentTilemap(tilemap`level4`)
    levels = 2
    player1.setPosition(29, 38)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    projectile.startEffect(effects.starField, 500)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite)
})
let ratatonial_enemy: Sprite = null
let mega_bala = 0
let projectile: Sprite = null
let boss_1_bar: StatusBarSprite = null
let boss_1: Sprite = null
let enemi: Sprite = null
let projectile2: Sprite = null
let myMenu: miniMenu.MenuSprite = null
let chest_inventory: miniMenu.MenuItem[] = []
let shop_openclose = false
let num_potions_lives = 0
let levels = 0
let player1: Sprite = null
info.setScore(0)
info.setLife(3)
tiles.setCurrentTilemap(tilemap`level1`)
player1 = sprites.create(assets.image`space ship`, SpriteKind.Player)
levels = 0
num_potions_lives = 3
shop_openclose = false
controller.moveSprite(player1)
player1.setStayInScreen(true)
player1.setPosition(90, 40)
chest_inventory = [miniMenu.createMenuItem("potion (extra live)", img`
    ....................
    ....................
    ....................
    ....................
    ....................
    ....................
    ........4eee........
    .......eeeeee.......
    .........cc.........
    .........4c.........
    ........4444........
    .......424424.......
    ......42222224......
    .....4422222244.....
    .....4442222444.....
    .....4444224444.....
    ......44444444......
    .......eeeeee.......
    ....................
    ....................
    `)]
game.onUpdateInterval(800, function () {
    enemi = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . 2 . 2 . 2 . 2 . . . . . 
        . . . . 2 . 2 . 2 . 2 . . . . . 
        . . . . 3 3 3 3 3 3 3 . . . . . 
        . 2 2 3 8 a a a a a 8 3 2 2 . . 
        . . . 3 a 3 3 3 3 3 a 3 . . . . 
        . 2 2 3 a 3 a a a 3 a 3 2 2 . . 
        . . . 3 a 3 a 2 a 3 a 3 . . . . 
        . 2 2 3 a 3 a a a 3 a 3 2 2 . . 
        . . . 3 a 3 3 3 3 3 a 3 . . . . 
        . 2 2 3 8 a a a a a 8 3 2 2 . . 
        . . . . 3 3 3 3 3 3 3 . . . . . 
        . . . . 2 . 2 . 2 . 2 . . . . . 
        . . . . 2 . 2 . 2 . 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    enemi.setPosition(940, randint(10, 630))
    enemi.setVelocity(-100, 0)
    mega_bala = 0
})
forever(function () {
    scene.cameraFollowSprite(player1)
})
forever(function () {
    enemi.setBounceOnWall(false)
})
forever(function () {
    enemi.setFlag(SpriteFlag.DestroyOnWall, true)
})
forever(function () {
    if (levels == 1) {
        sprites.destroy(enemi)
        enemi.setFlag(SpriteFlag.Invisible, true)
    }
})
forever(function () {
    if (levels == 1) {
        boss_1_bar.attachToSprite(boss_1)
    }
})
forever(function () {
    if (levels == 1) {
        pause(5000)
        boss_1.follow(player1, 40)
    }
})
forever(function () {
    if (levels == 2) {
        ratatonial_enemy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . f . . f . f f . f . . f . . 
            . . . f . f . f f . f . f . . . 
            . . . . f f 1 1 1 1 f f . . . . 
            . f f f f 1 1 f f 1 1 f f f f . 
            f f f f f 1 f f f f 1 f f f f f 
            . f f f f 1 1 f f 1 1 f f f f . 
            . . . . f f 1 1 1 1 f f . . . . 
            . . . f . f . f f . f . f . . . 
            . . f . . f . f f . f . . f . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
    }
    if (levels == 2) {
        ratatonial_enemy.setPosition(randint(20, 500), randint(20, 500))
        pause(500)
    }
    if (info.score() == 550) {
        tiles.setCurrentTilemap(tilemap`level6`)
    }
})
