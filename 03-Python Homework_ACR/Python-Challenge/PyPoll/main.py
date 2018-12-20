import csv

votes = []

with open("election_data.csv", 'r') as f:
    reader = csv.reader(f, delimiter=',')
    next(reader)
    for row in reader:
        voter_id, county, candidate = row
        votes.append(candidate) 
        
total_votes = len(votes)
candidates = (set(votes))
kahn_counter = 0
li_counter = 0
correy_counter = 0
otooley_counter = 0

# print(candidates) = {"O'Tooley", 'Correy', 'Khan', 'Li'}

for x in votes:
    if x == ("Khan"):
        kahn_counter += 1
    elif x == ("Li"):
        li_counter += 1 
    elif x == ("Correy"):
        correy_counter += 1 
    elif x == ("O'Tooley"):
        otooley_counter += 1       

counter = [int(otooley_counter),int(correy_counter),int(kahn_counter),int(li_counter)]
total_counter = dict(zip(candidates,counter))
percentage_summary = {k: v / total_votes for k,v in total_counter.items()}


with open('Test.txt', 'w') as f:

    f.write("Election Results \n")
    f.write("---------------------------- \n")
    f.write("Total Number of Votes: \n")
    f.write(str(total_votes) + "\n")
    f.write("---------------------------- \n")
    f.write("Canidates Receiving Votes: \n")
    for cand, pct in percentage_summary.items():
        f.write (f"{cand}") #+ "\n")
    f.write("---------------------------- \n")
    f.write("Total Number Votes per Candidate: \n")
    f.write((list(candidates))[0] + " : " + str(otooley_counter) + "\n")
    f.write((list(candidates))[1] + " : " + str(correy_counter) + "\n")
    f.write((list(candidates))[2] + " : " + str(kahn_counter) + "\n")
    f.write((list(candidates))[3] + " : " + str(li_counter) + "\n")
    f.write("---------------------------- \n")
    f.write("Percentage of Votes per Candidate: \n")
    # for cand, pct in percentage_summary.items():
    #     f.write (f"{cand} : {round(pct *100,2)}% \n")
    f.write("---------------------------- \n")
    f.write("Winner of Election : " + (str(max(percentage_summary, key=percentage_summary.get)) + "\n"))

