from collections import Counter

list1 = []
list2 = []
with open("day1.txt") as file:
    for line in file:
        numbersStr = line.split("   ")
        numbers = [int(numberStr.strip()) for numberStr in numbersStr]
        list1.append(numbers[0])
        list2.append(numbers[1])

counter = Counter(list2)
similarityScore = 0
for number in list1:
    similarityScore += number * counter[number]

print(similarityScore)
