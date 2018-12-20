import csv
import numpy as np

total_profit = 0
profit_list = []
profits = []

with open("budget_data.csv", 'r') as f:
    reader = csv.reader(f, delimiter=',')
    next(reader)
    for row in reader:
        date, profit = row #unpack the row
        row_profit= int(profit)
        profit_list.append(row_profit)
        profits.append(profit)
        total_profit += row_profit
        
total_months = len(profit_list)
increase = (max(profit_list)) #should be 1170593
decrease = (min(profit_list)) #should be -1196225

pairs = []
for index, row in enumerate(profits):
    try:
        pairs.append((int(profits[index + 1]), int(row)))
    except IndexError:
        pass
    
month_diff = []

for pair in pairs:
    second, first = pair
    diff = (int(second) - int(first))
    month_diff.append(diff)

with open('Test.txt', 'w') as f:
    
    f.write("Financial Analysis \n")
    f.write("---------------------------- \n")  
    f.write("Total Months : " + str(total_months) + "\n") #should be 86 months
    f.write("Total Profit : " + str(total_profit) + "\n") #should be 38382578  
    f.write("Average Change : " + str(np.mean(month_diff)) + "\n") #should be -2315.12
    f.write("Greatest Increase in Profits : " + str(increase) + "\n") 
    f.write("Greatest Decrease in Profits : " + str(decrease) + "\n")
