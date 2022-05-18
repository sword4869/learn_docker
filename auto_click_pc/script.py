import pyautogui as pg
from time import *
pg.PAUSE = 4

def show_position():
    while True:
        p = pg.position()
        print(p)
        sleep(2)


# pg.click()
# pg.doubleClick()

def run():
    # 跳过开场
    pg.click(1219, 759)

    # 抚摸
    pg.click(x=1642, y=309)

    # 循环
    pg.click(x=1252, y=228)
    # 展开
    pg.click(x=1875, y=840)
    # 快进
    pg.click(1714, 831)

    # 拒绝
    sleep(5)


# show_position()

while True:
    res = pg.alert('This is an alert box.', 'Test')
    if res == 'OK':
        for _ in range(10):
            run()
