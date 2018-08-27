def is_jolly(sequence):
    n = len(sequence)
    return sorted(differences(sequence)) == list(range(1, n))

def differences(sequence):
    n = len(sequence)
    if n <= 1: 
        return []
    difference = [abs(sequence[n-1] - sequence[n-2])]
    return differences(sequence[:-1]) + difference 

def test_jolly():
    assert is_jolly([1]) == True
    assert is_jolly([1,4,2,3]) == True
    assert is_jolly([1,4,2,-1,6]) == False
    assert is_jolly([11,7,4,2,1,6]) == True

def test_differences():
    assert differences([1]) == []
    assert differences([1,2]) == [1]
    assert differences([1,2,4]) == [1,2]
    assert differences([1,3,5,7,8]) == [2,2,2,1]
