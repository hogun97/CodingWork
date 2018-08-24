def self_number(n):
    has_generator = []
    for i in range(1, n+1):
        has_generator.append(i + sum(get_digits(i)))
    self_numbers = set(range(1, n+1)) - set(has_generator)
    return sum(self_numbers)

def get_digits(i):
    return [int(j) for j in str(i)]

#Test Cases

def test_self_number():
    assert self_number(1) == 2
    assert self_number(10) == 25
    assert self_number(9) == 18
    assert self_number(5_000_000) == 1222233933479

def test_get_digits():
    assert get_digits(1) == [1]
    assert get_digits(12) == [1, 2]
    assert get_digits(1234) == [1, 2, 3, 4]
    assert get_digits(1234567) == [1, 2, 3, 4, 5, 6, 7]
    
        
