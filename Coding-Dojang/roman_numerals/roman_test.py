NUMBERS = [
    (1000, 'M'), (900, 'CM'),
    (500, 'D'), (400, 'CD'),
    (100, 'C'), (90, 'XC'),
    (50, 'L'), (40, 'XL'),
    (10, 'X'), (9, 'IX'),
    (5, 'V'), (4, 'IV')
]

def roman(number):
    for boundary, symbol in NUMBERS:
        if number >= boundary:
            return symbol + roman(number - boundary)
    return 'I' * number

def test_roman():
    assert roman(1) == 'I'
    assert roman(2) == 'II'
    assert roman(3) == 'III'
    assert roman(4) == 'IV'
    assert roman(7) == 'VII'
    assert roman(10) == 'X'
    assert roman(39) == 'XXXIX'
    assert roman(246) == 'CCXLVI'
    assert roman(207) == 'CCVII'
    assert roman(1066) == 'MLXVI'
    assert roman(1776) == 'MDCCLXXVI'
    assert roman(1954) == 'MCMLIV'
