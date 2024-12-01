list1 = []
list2 = []
with open("day1.txt") as file:
    for line in file:
        numbersStr = line.split("   ")
        numbers = [int(numberStr.strip()) for numberStr in numbersStr]
        list1.append(numbers[0])
        list2.append(numbers[1])

sList1 = sorted(list1)
sList2 = sorted(list2)

totalDistance = 0
for i in range(len(list1)):
    totalDistance += abs(sList1[i] - sList2[i])

print(totalDistance)
